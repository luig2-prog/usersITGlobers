const mongoose = require('mongoose');

async function createInitialUser() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI_AUTH;
    
    // Check if already connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(mongoUri);
      console.log('Connected to MongoDB for initialization');
    }

    // Get the existing User model
    const User = mongoose.models.User;
    
    if (!User) {
      console.error('User model not found');
      return;
    }

    // Check if any user exists
    const userCount = await User.countDocuments();
    
    if (userCount === 0) {
      // Create default admin user with all required fields
      const adminUser = new User({
        firstName: 'Admin',
        paternalLastName: 'User',
        maternalLastName: 'System',
        phoneNumber: '1234567890',
        email: 'admin@example.com',
        username: 'admin',
        password: 'admin123', // Plain password, will be hashed by the pre-save middleware
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
  // Don't disconnect here as the connection might be needed by other parts of the application
}

// Export the function
module.exports = { createInitialUser }; 