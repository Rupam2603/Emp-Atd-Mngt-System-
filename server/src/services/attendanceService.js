import { AttendanceLog } from '../models/AttendanceLog.js';
import { CompanySetting } from '../models/CompanySetting.js';
import { startOfDay, endOfDay, parseTimeToToday } from '../utils/dateUtils.js';

export async function checkInUser(userId, location = null) {
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());

  const existing = await AttendanceLog.findOne({
    userId,
    date: { $gte: todayStart, $lt: todayEnd },
  });

  if (existing) {
    const err = new Error('Already checked in today');
    err.statusCode = 400;
    throw err;
  }

  const log = new AttendanceLog({
    userId,
    date: new Date(),
    checkIn: new Date(),
    location,
  });

  await log.save();
  return log;
}

export async function checkOutUser(userId) {
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());

  const log = await AttendanceLog.findOne({
    userId,
    date: { $gte: todayStart, $lt: todayEnd },
    checkIn: { $exists: true },
  });

  if (!log) {
    const err = new Error('No check-in found for today');
    err.statusCode = 400;
    throw err;
  }

  if (log.checkOut) {
    const err = new Error('Already checked out today');
    err.statusCode = 400;
    throw err;
  }

  const now = new Date();
  log.checkOut = now;

  const settings = await CompanySetting.findOne();
  if (!settings) {
    const err = new Error('Company settings not configured');
    err.statusCode = 500;
    throw err;
  }

  const { workStart, workEnd, lateGraceMinutes, minWorkHours } = settings;

  const workStartTime = parseTimeToToday(workStart);
  const workEndTime = parseTimeToToday(workEnd);

  const workedMs = log.checkOut - log.checkIn;
  const workedSeconds = Math.max(0, Math.floor(workedMs / 1000));

  const lateMs = Math.max(0, log.checkIn - workStartTime);
  const lateSeconds = Math.floor(lateMs / 1000);

  const earlyLeaveMs = Math.max(0, workEndTime - log.checkOut);
  const earlyLeaveSeconds = Math.floor(earlyLeaveMs / 1000);

  const lateGraceSeconds = lateGraceMinutes * 60;
  const minWorkSeconds = minWorkHours * 3600;

  let status = 'present';

  if (workedSeconds < minWorkSeconds) {
    status = 'half_day';
  }

  if (lateSeconds > lateGraceSeconds) {
    status = status === 'half_day' ? 'half_day' : 'late';
  }

  if (earlyLeaveSeconds > lateGraceSeconds && status !== 'half_day') {
    status = 'early_leave';
  }

  log.workedSeconds = workedSeconds;
  log.lateSeconds = lateSeconds;
  log.earlyLeaveSeconds = earlyLeaveSeconds;
  log.status = status;

  await log.save();
  return log;
}

export async function getTodayAttendance(userId) {
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());

  const log = await AttendanceLog.findOne({
    userId,
    date: { $gte: todayStart, $lt: todayEnd },
  }).populate('userId', 'name email role');

  return log;
}

export async function getAttendanceHistory(userId, from, to) {
  const query = { userId };
  if (from || to) {
    query.date = {};
    if (from) query.date.$gte = new Date(from);
    if (to) query.date.$lte = new Date(to);
  }

  const logs = await AttendanceLog.find(query)
    .sort({ date: -1 })
    .populate('userId', 'name email role');

  return logs;
}