const express = require('express')
const router = express.Router()

const artworkModel = require('../models/artwork');
const exhibitionModel = require('../models/exhibition');
const artistModel = require('../models/artist');
const artworkStylesModel = require('../models/artwork-styles');

//FETCHES
router.get('/artworks', async(req, res) => {
    try{
        const artworks = await artworkModel.find({});
        res.json(artworks);
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

router.get('/artwork-styles', async(req, res) => {
    try{
        const styles = await artworkStylesModel.find({});
        res.json(styles);
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

router.get('/artwork-styles/:id', async(req, res) => {
    try{
        const artworks = await artworkModel.find({});
        let data = artworks.filter(doc => doc.style_id === req.params.id);

        res.json(data);
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

router.get('/exhibitions', async(req, res) => {
    try{
        const exhibitions = await exhibitionModel.find({});
        res.json(exhibitions);
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})
router.get('/exhibitions/:id', async(req, res) => {
    try{
        const exhibitions = await exhibitionModel.find({});
        let data = exhibitions.find(doc => doc.id == req.params.id);

        res.json(data);
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

router.get('/artists', async(req, res) => {
    try{
        const artists = await artistModel.find({});
        res.json(artists);
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})
router.get('/artists/:id', async(req, res) => {
    try{
        const artworks = await artworkModel.find({});
        const artists = await artistModel.find({});
        let artData = artworks.filter(doc => doc.artist_id == req.params.id);
        let artistData = artists.find(doc => doc.id == req.params.id);
        let data = {
            art: artData,
            artist: artistData,
        }
        res.json(data);
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

module.exports = router