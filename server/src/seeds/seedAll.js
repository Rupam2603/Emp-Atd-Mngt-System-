import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { CompanySetting } from '../models/CompanySetting.js';

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('DB connected for seeding');

  // Clear existing (optional)
  // await User.deleteMany({});
  // await CompanySetting.deleteMany({});

  const hrExists = await User.findOne({ email: 'hr@innereye.com' });
  if (!hrExists) {
    const passwordHash = await bcrypt.hash('hr1234', 10);
    await User.create({
      name: 'HR Admin',
      email: 'hr@innereye.com',
      passwordHash,
      role: 'hr',
      department: 'HR',
      designation: 'Admin',
    });
    console.log('HR user created: hr@innereye.com / hr1234');
  }

  const empExists = await User.findOne({ email: 'employee@innereye.com' });
  if (!empExists) {
    const passwordHash = await bcrypt.hash('emp1234', 10);
    await User.create({
      name: 'Test Employee',
      email: 'employee@innereye.com',
      passwordHash,
      role: 'employee',
      department: 'Engineering',
      designation: 'Developer',
    });
    console.log('Employee user created: employee@innereye.com / emp1234');
  }

  const settings = await CompanySetting.findOne();
  if (!settings) {
    await CompanySetting.create({
      workStart: '09:00',
      workEnd: '18:00',
      lateGraceMinutes: 15,
      minWorkHours: 8,
      leavePolicy: {
        casualPerYear: 12,
        sickPerYear: 10,
        paidPerYear: 15,
      },
    });
    console.log('Company settings created');
  }

  await mongoose.disconnect();
  console.log('Seeding completed');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});