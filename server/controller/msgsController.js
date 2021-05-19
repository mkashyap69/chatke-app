const catchAsync = require('../utils/catchAsync');
const Message = require('../model/MessageModel');

exports.saveMsgsHistory = catchAsync(async (req, res, next) => {
  const { msgsHistory, roomName, loggedInUser, clickedUser } = req.body;
  let msgsHistoryData;
  if (roomName && msgsHistory) {
    msgsHistoryData = await Message.findOneAndUpdate(
      { roomName },
      {
        $push: {
          msgsHistory,
        },
        loggedInUser,
        clickedUser,
      },
      { returnOriginal: false, upsert: true }
      //upsert true will create one document if no doc is found using the fillers
    );
    res.status(200).json({ status: 'Success', data: msgsHistoryData });
    return;
  }

  res.status(404).json({ status: 'Error', message: 'RoomName is required' });
});

exports.getMsgsHistory = catchAsync(async (req, res, next) => {
  const roomName = req.params.roomName;

  const msgsHistory = await Message.findOne({
    roomName,
  })
    .select('msgsHistory -_id')
    .cache({ key: req.user._id });
  if (!msgsHistory) {
    res.status(200).json({ status: 'Success', data: [] });
    return;
  }
  res.status(200).json({ status: 'Success', data: msgsHistory });
});

// exports.getFriendsLastChattedWith = catchAsync(async (req, res, next) => {
//   const loggedInUser = req.user._id;

//   const friendsList = await Message.find({
//     $or: [{ loggedInUser: loggedInUser }, { clickedUser: loggedInUser }],
//   })
//     .select('clickedUser loggedInUser')
//     .populate('clickedUser loggedInUser')
//     .sort('-updatedAt');

//   if (friendsList.length === 0) {
//     res.status(404).json({ status: 'Error', message: 'No data found' });
//   } else {
//     res.status(200).json({ status: 'Success', data: friendsList });
//   }
// });
