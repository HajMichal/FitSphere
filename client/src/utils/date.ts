const LOCALE = "gb-US";

export function getWeekDates(date: Date): Date[] {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay() + 1); // Start from Monday

  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const current = new Date(start);
    current.setDate(start.getDate() + i);
    dates.push(current);
  }

  return dates;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat(LOCALE, {
    day: "numeric",
  }).format(date);
}

export function formatMonth(date: Date): string {
  return new Intl.DateTimeFormat(LOCALE, {
    month: "long",
  }).format(date);
}

export function formatWeekDay(date: Date): string {
  return new Intl.DateTimeFormat(LOCALE, {
    weekday: "short",
  }).format(date);
}
