const express = require('express');
const router = express.Router();
// import UserController from '../controllers/userController';
const UserController =  require('../controllers/userController');
user  =  new UserController();

 router.post('/',user.login);

 module.exports = router
