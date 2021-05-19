const mongoose = require('mongoose');

const MsgSchema = mongoose.Schema(
  {
    loggedInUser: { type: mongoose.Schema.ObjectId, ref: 'User' },
    clickedUser: { type: mongoose.Schema.ObjectId, ref: 'User' },
    roomName: {
      type: Number,
      required: true,
    },
    msgsHistory: [
      {
        message: String,
        user: String,
        current_time: String,
        outgoing: Boolean,
      },
    ],
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', MsgSchema);

module.exports = Message;
