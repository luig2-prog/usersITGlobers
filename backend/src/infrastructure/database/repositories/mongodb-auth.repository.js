const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

class MongoDBAuthRepository {
  async createUser(userData) {
    const existing = await UserModel.findOne({
      $or: [
        { email: userData.email },
        { username: userData.username },
        { phoneNumber: userData.phoneNumber }
      ]
    });
    if (existing) throw new Error('El email, username o teléfono ya está registrado');
    const user = new UserModel(userData);
    return await user.save();
  }

  async login(identifier, password) {
    const user = await UserModel.findOne({
      $or: [
        { username: identifier },
        { phoneNumber: identifier }
      ]
    });
    if (!user) throw new Error('Credenciales inválidas');
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Credenciales inválidas');
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return { user, token };
  }

  async getAllUsers() {
    return await UserModel.find({}, '-password');
  }
}

module.exports = MongoDBAuthRepository; 