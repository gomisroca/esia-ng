const express = require('express')
const router = express.Router()
const axios = require('axios');

const exhibitionModel = require('../models/exhibition');

// Fetch from Museum API
router.get('/fetch', async(req, res) => {
    try {
        let results = [];

        await axios.get('https://api.artic.edu/api/v1/exhibitions/search?query[term][status]=Confirmed&fields=id,title,image_url,aic_start_at,aic_end_at,short_description,web_url,gallery_title&limit=100')
        .then(async(res) =>{
            for(let j = 0; j < (res.data.data).length; j++){
                results.push(res.data.data[j]);
            }

            let total = res.data.pagination.total_pages;

            for(let i = 1; i < total; i++){
                await axios.get(`https://api.artic.edu/api/v1/exhibitions/search?query[term][status]=Confirmed&fields=id,title,image_url,aic_start_at,aic_end_at,short_description,web_url,gallery_title&limit=100&page=${i}`)
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

        const exhibitions = await exhibitionModel.find({});
        const modifiedDocs = [];
        const newDocs = [];
        const foundIds = [];

        for (let i = 0; i < results.length; i++){
            let matchingDoc = exhibitions.find(doc => doc.id === results[i].id);
            
            let yearRe = /\d{4}-\d{2}-\d{2}/gm
            let start = (results[i].aic_start_at).match(yearRe);
            let end = (results[i].aic_end_at).match(yearRe);
            
            let description = null;
            if(results[i].short_description !== null){
                description = (results[i].short_description).replace(/<\/?p[^>]*>/g, "");
            }
            
            let ticket_price = Math.floor(Math.random() * (5000 - 1000) + 1000) / 100;
            let ticket_amount = Math.floor(Math.random() * (5000 - 1000) + 1000);

            if (matchingDoc) {
                matchingDoc.id = results[i].id
                matchingDoc.title = results[i].title
                matchingDoc.image = results[i].image_url
                matchingDoc.url = results[i].web_url
                matchingDoc.start = start[0]
                matchingDoc.end = end[0]
                matchingDoc.description = description
                matchingDoc.gallery = results[i].gallery_title
                matchingDoc.ticket_amount = ticket_amount
                matchingDoc.ticket_price = ticket_price

                modifiedDocs.push(matchingDoc);
            } else{
                let exhibition = new exhibitionModel({
                    id: results[i].id,
                    title: results[i].title,
                    image: results[i].image_url,
                    url: results[i].web_url,
                    start: start[0],
                    end: end[0],
                    description: description,
                    gallery: results[i].gallery_title,
                    ticket_amount: ticket_amount,
                    ticket_price: ticket_price,
                });

                newDocs.push(exhibition);
            }
            foundIds.push(results[i].id);
        }
        // Save modified documents
        await Promise.all(modifiedDocs.map(doc => doc.save()));

        // Save new documents
        await Promise.all(newDocs.map(doc => doc.save()));

        // Delete documents with IDs that were not found
        const docsToDelete = exhibitions.filter(doc => !foundIds.includes(doc.id));
        await Promise.all(docsToDelete.map(doc => doc.deleteOne()));
        
        res.json('Exhibition Collection Updated');
    }
    catch(err){
        console.error('Error Fetching Exhibition Data:', err.message);
    }
});

// Return All
router.get('/', async(req, res) => {
    try{
        const exhibitions = await exhibitionModel.find({});
        res.json(exhibitions);
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

// Return Specific
router.get('/:id', async(req, res) => {
    try{
        const exhibition = await exhibitionModel.findOne({ id: req.params.id });
        res.json(exhibition);
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

// Update Specific
router.post('/:id', async(req, res) => {
    // TO DO
    try{
        const exhibition = await exhibitionModel.findOne({ id: req.params.id });
        res.json(exhibition);
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

module.exports = router