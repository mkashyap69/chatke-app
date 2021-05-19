const User = require('../model/UserModel');

exports.getUserByUserId = async (req, res) => {
  const user = await User.findOne({ userId: req.params.userId });

  if (!user) {
    res.status(404).json({ status: 'Error', message: 'User not found' });
  } else {
    res.status(200).json({ status: 'Success', data: user });
  }
};
