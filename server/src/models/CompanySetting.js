import mongoose from 'mongoose';

const companySettingSchema = new mongoose.Schema(
  {
    workStart: { type: String, default: '09:00' },
    workEnd: { type: String, default: '18:00' },
    lateGraceMinutes: { type: Number, default: 15 },
    minWorkHours: { type: Number, default: 8 },
    leavePolicy: {
      casualPerYear: { type: Number, default: 12 },
      sickPerYear: { type: Number, default: 10 },
      paidPerYear: { type: Number, default: 15 },
    },
  },
  { timestamps: true }
);

export const CompanySetting = mongoose.model('CompanySetting', companySettingSchema);