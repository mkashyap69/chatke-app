const mongoose = require('mongoose');

const friendsSchema = mongoose.Schema({
  loggedInUser: { type: mongoose.Schema.ObjectId, ref: 'User' },

  recentlyClickedUsers: { type: [mongoose.Schema.ObjectId], ref: 'User' },
});

const FriendsList = mongoose.model('FriendsList', friendsSchema);

module.exports = FriendsList;
