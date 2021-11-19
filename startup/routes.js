const express=require('express');

const gigs=require('../routes/gigs');

module.exports=function(app){
    app.use(express.json());
   
    app.use('/sq/api/gigs',gigs);

  

}