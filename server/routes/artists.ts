import express, { Request, Response } from 'express';
const router = express.Router();
import { Artist, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Fetch from Museum API
async function getData() : Promise<Artist[] | undefined>{
    try{
        const res = await fetch('https://api.artic.edu/api/v1/agents/search?query[bool][filter][term][description]=he&fields=is_artist,title,birth_date,death_date,description,sort_title,id&limit=100');
        const result = await res.json()
        let artists = result.data
        if(result.pagination.total_pages > 1){
            for(let i = 2; i < result.pagination.total_pages; i++){
                const res = await fetch(`https://api.artic.edu/api/v1/agents/search?query[bool][filter][term][description]=he&fields=is_artist,title,birth_date,death_date,description,sort_title,id&limit=100&page=${i}`)
                const result = await res.json()
                artists = artists.concat(result.data)
            }
        }
        for(const artist of artists){
            await prisma.artist.create({
                data: {
                    title: artist.title,
                    sort_title: artist.sort_title ? artist.sort_title : null,
                    birth: artist.birth_date ? artist.birth_date : null,
                    death: artist.death_date ? artist.death_date : null,
                    description: artist.description ? artist.description : null,
                }
            })
        }
        artists = await prisma.artist.findMany({ include: { artworks: true } });
        return artists
    } catch (err){
        console.log(err)
    }
}

// Return All
router.get('/', async(req: Request, res: Response) => {
    try {
        let artists: Artist[] | undefined = await prisma.artist.findMany({ include: { artworks: true } });
        if(artists.length == 0){
            artists = await getData();
        }
        if(artists && artists.length > 0){
            res.status(200).json(artists);
        } else{
            throw new Error('No artists could be found.')
        }
    }catch(err){
        res.status(500).json({message: err})
    }   
})

// Return Specific
router.get('/:id', async(req: Request, res: Response) => {
    try{
        const artist = await prisma.artist.findUnique({ 
            where: {
                id: req.params.id
            },
            include: {
                artworks: true
            }
        });
        if(artist){
            res.status(200).json(artist);
        } else{
            throw new Error('No artist could be found.')
        }
    }catch(err){
        res.status(500).json({message: err})
    }   
})

// // Update Specific
// router.post('/:id', async(req, res) => {
//     try{
//         const artist = await artistModel.findOne({ id: req.params.id });
//         for (const property in artist){
//             for(const prop in req.body){
//                 if (prop == property){
//                     artist[property] = req.body[prop];
//                 }
//             }
//         }
//         artist.save();
//         res.status(200).json(artist);
//     }catch(err){
//         res.status(500).json({message: err.message})
//     }   
// })

module.exports = router