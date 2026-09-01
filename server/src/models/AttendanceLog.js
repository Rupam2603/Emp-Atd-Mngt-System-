import mongoose from 'mongoose';

const attendanceLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    checkIn: Date,
    checkOut: Date,
    status: {
      type: String,
      enum: ['present', 'absent', 'late', 'early_leave', 'half_day', 'on_leave'],
      default: 'present',
    },
    workedSeconds: { type: Number, default: 0 },
    lateSeconds: { type: Number, default: 0 },
    earlyLeaveSeconds: { type: Number, default: 0 },
    notes: String,
    location: {
      lat: Number,
      lng: Number,
    },
  },
  { timestamps: true }
);

attendanceLogSchema.index({ userId: 1, date: 1 }, { unique: true });

export const AttendanceLog = mongoose.model('AttendanceLog', attendanceLogSchema);