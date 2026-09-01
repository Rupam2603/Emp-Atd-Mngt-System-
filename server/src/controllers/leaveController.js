import {
  createLeaveRequest,
  getLeaveRequests,
  approveLeaveRequest,
  rejectLeaveRequest,
  getLeaveBalanceSummary,
} from '../services/leaveService.js';
import { success, created, error } from '../utils/response.js';

export async function applyLeave(req, res, next) {
  try {
    const userId = req.user.id;
    const payload = { ...req.body, userId };
    const request = await createLeaveRequest(payload);
    return created(res, request, 'Leave request submitted');
  } catch (err) {
    next(err);
  }
}

export async function getMyRequests(req, res, next) {
  try {
    const userId = req.user.id;
    const requests = await getLeaveRequests({ userId });
    return success(res, requests, 'Leave requests fetched');
  } catch (err) {
    next(err);
  }
}

export async function getAllRequests(req, res, next) {
  try {
    const { status } = req.query;
    const requests = await getLeaveRequests({ status });
    return success(res, requests, 'Leave requests fetched');
  } catch (err) {
    next(err);
  }
}

export async function approveRequest(req, res, next) {
  try {
    const { id } = req.params;
    const { hrRemarks } = req.body;
    const request = await approveLeaveRequest(id, hrRemarks);
    return success(res, request, 'Leave request approved');
  } catch (err) {
    next(err);
  }
}

export async function rejectRequest(req, res, next) {
  try {
    const { id } = req.params;
    const { hrRemarks } = req.body;
    const request = await rejectLeaveRequest(id, hrRemarks);
    return success(res, request, 'Leave request rejected');
  } catch (err) {
    next(err);
  }
}

export async function getBalance(req, res, next) {
  try {
    const userId = req.user.id;
    const summary = await getLeaveBalanceSummary(userId);
    return success(res, summary, 'Leave balance fetched');
  } catch (err) {
    next(err);
  }
}