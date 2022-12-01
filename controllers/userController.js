const express = require('express')
const mongoose  = require('mongoose')
const User = mongoose.model('Users') 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()

 class userController {
       constructor(){
       }

           create = (req, res) => {            
            bcrypt.hash(req.body.password, 10)
            .then((hashedPassword) => {
              // create a new user instance and collect the data
              const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
              });
                 
                   user.save()
              // return success if the new user is added to the database successfully
              .then((result) => {
                res.status(201).send({
                  message: "User has been created",
                  result,
                });
                  
              })
              // catch error if the new user wasn't added successfully to the database
              .catch((error) => {

                res.status(500).send({
                  message: "Error creating user",
                  error,
                });

              });
        
            })
            .catch((error) => {
              //throw new Error(error.message);
                res.status(500).send({
                  message: "Password was not hashed successfully",
                  error,
                });
            })

           }

           login = (req, res) => {    

           User.findOne({ email: req.body.email })
            .then((user) => {

              bcrypt
              .compare(req.body.password, user.password)
              .then((passwordCheck) => {
                
               // check if password matches
          if(!passwordCheck) {
            return res.status(400).send({
              message: "Passwords does not match",
               error,
            });
          }

                 //   create JWT token
          const token = jwt.sign(
               {
              userId: user._id,
              userEmail: user.email,
            },
             process.env.JWT_TOKEN,
            { expiresIn: process.env.JWT_EXP }
          );
                
                res.status(200).send({
                  message: "Login successfully!",
                  token:token,
                });

                  
              })
              // catch error if the new user wasn't added successfully to the database
              .catch((error) => {

                res.status(400).send({
                  message: "Password does not match",
                  error,
                });

              });
        
            })
            .catch((error) => {
                res.status(404).send({
                  message: "Email is not found",
                  error,
                });
            })

           }   


   }


   //export default userController;
   module.exports = userController

//  router.get('/user',(req,res)=>{
    
//     Student.find((err, docs)=>{
//    if(!err)
//     res.render( 'student/list',{ list:docs })
//       else 
//       console.log( 'error during update ' + err )
//  }  
//     )
// })

// router.get('/:id',(req,res)=>{
    
//    Student.findById( req.params.id,(err, docs)=>{
//   if(!err)
//    res.render( 'student/add_edit',{student:docs, viewTitle:'Update Student' })
//      else 
//      console.log( 'error during update ' + err )
// }  
//    )
// })

// router.get('/delete/:id',(req,res)=>{
    
//    Student.findByIdAndRemove( req.params.id,(err, docs)=>{
//   if(!err)
//    res.redirect('/student/list')
//      else 
//      console.log( 'error during delete' + err )
// }  
//    )
// })






// function updateRecord(req, res){
//       Student.findOneAndUpdate({
//              _id:req.body._id
//       },   req.body, {new:true},(err,doc)=>{
//            if(!err){
//              res.redirect('student/list')
//            }else {
//              console.log( 'error during update' + err ) 
//            }
//       }
//           )      
// } 