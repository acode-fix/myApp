const express = require('express');
const router = express.Router();
 //import userController from '../controllers/userController';
const UserController =  require('../controllers/userController');
user  =  new UserController();



router.get('/', function(req, res, next) {
  res.send('user get request');
});


 router.post('/',user.create);


 module.exports = router

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