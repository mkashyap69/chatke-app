const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: { type: String, required: [true, 'Please provide your name!'] },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    select: false,
  },
  userId: {
    type: String,
    required: [true, 'Please provide your userId!'],
    unique: [true, 'This userId is already taken'],
    trim: true,
  },
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.correctPassword = async (candidatePass, userPass) => {
  return await bcrypt.compare(candidatePass, userPass);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
