export function getFutureDate(daysToAdd: number): Date {
  const today = new Date();
  today.setDate(today.getDate() + daysToAdd);
  return today;
}

export function getFutureTime(min: number): Date {
  const now = new Date();
  now.setMinutes(now.getMinutes() + min);
  return now;
}

export function getMinutesFromNow(date: Date): number {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  return Math.round(diffMs / 60000);
}
