const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, maxlength: 40 },
  paternalLastName: { type: String, required: true, maxlength: 40 },
  maternalLastName: { type: String, maxlength: 40 },
  phoneNumber: { type: String, required: true, unique: true, maxlength: 10, minlength: 10 },
  email: { type: String, maxlength: 40 },
  username: { type: String, required: true, unique: true, maxlength: 30 },
  password: { type: String, required: true, maxlength: 20 }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema); 