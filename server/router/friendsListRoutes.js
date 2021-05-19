const express = require('express');
const authController = require('../controller/authController');
const recentFriendsListController = require('../controller/recentFriendsListController');
const cleanCache = require('../middlewares/cleanCache');

const Router = express.Router();

Router.route('/')
  .get(authController.protect, recentFriendsListController.getRecentFriends)
  .post(
    authController.protect,
    cleanCache,
    recentFriendsListController.addUserToFriends
  );

module.exports = Router;
