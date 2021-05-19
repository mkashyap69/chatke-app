const FriendsList = require('../model/FriendsModel');

const catchAsync = require('../utils/catchAsync');

exports.getRecentFriends = catchAsync(async (req, res, next) => {
  const user = req.user;

  const friendsList = await FriendsList.findOne({
    loggedInUser: user._id,
  })
    .cache({
      key: user._id,
    })
    .select('recentlyClickedUsers')
    .populate('recentlyClickedUsers');
  if (!friendsList) {
    res.status(404).json({ status: 'Error', message: 'No data found' });
    return;
  }

  res.status(200).json({ status: 'Success', data: friendsList });
});

exports.addUserToFriends = catchAsync(async (req, res, next) => {
  const clickedUser = req.body.clickedUser;
  const user = req.user;

  const friendsList = await FriendsList.findOneAndUpdate(
    { loggedInUser: user._id },
    {
      $addToSet: {
        recentlyClickedUsers: clickedUser,
      },
    },
    { returnOriginal: false, upsert: true }
  )
    .select('recentlyClickedUsers')
    .populate('recentlyClickedUsers');

  res.status(200).json({ status: 'Success', data: friendsList });
});
