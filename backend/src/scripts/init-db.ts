import dotenv from 'dotenv';
import { connectDB } from './config/database';
import Admin from './models/Admin';

dotenv.config();

const initializeDatabase = async () => {
  try {
    await connectDB();
    console.log('Connected to database');

    // Check if default admin exists
    const adminExists = await Admin.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (adminExists) {
      console.log('Default admin already exists');
      process.exit(0);
    }

    // Create default admin
    const admin = new Admin({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      firstName: 'Admin',
      lastName: 'User',
      role: 'superadmin',
    });

    await admin.save();
    console.log('Default admin created successfully');
    console.log(`Email: ${process.env.ADMIN_EMAIL}`);
    console.log(`Password: ${process.env.ADMIN_PASSWORD}`);

    process.exit(0);
  } catch (error) {
    console.error('Initialization failed:', error);
    process.exit(1);
  }
};

initializeDatabase();
