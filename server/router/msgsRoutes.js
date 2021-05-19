const express = require('express');
const authController = require('../controller/authController');
const msgsController = require('../controller/msgsController');
const cleanCache = require('../middlewares/cleanCache');

const Router = express.Router();

Router.route('/').post(
  authController.protect,
  cleanCache,
  msgsController.saveMsgsHistory
);
Router.route('/:roomName').get(
  authController.protect,
  msgsController.getMsgsHistory
);

module.exports = Router;
