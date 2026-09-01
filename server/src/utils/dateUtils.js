export function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function endOfDay(date) {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

export function parseTimeToToday(timeStr) {
  // timeStr: "09:00"
  const [hh, mm] = timeStr.split(':').map(Number);
  const today = new Date();
  today.setHours(hh, mm, 0, 0);
  return today;
}