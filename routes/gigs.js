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


//update gig 
router.put('/edit/:id', gigController.updateGig);

//delete all gigs
router.delete('/delete', gigController.deleteAllGig);


//delete gig 
router.delete('/delete/:id', gigController.deleteGig);



module.exports= router;