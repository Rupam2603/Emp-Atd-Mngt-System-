import { User } from '../models/User.js';
import { AttendanceLog } from '../models/AttendanceLog.js';
import { LeaveRequest } from '../models/LeaveRequest.js';
import { startOfDay, endOfDay } from '../utils/dateUtils.js';

export async function getHrDashboardStats() {
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());

  const totalEmployees = await User.countDocuments({ role: 'employee', isActive: true });

  const todayLogs = await AttendanceLog.find({
    date: { $gte: todayStart, $lt: todayEnd },
  });

  const presentToday = todayLogs.length;
  const absentToday = Math.max(0, totalEmployees - presentToday);

  const lateToday = todayLogs.filter((l) => l.status === 'late').length;
  const onLeaveToday = await LeaveRequest.countDocuments({
    status: 'approved',
    startDate: { $lte: todayStart },
    endDate: { $gte: todayStart },
  });

  return {
    totalEmployees,
    presentToday,
    absentToday,
    lateToday,
    onLeaveToday,
  };
}

export async function getAllEmployees() {
  const employees = await User.find({ isActive: true }).select('-passwordHash');
  return employees;
}

export async function getAttendanceReport(filters) {
  const { from, to, userId, department } = filters || {};
  const query = {};

  if (from || to) {
    query.date = {};
    if (from) query.date.$gte = new Date(from);
    if (to) query.date.$lte = new Date(to);
  }

  let userQuery = { role: 'employee', isActive: true };
  if (department) userQuery.department = department;

  const users = await User.find(userQuery).select('_id name email department');
  const userIds = users.map((u) => u._id);

  query.userId = { $in: userIds };
  if (userId) query.userId = userId;

  const logs = await AttendanceLog.find(query)
    .populate('userId', 'name email department')
    .sort({ date: -1 });

  return logs;
}