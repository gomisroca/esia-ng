import express, { Request, Response } from 'express';
const router = express.Router();
import { Artwork, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const fs = require('fs');
const path = require("path");
const { Readable } = require('stream');
const { finished } = require('stream/promises');

const downloadImage = async (imageUrl: string, fileName: string) => {
    try {
        const response = await fetch(imageUrl);
        const destination = path.resolve("public/artworks", fileName + '.jpg');
        const fileStream = fs.createWriteStream(destination, { flags: 'wx' });
        await finished(Readable.fromWeb(response.body).pipe(fileStream));
    } catch (error) {
        throw new Error(`Error downloading the image: ${error}`);
    }
};

async function getStyle(id: string): Promise<any>{
    try{
        const res = await fetch(`https://api.artic.edu/api/v1/category-terms/search?query[term][id]=${id}`)
        const result = await res.json()
        return result.data[0]                
    } catch (err){
        console.log(err)
    }
}

// Fetch from Museum API
async function getData() : Promise<any>{
    try{
        const res = await fetch('https://api.artic.edu/api/v1/artworks/search?q=TM-&fields=id,title,artist_id,artist_title,medium_display,date_display,place_of_origin,style_title,image_id,style_id&limit=100');
        const result = await res.json()
        let artworks = result.data
        if(result.pagination.total_pages > 1){
            for(let i = 2; i < result.pagination.total_pages - 1; i++){
                const res = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=TM-&fields=id,title,artist_id,artist_title,medium_display,date_display,place_of_origin,style_title,image_id,style_id&limit=100&page=${i}`)
                const result = await res.json()
                artworks = artworks.concat(result.data)
            }
        }
        for(const artwork of artworks){
            if(artwork.artist_title && artwork.image_id && artwork.style_id){
                const artist = await prisma.artist.findUnique({
                    where: {
                        title: artwork.artist_title
                    }
                })
                if(artist){            
                    let fullImageUrl = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/1686,/0/default.jpg`;
                    await downloadImage(fullImageUrl, artwork.image_id)
                    const style = await prisma.artworkStyle.findUnique({ 
                        where: {
                            id: artwork.style_id
                        } 
                    })
                    if(!style){
                        const newStyle = await getStyle(artwork.style_id);
                        if(newStyle){
                            await prisma.artworkStyle.create({ 
                                data: {
                                    id: newStyle.id,
                                    title: newStyle.title,
                                    banner: artwork.image_id,
                                } 
                            })
                        }
                    }
                    await prisma.artist.update({
                        where: {
                            title: artwork.artist_title
                        },
                        data: {
                            artworks: {
                                create: ({
                                    title: artwork.title,
                                    medium: artwork.medium_display,
                                    date: artwork.date_display,
                                    origin: artwork.place_of_origin ? artwork.place_of_origin : null,
                                    image: artwork.image_id,
                                    styleId: artwork.style_id,
                                    price: Math.floor(Math.random() * (10000 - 1000) + 1000) / 100,
                                    stock: Math.floor(Math.random() * (5000 - 1000) + 1000),
                                })
                            }
                        }
                    })
                }
            }
        }
        artworks = await prisma.artwork.findMany({});
        return artworks
    } catch (err){
        console.log(err)
    }
}

router.get('/', async(req: Request, res: Response) => {
    try {
        let artworks: Artwork[] | undefined = await prisma.artwork.findMany({});
        if(artworks.length == 0){
            artworks = await getData();
        }
        if(artworks && artworks.length > 0){
            res.status(200).json(artworks);
        } else{
            throw new Error('No artworks could be found.')
        }
    }catch(err){
        res.status(500).json({message: err})
    }   
})

// Return Specific
router.get('/:id', async(req, res) => {
    try{
        const artwork = await prisma.artwork.findUnique({
            where: { 
                id: req.params.id 
            },
            include: {
                artist: true
            }
        });
        res.json(artwork);
    }catch(err){
        res.status(500).json({message: err})
    }   
})

router.get('/order/:id', async(req, res) => {
    try{
        const artwork = await prisma.artwork.update({
            where: { 
                id: req.params.id 
            },
            data: {
                stock: {
                    decrement: 1
                }
            }
        });

        res.status(200).json(artwork);
    }catch(err){
        res.status(500).json({message: err})
    }   
})

// // Update Specific
// router.post('/:id', async(req, res) => {
//     try{
//         const artwork = await artworkModel.findOne({id: req.params.id});
//         for (const property in artwork){
//             for(const prop in req.body){
//                 if (prop == property){
//                     artwork[property] = req.body[prop];
//                 }
//             }
//         }
//         artwork.save();
//         res.status(200).json(artwork);
//     }catch(err){
//         res.status(500).json({message: err.message})
//     }   
// })

module.exports = router