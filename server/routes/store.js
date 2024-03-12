const express = require('express');
const router = express.Router();

const artworkModel = require('../models/artwork');
const exhibitionModel = require('../models/exhibition');
const artistModel = require('../models/artist');
const artworkStylesModel = require('../models/artwork-styles');

// Exhibitions
    // Get all exhibitions and their ticket info
router.get('/exhibitions', async(req, res) => {

})

    // Update the Exhibition Ticker amount
router.put('/exhibitions/:id', async(req, res) => {

})

// Artworks
    // Get all artworks and their price
router.get('/artworks', async(req, res) => {

})

    // Update the Artworks sold amount and available amount
router.put('/artworks/:id', async(req, res) => {

})

// Gallery Products
    // Get all products and their price
router.get('/products', async(req, res) => {

})

    // Update the products sold amount and available amount
router.put('/products/:id', async(req, res) => {

})