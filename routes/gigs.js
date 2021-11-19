const express = require('express');
const router = express.Router();




const gigController = require('../controllers/gig.controller')

//find all gigs
router.get('/',  gigController.getAllGigs );


//add gig
router.post('/add', gigController.addGig);


//Search for gigs by technologies
router.get('/search', gigController.searchGig );


// Find a single gig with an id 
router.get('/:id', gigController.getGigById);

module.exports= router;