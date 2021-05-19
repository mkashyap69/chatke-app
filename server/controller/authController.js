const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const bcrypt = require('bcryptjs');
const User = require('../model/UserModel');
const catchAsync = require('../utils/catchAsync');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 3600000 });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  user.password = undefined;

  res.status(statusCode).json({ status: 'Success', token, data: { user } });
};

exports.signup = catchAsync(async (req, res, next) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.userId
  ) {
    res.status(406).json({
      status: 'Error',
      message: 'Please provide with all the mentioned details.',
    });
    return;
  }
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    userId: req.body.userId,
  });

  const token = signToken(user._id);

  res.status(200).json({ status: 'Success', token, data: { user } });
});
exports.login = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(406).json({
      status: 'Error',
      message: 'Please provide with email and password',
    });
    return;
  }
  const userFound = await User.findOne({ email }).select('+password');
  if (!userFound) {
    res.status(401).json({
      status: 'Error',
      message: 'Incorrect email or password',
    });
    return;
  }
  const correct = await userFound.correctPassword(password, userFound.password);
  if (!correct) {
    res.status(401).json({
      status: 'Error',
      message: 'Incorrect email or password',
    });
    return;
  }

  createSendToken(userFound, 201, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(406).json({
      status: 'Error',
      message: 'You are not logged in',
    });
    return;
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    res.status(401).json({
      status: 'Error',
      message: 'The user belonging to the token no longer exist',
    });
    return;
  }

  req.user = currentUser;
  next();
});
