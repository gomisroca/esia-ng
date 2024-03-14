const express = require('express')
const router = express.Router()
const axios = require('axios');

const artworkModel = require('../models/artwork');
const exhibitionModel = require('../models/exhibition');
const artistModel = require('../models/artist');
const artworkStylesModel = require('../models/artwork-styles');

// Fetch from Museum API
router.get('/fetch', async(req, res) => {
    try {
        const arts = await artworkModel.find({});
        let artworks = arts.filter(doc => doc.style_id !== null);

        let results = [];
        for(let i = 0; i < artworks.length; i++){
            await axios.get(`https://api.artic.edu/api/v1/category-terms/search?query[term][id]=${artworks[i].style_id}`)
            .then(async(res) =>{
                for(let j = 0; j < (res.data.data).length; j++){
                    results.push(res.data.data[j]);
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
        results = results.filter((art, index, array) => array.findIndex(t => t.id == art.id) == index);

        const styles = await artworkStylesModel.find({});
        const modifiedDocs = [];
        const newDocs = [];
        const foundIds = [];

        for (let i = 0; i < results.length; i++){
            let artwork = artworks.find(doc => doc.style_id == results[i].id);
            
            let banner = null;
            if(artwork){
                banner = artwork.thumbnail;
            }

            let matchingDoc = styles.find(doc => doc.id === results[i].id);

            if (matchingDoc) {
                matchingDoc.title = results[i].title
                matchingDoc.id = results[i].id
                matchingDoc.banner = banner
                
                modifiedDocs.push(matchingDoc);
            } else{
                let style = new artworkStylesModel({
                    title: results[i].title,
                    id: results[i].id,
                    banner: banner,
                });

                newDocs.push(style);
            }
            foundIds.push(results[i].id);
        }
        // Save modified documents
        await Promise.all(modifiedDocs.map(doc => doc.save()));

        // Save new documents
        await Promise.all(newDocs.map(doc => doc.save()));

        // Delete documents with IDs that were not found
        const docsToDelete = styles.filter(doc => !foundIds.includes(doc.id));
        await Promise.all(docsToDelete.map(doc => doc.deleteOne()));
        
        res.json('Artwork Styles Collection Updated');
    }
    catch(err){
        console.error('Error Fetching Artwork Styles Data:', err.message);
    }
});

// Return All
router.get('/', async(req, res) => {
    try{
        const styles = await artworkStylesModel.find({});
        res.json(styles);
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

// Return Specific
router.get('/:id', async(req, res) => {
    try{
        const artworks = await artworkModel.find({style_id: req.params.id});
        res.json(artworks);
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

// Update Specific
router.post('/:id', async(req, res) => {
    try{
        const artstyle = await artworkStylesModel.find({id: req.params.id});
        artstyle = req.body;
        artstyle.save();
        res.status(200).json(artstyle);
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

module.exports = router