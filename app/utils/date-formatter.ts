const TIME_FORMATTER = new Intl.DateTimeFormat('cs-CZ', {
  hour: '2-digit',
  minute: '2-digit',
});

const ISO_DATETIME_PATTERN =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})?$/;

export function formatDate(value: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new TypeError(`Invalid date format: ${value}`);
  }

  const date = new Date(`${value}T00:00:00`);
  const [year, month, day] = value.split('-').map(Number);

  if (
    date.getFullYear() !== year
    || date.getMonth() + 1 !== month
    || date.getDate() !== day
  ) {
    throw new RangeError(`Invalid calendar date: ${value}`);
  }

  const weekday = new Intl.DateTimeFormat('cs-CZ', {
    weekday: 'long',
  }).format(date);

  const numericDate = new Intl.DateTimeFormat('cs-CZ', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }).format(date);

  const capitalizedWeekday =
    weekday.charAt(0).toLocaleUpperCase('cs-CZ')
    + weekday.slice(1);

  return `${capitalizedWeekday}, ${numericDate}`;
}

export function formatTime(value: string): string {
  return TIME_FORMATTER.format(parseDateTime(value));
}

function parseDateTime(value: string): Date {
  const match = value.match(
    ISO_DATETIME_PATTERN,
  );

  if (!match) {
    throw new TypeError(`Invalid datetime format: ${value}`);
  }

  const [, yearValue, monthValue, dayValue, hourValue, minuteValue, secondValue = '0'] = match;
  const year = Number(yearValue);
  const month = Number(monthValue);
  const day = Number(dayValue);
  const hour = Number(hourValue);
  const minute = Number(minuteValue);
  const second = Number(secondValue);
  const calendarDate = new Date(Date.UTC(year, month - 1, day));

  if (
    calendarDate.getUTCFullYear() !== year
    || calendarDate.getUTCMonth() + 1 !== month
    || calendarDate.getUTCDate() !== day
    || hour > 23
    || minute > 59
    || second > 59
  ) {
    throw new RangeError(`Invalid calendar datetime: ${value}`);
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new RangeError(`Invalid calendar datetime: ${value}`);
  }

  return date;
}
