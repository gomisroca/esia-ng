const express = require('express')
const router = express.Router()

const DiscordMember = require('../models/discord')
const LodestoneMember = require('../models/lodestone')

//FETCHES
router.get('/combined', async(req, res) => {
    try{
        let members = [];
        const lodestoneMembers = await LodestoneMember.find({})
        for(let i = 0; i < lodestoneMembers.length; i++){
            if (lodestoneMembers[i].linkedDC){
                await lodestoneMembers[i].populate("linkedDC");
                members.push(lodestoneMembers[i])
            }
        }
        res.json(members)
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

router.get('/discord', async(req, res) => {
    try{
        const discordmembers = await DiscordMember.find()
        res.json(discordmembers)
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

router.get('/lodestone', async(req, res) => {
    try{
        const lodestoneMembers = await LodestoneMember.find()
        res.json(lodestoneMembers)
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

router.get('/:id', async(req, res) => {
    try{
        const member = await LodestoneMember.findOne({ id: req.params.id });
        await member.populate("linkedDC");
        res.json(member);
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

//Combine or split Member
router.post('/combine', async (req, res) => {
    const discordReq = req.body.find(mem => mem.type == 'discord');
    const discordMember = await DiscordMember.findOne({ id: discordReq.id });

    const lodestoneReq = req.body.find(mem => mem.type == 'lodestone');
    const lodestoneMember = await LodestoneMember.findOne({ id: lodestoneReq.id });

    lodestoneMember.linkedDC = discordMember._id
    lodestoneMember.populate("linkedDC");
    discordMember.combined = true;

    try{
        await discordMember.save();
        const newMember = await lodestoneMember.save();
        res.status(200).json(newMember)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
router.post('/split', async(req, res) => {
    try {
            const discord = await DiscordMember.findOne({ id: req.body.linkedDC.id });
            const lodestone = await LodestoneMember.findOne({ id: req.body.id });
            discord.combined = false;
            lodestone.linkedDC = undefined;
        try{
            await discord.save();
            await lodestone.save();
            res.status(200).json({message: 'Member Split Successful'});
        }catch(err){
            res.status(400).json({message: err.message});
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }   
})

// ALT HANDLING
router.post('/alt', async (req, res) => {
    const discordMember = await DiscordMember.findOne({ id: req.body.discord });
    const lodestoneMember = await LodestoneMember.findOne({ id: req.body.lodestone });
    lodestoneMember.linkedDC = discordMember._id;
    lodestoneMember.populate("linkedDC");
    lodestoneMember.alt = true;
    discordMember.combined = true;

    try{
        await discordMember.save();
        const updatedMember = await lodestoneMember.save();
        res.status(200).json(updatedMember)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
router.post('/alt-remove', async(req, res) => {
    try {
        for(let i = 0; i < req.body.length; i++) {
            let member = await LodestoneMember.findOne({ id: req.body[i].id });
            member.alt = false;
            member.linkedDC = undefined;
            await member.save();
        }
        try{
            res.status(200).json({message: 'Alts Split Successful'});
        }catch(err){
            res.status(400).json({message: err.message})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

// ADD/EDIT COMMENT
router.post('/comment', async (req, res) => {
    const member = await LodestoneMember.findOne({ id: req.body.lodestone });
    member.comment = req.body.comment;
    try{
        const updatedMember = await member.save();
        res.status(200).json(updatedMember)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

module.exports = router
