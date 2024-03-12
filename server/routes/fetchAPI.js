const express = require('express');
const router = express.Router();
const axios = require('axios');

const artworkModel = require('../models/artwork');
const exhibitionModel = require('../models/exhibition');
const artistModel = require('../models/artist');
const artworkStylesModel = require('../models/artwork-styles');

router.get('/exhibitions', async(req, res) => {
    try {
        let results = [];

        await axios.get('https://api.artic.edu/api/v1/exhibitions/search?query[term][status]=Confirmed&fields=id,title,image_url,aic_start_at,aic_end_at,short_description,web_url,gallery_title&limit=100').then(async(res) =>{
            for(let j = 0; j < (res.data.data).length; j++){
                results.push(res.data.data[j]);
            }

            let total = res.data.pagination.total_pages;

            for(let i = 1; i < 5; i++){
                await axios.get(`https://api.artic.edu/api/v1/exhibitions/search?query[term][status]=Confirmed&fields=id,title,image_url,aic_start_at,aic_end_at,short_description,web_url,gallery_title&limit=100&page=${i}`).then((result) => {
                    for(let j = 0; j < (res.data.data).length; j++){
                        results.push(res.data.data[j]);
                    }
                });
            }
        });

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
        
        console.log('Exhibition Collection Updated');
    }
    catch(err){
        console.error('Error Fetching Exhibition Data:', err.message);
    }
});

router.get('/artworks', async(req, res) => {
    try{
        let results = [];
        await axios.get('https://api.artic.edu/api/v1/artworks/search?q=TM-&fields=id,title,artist_id,artist_title,medium_display,date_display,place_of_origin,style_title,image_id,style_id&limit=100').then(async(res) =>{
            for(let j = 0; j < (res.data.data).length; j++){
                results.push(res.data.data[j]);
            }

            let total = res.data.pagination.total_pages;
            console.log(total)
            for(let i = 2; i <= total; i++){
                await axios.get(`https://api.artic.edu/api/v1/artworks/search?query[term][is_public_domain]=true&fields=id,title,artist_id,artist_title,medium_display,date_display,place_of_origin,style_title,image_id,style_id&limit=100&page=${i}`).then((result) => {
                    for(let j = 0; j < (res.data.data).length; j++){
                        results.push(res.data.data[j]);
                    }
                });
            }
        });

        console.log(results.length)

        const artworks = await artworkModel.find({});
        const modifiedDocs = [];
        const newDocs = [];
        const foundIds = [];

        for (let i = 0; i < results.length; i++){
            let matchingDoc = artworks.find(doc => doc.id === results[i].id);
            let id = results[i].image_id;
            let thumbnail = `https://www.artic.edu/iiif/2/${id}/full/843,/0/default.jpg`;
            let fullImage = `https://www.artic.edu/iiif/2/${id}/full/1686,/0/default.jpg`;
            let price = Math.floor(Math.random() * (10000 - 1000) + 1000) / 100;
            let amount = Math.floor(Math.random() * (5000 - 1000) + 1000);

            if (matchingDoc) {
                matchingDoc.id = results[i].id
                matchingDoc.title = results[i].title
                matchingDoc.artist_id = results[i].artist_id
                matchingDoc.artist = results[i].artist_title
                matchingDoc.medium = results[i].medium_display
                matchingDoc.date = results[i].date_display
                matchingDoc.origin = results[i].place_of_origin
                matchingDoc.style_id = results[i].style_id
                matchingDoc.style = results[i].style_title
                matchingDoc.thumbnail = thumbnail
                matchingDoc.fullImage = fullImage
                matchingDoc.price = price
                matchingDoc.amount = amount

                modifiedDocs.push(matchingDoc);
            } else{
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
            foundIds.push(results[i].id);
        }
        // Save modified documents
        await Promise.all(modifiedDocs.map(doc => doc.save()));

        // Save new documents
        await Promise.all(newDocs.map(doc => doc.save()));
        
        console.log('Artwork Collection Updated');
    }
    catch(err){
        console.error('Error Fetching Artwork Data:', err.message);
    }
});

router.get('/artwork-styles', async(req, res) => {
    try {
        const arts = await artworkModel.find({});
        let artworks = arts.filter(doc => doc.style_id !== null);

        let results = [];
        for(let i = 0; i < artworks.length; i++){
            await axios.get(`https://api.artic.edu/api/v1/category-terms/search?query[term][id]=${artworks[i].style_id}`).then(async(res) =>{
                for(let j = 0; j < (res.data.data).length; j++){
                    results.push(res.data.data[j]);
                }
            });
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
        
        console.log('Artwork Styles Collection Updated');
    }
    catch(err){
        console.error('Error Fetching Artwork Styles Data:', err.message);
    }
});

router.get('/artists', async(req, res) => {
    try {
        let results = [];

        await axios.get('https://api.artic.edu/api/v1/agents/search?query[bool][filter][term][description]=he&fields=is_artist,title,birth_date,death_date,description,sort_title,id&limit=100').then(async(res) =>{
            for(let j = 0; j < (res.data.data).length; j++){
                results.push(res.data.data[j]);
            }

            let total = res.data.pagination.total_pages;

            for(let i = 1; i < 5; i++){
                await axios.get(`https://api.artic.edu/api/v1/agents/search?query[bool][filter][term][description]=he&fields=is_artist,title,birth_date,death_date,description,sort_title,id&limit=100&page=${i}`).then((result) => {
                    for(let j = 0; j < (res.data.data).length; j++){
                        results.push(res.data.data[j]);
                    }
                });
            }
        });

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
        
        console.log('Artist Collection Updated');
    }
    catch(err){
        console.error('Error Fetching Artist Data:', err.message);
    }
});





module.exports = router