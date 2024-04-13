import express, { Request, Response } from 'express';
const router = express.Router()
import { Exhibition, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const fs = require('fs');
const path = require("path");
const { Readable } = require('stream');
const { finished } = require('stream/promises');

const downloadImage = async (imageUrl: string, fileName: string) => {
    try {
        const response = await fetch(imageUrl);
        const destination = path.resolve("public/exhibitions", fileName + '.jpg');
        const fileStream = fs.createWriteStream(destination, { flags: 'wx' });
        await finished(Readable.fromWeb(response.body).pipe(fileStream));
    } catch (error) {
        throw new Error(`Error downloading the image: ${error}`);
    }
};

// Fetch from Museum API
async function getData() : Promise<any>{
    try{
        const res = await fetch('https://api.artic.edu/api/v1/exhibitions/search?query[term][status]=Confirmed&fields=id,title,image_url,aic_start_at,aic_end_at,short_description,web_url,gallery_title&limit=100');
        const result = await res.json()
        let exhibitions = result.data
        if(result.pagination.total_pages > 1){
            for(let i = 2; i < result.pagination.total_pages - 1; i++){
                const res = await fetch(`https://api.artic.edu/api/v1/exhibitions/search?query[term][status]=Confirmed&fields=id,title,image_url,aic_start_at,aic_end_at,short_description,web_url,gallery_title&limit=100&page=${i}`)
                const result = await res.json()
                exhibitions = exhibitions.concat(result.data)
            }
        }
        for(const exhibition of exhibitions){
            if(exhibition.title &&  exhibition.web_url && exhibition.description && exhibition.gallery_title && exhibition.aic_start_at && exhibition.aic_end_at && exhibition.image_url){
                await downloadImage(exhibition.image_url, exhibition.id);
                await prisma.exhibition.create({
                    data: {
                        id: exhibition.id,
                        title: exhibition.title,
                        url: exhibition.web_url,
                        start: exhibition.aic_start_at,
                        end: exhibition.aic_end_at,
                        description: exhibition.short_description,
                        gallery: exhibition.gallery_title,
                        price: Math.floor(Math.random() * (10000 - 1000) + 1000) / 100,
                        stock: Math.floor(Math.random() * (5000 - 1000) + 1000),
                    }
                })
            }
        }
        exhibitions = await prisma.exhibition.findMany({});
        return exhibitions
    } catch (err){
        console.log(err)
    }
}

//             let yearRe = /\d{4}-\d{2}-\d{2}/gm
//             let start = (results[i].aic_start_at).match(yearRe);
//             let end = (results[i].aic_end_at).match(yearRe);


// Return All
router.get('/', async(req: Request, res: Response) => {
    try {
        let exhibitions: Exhibition[] | undefined = await prisma.exhibition.findMany({});
        if(exhibitions.length == 0){
            exhibitions = await getData();
        }
        if(exhibitions && exhibitions.length > 0){
            res.status(200).json(exhibitions);
        } else{
            throw new Error('No exhibitions could be found.')
        }
    }catch(err){
        res.status(500).json({message: err})
    }   
})

// Return Specific
router.get('/:id', async(req, res) => {
    try{
        const exhibition = await prisma.exhibition.findUnique({ 
            where: {
                id: parseInt(req.params.id)
            } 
        });
        if(exhibition){
            res.status(200).json(exhibition);
        } else{
            throw new Error('No exhibition could be found.')
        }
    }catch(err){
        res.status(500).json({message: err})
    }   
})

// router.get('/order/:id', async(req, res) => {
//     try{
//         const exhibition = await exhibitionModel.findOne({id: req.params.id});
//         if(exhibition.ticket_amount - 1 >= 0){
//             exhibition.ticket_amount =  ticket_amount.ticket_amount - 1;
//         } else{
//             throw new Error('Not enough items in stock.')
//         }
//         res.status(200).json(artwork);
//     }catch(err){
//         res.status(500).json({message: err.message})
//     }   
// })

// // Update Specific
// router.post('/:id', async(req, res) => {
//     try{
//         let exhibition = await exhibitionModel.findOne({ id: req.params.id });
//         for (const property in exhibition){
//             for(const prop in req.body){
//                 if (prop == property){
//                     exhibition[property] = req.body[prop];
//                 }
//             }
//         }
//         exhibition.save();
//         res.status(200).json(exhibition);
//     }catch(err){
//         res.status(500).json({message: err.message})
//     }   
// })

module.exports = router