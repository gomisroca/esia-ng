const express = require('express');
const router = express.Router();
const axios = require('axios');

const artistModel = require('../models/artist');
const artworkModel = require('../models/artwork');

// Fetch from Museum API
router.get('/fetch', async(req, res) => {
    try {
        let results = [];

        await axios.get('https://api.artic.edu/api/v1/agents/search?query[bool][filter][term][description]=he&fields=is_artist,title,birth_date,death_date,description,sort_title,id&limit=100')
        .then(async(res) =>{
            for(let j = 0; j < (res.data.data).length; j++){
                results.push(res.data.data[j]);
            }

            let total = res.data.pagination.total_pages;

            for(let i = 1; i < total; i++){
                await axios.get(`https://api.artic.edu/api/v1/agents/search?query[bool][filter][term][description]=he&fields=is_artist,title,birth_date,death_date,description,sort_title,id&limit=100&page=${i}`)
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

        console.log(results.length);

        const artists = await artistModel.find({});
        const modifiedDocs = [];
        const newDocs = [];
        const foundIds = [];

        for (let i = 0; i < results.length; i++){
            let matchingDoc = artists.find(doc => doc.id === results[i].id);

            if (matchingDoc) {
                matchingDoc.id = results[i].id
                matchingDoc.title = results[i].title
                matchingDoc.sort_title = results[i].sort_title
                matchingDoc.birth = results[i].birth
                matchingDoc.death = results[i].death
                matchingDoc.description = results[i].description

                modifiedDocs.push(matchingDoc);
            } else{
                let artist = new artistModel({
                    id: results[i].id,
                    title: results[i].title,
                    sort_title: results[i].sort_title,
                    birth: results[i].birth_date,
                    death: results[i].death_date,
                    description: results[i].description,
                });

                newDocs.push(artist);
            }
            foundIds.push(results[i].id);
        }
        // Save modified documents
        await Promise.all(modifiedDocs.map(doc => doc.save()));

        // Save new documents
        await Promise.all(newDocs.map(doc => doc.save()));

        // Delete documents with IDs that were not found
        const docsToDelete = artists.filter(doc => !foundIds.includes(doc.id));
        await Promise.all(docsToDelete.map(doc => doc.deleteOne()));
        
        res.json('Artist Collection Updated');
    }
    catch(err){
        console.error('Error Fetching Artist Data:', err.message);
    }
});

// Return All
router.get('/', async(req, res) => {
    try{
        const artists = await artistModel.find({});
        res.json(artists);
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

// Return Specific
router.get('/:id', async(req, res) => {
    try{
        const artworks = await artworkModel.find({ artist_id: req.params.id });
        const artist = await artistModel.findOne({ id: req.params.id });
        let data = {
            art: artworks,
            artist: artist,
        }
        res.json(data);
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

// Update Specific
router.post('/:id', async(req, res) => {
    // TO DO
    try{
        const artworks = await artworkModel.find({ artist_id: req.params.id });
        const artist = await artistModel.findOne({ id: req.params.id });
        let data = {
            art: artworks,
            artist: artist,
        }
        res.json(data);
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

module.exports = router