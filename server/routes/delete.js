const express = require('express')
const router = express.Router()

const DiscordMember = require('../models/discord')
const LodestoneMember = require('../models/lodestone')

const { db } = require('../server.js');


router.post('/all', async (req, res) => {
  try {
    await db.dropDatabase();
    console.log('Database dropped successfully');
    res.send('Database dropped successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error dropping database');
  }
});

router.post('/discord', async (req, res) => {
  try {
    const collectionName = DiscordMember.collection.name;
    await db.collection(collectionName).drop();
    console.log(`Collection ${collectionName} dropped successfully`);
    res.send(`Collection ${collectionName} dropped successfully`);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error dropping collection`);
  }
});

router.post('/lodestone', async (req, res) => {
  try {
    const collectionName = LodestoneMember.collection.name;
    await db.collection(collectionName).drop();
    console.log(`Collection ${collectionName} dropped successfully`);
    res.send(`Collection ${collectionName} dropped successfully`);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error dropping collection`);
  }
});

router.post('/combined', async (req, res) => {
  try{
    let discord = await DiscordMember.find();
    let lodestone = await LodestoneMember.find();
    discord = discord.filter(member => member.combined == true);
    lodestone = lodestone.filter(member => member.linkedDC);
    for (let i = 0; i < discord.length; i++){
        discord[i].combined = false;
        discord[i].save();
    }
    for (let i = 0; i < lodestone.length; i++){
        lodestone[i].alt = false;
        lodestone[i].linkedDC = undefined;
        lodestone[i].save();
    }

    res.json({message: 'Combined Members Split.'});
  }catch(err){
      res.status(500).json({message: err.message})
  }   
});

router.get('/comment', async(req, res) => {
  try{
      await LodestoneMember.updateMany({}, { comment: undefined });
      res.json({message: 'Comments deleted.'});
  }catch(err){
      res.status(500).json({message: err.message})
  }   
})

module.exports = router
