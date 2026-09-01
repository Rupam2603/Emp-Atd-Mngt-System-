import { getHrDashboardStats, getAllEmployees, getAttendanceReport } from '../services/hrService.js';
import { success } from '../utils/response.js';

export async function getDashboard(req, res, next) {
  try {
    const stats = await getHrDashboardStats();
    return success(res, stats, 'HR dashboard stats fetched');
  } catch (err) {
    next(err);
  }
}

export async function getEmployees(req, res, next) {
  try {
    const employees = await getAllEmployees();
    return success(res, employees, 'Employees fetched');
  } catch (err) {
    next(err);
  }
}

export async function getReport(req, res, next) {
  try {
    const { from, to, userId, department } = req.query;
    const logs = await getAttendanceReport({ from, to, userId, department });
    return success(res, logs, 'Attendance report fetched');
  } catch (err) {
    next(err);
  }
}