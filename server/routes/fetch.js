const express = require('express');
const router = express.Router();
const axios = require('axios');

async function artAPIFetch() {
    try{
        let results = await axios.get('https://api.artic.edu/api/v1/artworks/search?query[term][is_public_domain]=true&limit=20&fields=id,title,artist_title,medium_display,date_display,place_of_origin,style_title,image_id');
        let artArray = [];
        for (let i = 0; i < (results.data.data).length; i++){
            let id = results.data.data[i].image_id;
            let url = `https://www.artic.edu/iiif/2/${id}/full/843,/0/default.jpg`;
            let price = Math.floor(Math.random() * (1000000000 - 1000000) + 1000000) / 100;
            let art = {
                "id": results.data.data[i].id,
                "title": results.data.data[i].title,
                "artist": results.data.data[i].artist_title,
                "medium": results.data.data[i].medium_display,
                "date": results.data.data[i].date_display,
                "origin": results.data.data[i].place_of_origin,
                "style": results.data.data[i].style_title,
                "image": url,
                "price": price,
            }
            artArray.push(art)
        }
        return artArray;
    }
    catch(err){
        console.error('Error Fetching art data:', err.message);
    }
}

router.get('/art', async(req, res) => {
    try {
        const fetch = await artAPIFetch();
        res.status(201).send(fetch);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

module.exports = router