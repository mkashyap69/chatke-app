const express = require('express');
const authController = require('../controller/authController');
const userController = require('../controller/userController');

const Router = express.Router();

Router.post('/signup', authController.signup);
Router.post('/login', authController.login);
Router.get('/:userId', authController.protect, userController.getUserByUserId);

module.exports = Router;
