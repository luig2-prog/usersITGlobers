const mongoose = require('mongoose');
const config = require('../config/config');

async function createInitialUser() {
  try {
    const mongoUri = config.mongoUriAuth;
    
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(mongoUri);
      console.log('Connected to MongoDB for initialization');
    }

    const User = mongoose.models.User;
    
    if (!User) {
      console.error('User model not found');
      return;
    }

    const userCount = await User.countDocuments();
    
    if (userCount === 0) {
      const adminUser = new User({
        firstName: 'Admin',
        paternalLastName: 'User',
        maternalLastName: 'System',
        phoneNumber: '1234567890',
        email: 'admin@example.com',
        username: 'admin',
        password: 'admin123',
        role: 'ADMIN'
      });

      await adminUser.save();
      console.log('Initial admin user created successfully');
    } else {
      console.log('Users already exist, skipping initial user creation');
    }
  } catch (error) {
    console.error('Error creating initial user:', error);
  }
}

module.exports = { createInitialUser }; 