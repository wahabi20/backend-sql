
const Gig = require('../models/gig');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;//enable using like operation



//get all gigs
module.exports.getAllGigs = async (req,res) => {
 
  await Gig.findAll()
      .then(gigs => {
         // console.log(gigs);
          res.send({gigs});
      })
      .catch(err => console.log(err));
}

//add gig 
module.exports.addGig = async (req,res) => {
   
        if(!req.body.title || null){
            res.status(400).send({
                message: "title can not be empty!"
            });
            return;
        }
        //Insert into table
        Gig.create({
            title:req.body.title,
            technologies:req.body.technologies,
            description:req.body.description,
            budget:req.body.budget,
            contact_email:req.body.contact_email
        }).then( gig =>
            // res.redirect('/gigs')
            res.status(200).send(gig)
            )
        .catch(err => console.log(err));
 
}

//Search for gigs by technologies
 module.exports.searchGig = (req,res) => {
  const {term} = req.query;
  //Make lowercase 
  //term = term.toLowerCase();

  console.log("trem>>>",term)
  Gig.findAll({where: {technologies: {[Op.like]: '%' + term + '%'} }})
  .then( gigs => {
      res.status(200).send(gigs)}
      )
  .catch(err=> console.log(err))
}


//find gig by id
module.exports.getGigById = (req,res) => {
    const id = req.params.id;
    console.log(id)

   Gig.findByPk(id).then(data => {
         res.send(data);
    }).catch(err=> {
        res.status(500).send({
             message:"Error retrieving gig with id=" + id 
        });
    })
}

module.exports.updateGig = (req,res) => {
    const id = req.params.id;
    Gig.update(req.body, {
        where: {id:id}
    }).then(num => {
         console.log("num>>>", num);
         if(num == 1){
             res.send({
                 message:"gig was updated successfully",
             })
         }
    })
      .catch(err=> {
          res.status(500).send({
              message: "Error updating gig with id=" + id 
          });
      })
}

//Delete a gig with the specified id in the request
module.exports.deleteGig = (req,res) => {
    const id = req.params.id;
    Gig.destroy({
        where: {id: id}
    }).then(num => {
         console.log("num>>>", num);
         if(num == 1){
             res.send({
                 message:"gig was deleted successfully",
             });
         }else{
             res.send({
                 message: `Cannot delete gig with id=${id}. Maybe gig was not found!`
             });
         }
    })
      .catch(err=> {
          res.status(500).send({
              message: "Error delete gig with id=" + id 
          });
      })
}

//Delete a gig with the specified id in the request
module.exports.deleteAllGig = (req,res) => {
    const id = req.params.id;
    Gig.destroy({
        where: {},
        truncate: false
    }).then(nums => {
         console.log("num>>>", nums);
         
             res.send({
                 message: `${nums} gig were deleted successfully!`
             });
        
    })
      .catch(err=> {
          res.status(500).send({
              message: err.message || "some error occurred while removing all gig."
          });
      });
};