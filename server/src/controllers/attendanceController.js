import {
  checkInUser,
  checkOutUser,
  getTodayAttendance,
  getAttendanceHistory,
} from '../services/attendanceService.js';
import { success, error } from '../utils/response.js';

export async function checkIn(req, res, next) {
  try {
    const userId = req.user.id;
    const { location } = req.body;
    const log = await checkInUser(userId, location);
    return success(res, log, 'Checked in successfully');
  } catch (err) {
    next(err);
  }
}

export async function checkOut(req, res, next) {
  try {
    const userId = req.user.id;
    const log = await checkOutUser(userId);
    return success(res, log, 'Checked out successfully');
  } catch (err) {
    next(err);
  }
}

export async function getToday(req, res, next) {
  try {
    const userId = req.user.id;
    const log = await getTodayAttendance(userId);
    return success(res, log || null, 'Today attendance fetched');
  } catch (err) {
    next(err);
  }
}

export async function getHistory(req, res, next) {
  try {
    const userId = req.user.id;
    const { from, to } = req.query;
    const logs = await getAttendanceHistory(userId, from, to);
    return success(res, logs, 'Attendance history fetched');
  } catch (err) {
    next(err);
  }
}