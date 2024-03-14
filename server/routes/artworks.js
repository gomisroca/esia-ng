const express = require('express');
const router = express.Router();
const axios = require('axios');

const artistModel = require('../models/artist');
const artworkModel = require('../models/artwork');

// Fetch from Museum API
router.get('/fetch', async(req, res) => {
    try{
        let results = [];
        await axios.get('https://api.artic.edu/api/v1/artworks/search?q=TM-&fields=id,title,artist_id,artist_title,medium_display,date_display,place_of_origin,style_title,image_id,style_id&limit=100')
        .then(async(res) =>{
            for(let j = 0; j < (res.data.data).length; j++){
                results.push(res.data.data[j]);
            }

            let total = res.data.pagination.total_pages;
            console.log(total)
            for(let i = 2; i <= total; i++){
                await axios.get(`https://api.artic.edu/api/v1/artworks/search?query[term][is_public_domain]=true&fields=id,title,artist_id,artist_title,medium_display,date_display,place_of_origin,style_title,image_id,style_id&limit=100&page=${i}`)
                .then((result) => {
                    for(let j = 0; j < (result.data.data).length; j++){
                        results.push(result.data.data[j]);
                    }
                })
                .catch(error => {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
            })
            }
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        })

        console.log(results.length)

        const artworks = await artworkModel.find({});
        const newDocs = [];

        for (let i = 0; i < results.length; i++){
            let matchingDoc = artworks.find(doc => doc.id === results[i].id);
            let id = results[i].image_id;
            let thumbnail = `https://www.artic.edu/iiif/2/${id}/full/843,/0/default.jpg`;
            let fullImage = `https://www.artic.edu/iiif/2/${id}/full/1686,/0/default.jpg`;
            let price = Math.floor(Math.random() * (10000 - 1000) + 1000) / 100;
            let amount = Math.floor(Math.random() * (5000 - 1000) + 1000);

            if (!matchingDoc) {
                let artwork = new artworkModel({
                    id: results[i].id,
                    title: results[i].title,
                    artist_id: results[i].artist_id,
                    artist: results[i].artist_title,
                    medium: results[i].medium_display,
                    date: results[i].date_display,
                    origin: results[i].place_of_origin,
                    style_id: results[i].style_id,
                    style: results[i].style_title,
                    thumbnail: thumbnail,
                    fullImage: fullImage,
                    price: price,
                    amount: amount,
                });

                newDocs.push(artwork);
            }
        }

        // Save new documents
        await Promise.all(newDocs.map(doc => doc.save()));
        
        res.json('Artwork Collection Updated');
    }
    catch(err){
        console.error('Error Fetching Artwork Data:', err.message);
    }
});

// Return All
router.get('/', async(req, res) => {
    try{
        const artworks = await artworkModel.find({});
        res.json(artworks);
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

// Return Specific
router.get('/:id', async(req, res) => {
    try{
        const artwork = await artworkModel.findOne({id: req.params.id});
        res.json(artwork);
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

// Update Specific
router.post('/:id', async(req, res) => {
    try{
        const artwork = await artworkModel.findOne({id: req.params.id});
        artwork = req.body;
        artwork.save();
        res.status(200).json(artwork);
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

module.exports = router