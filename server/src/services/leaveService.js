import { LeaveRequest } from '../models/LeaveRequest.js';
import { CompanySetting } from '../models/CompanySetting.js';

export async function createLeaveRequest(payload) {
  return LeaveRequest.create(payload);
}

export async function getLeaveRequests(filter = {}) {
  return LeaveRequest.find(filter)
    .populate('userId', 'name email employeeId department')
    .sort({ createdAt: -1 });
}

export async function approveLeaveRequest(id, hrRemarks) {
  return LeaveRequest.findByIdAndUpdate(
    id,
    { status: 'approved', hrRemarks },
    { new: true }
  );
}

export async function rejectLeaveRequest(id, hrRemarks) {
  return LeaveRequest.findByIdAndUpdate(
    id,
    { status: 'rejected', hrRemarks },
    { new: true }
  );
}

export async function getLeaveBalanceSummary(userId) {
  const setting = await CompanySetting.findOne();
  const policy = setting?.leavePolicy || { casualPerYear: 12, sickPerYear: 10, paidPerYear: 15 };
  
  const currentYear = new Date().getFullYear();
  const startOfYear = new Date(currentYear, 0, 1);
  const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999);

  const approvedLeaves = await LeaveRequest.find({
    userId,
    status: 'approved',
    startDate: { $gte: startOfYear, $lte: endOfYear }
  });

  const used = { casual: 0, sick: 0, paid: 0, unpaid: 0 };
  approvedLeaves.forEach(req => {
    if (used[req.type] !== undefined) {
      used[req.type] += req.totalDays;
    }
  });

  return {
    entitlement: policy,
    used,
    balance: {
      casual: policy.casualPerYear - used.casual,
      sick: policy.sickPerYear - used.sick,
      paid: policy.paidPerYear - used.paid
    }
  };
}
