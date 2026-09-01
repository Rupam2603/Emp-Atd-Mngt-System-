export function success(res, data, message = 'Success') {
  return res.status(200).json({ success: true, message, data });
}

export function created(res, data, message = 'Created') {
  return res.status(201).json({ success: true, message, data });
}

export function error(res, message = 'Error', statusCode = 400) {
  return res.status(statusCode).json({ success: false, message });
}