import express, { Request, Response } from 'express';
const router = express.Router()

import { ArtworkStyle, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Return All
router.get('/', async(req: Request, res: Response) => {
    try {
        let artstyles: ArtworkStyle[] | undefined = await prisma.artworkStyle.findMany({ include: { artworks: true } });
        if(artstyles && artstyles.length > 0){
            res.status(200).json(artstyles);
        } else{
            throw new Error('No artstyles could be found.')
        }
    }catch(err){
        res.status(500).json({message: err})
    }   
})

// Return Specific
router.get('/:id', async(req: Request, res: Response) => {
    try {
        let artstyle = await prisma.artworkStyle.findUnique({ 
            where: {
                id: req.params.id
            },
            include: { 
                artworks: {
                    include:{
                        artist: true,
                        style: true
                    }
                } 
            } 
        });
        res.status(200).json(artstyle);
    }catch(err){
        res.status(500).json({message: err})
    }   
})

// // Update Specific
// router.post('/:id', async(req, res) => {
//     try{
//         const artstyle = await artworkStylesModel.find({id: req.params.id});
//         for (const property in artstyle){
//             for(const prop in req.body){
//                 if (prop == property){
//                     artstyle[property] = req.body[prop];
//                 }
//             }
//         }
//         artstyle.save();
//         res.status(200).json(artstyle);
//     }catch(err){
//         res.status(500).json({message: err.message})
//     }   
// })

module.exports = router