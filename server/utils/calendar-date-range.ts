import { CALENDAR_TIME_ZONE } from '#shared/calendar-time-zone';

const CALENDAR_DATE_TIME_FORMATTER = new Intl.DateTimeFormat('cs-CZ', {
  day: '2-digit',
  hour: '2-digit',
  hourCycle: 'h23',
  minute: '2-digit',
  month: '2-digit',
  second: '2-digit',
  timeZone: CALENDAR_TIME_ZONE,
  year: 'numeric',
});

type CalendarDateTimePartType =
  | 'day'
  | 'hour'
  | 'minute'
  | 'month'
  | 'second'
  | 'year';

export function plusOneWeekMidnight(date: Date): Date {
  const { year, month, day } = getCalendarDateTimeParts(date);
  const targetDate = new Date(Date.UTC(year, month - 1, day + 7));

  return getCalendarMidnight(
    targetDate.getUTCFullYear(),
    targetDate.getUTCMonth() + 1,
    targetDate.getUTCDate(),
  );
}

export function fourHoursAgoStartOfHour(date: Date): Date {
  const startTime = new Date(date);
  startTime.setHours(startTime.getHours() - 4, 0, 0, 0);
  return startTime;
}

function getCalendarMidnight(year: number, month: number, day: number): Date {
  const expectedCalendarTime = Date.UTC(year, month - 1, day);
  let instant = expectedCalendarTime;

  // Start at UTC midnight and adjust it to Prague midnight.
  // Repeat because Prague can change between winter and summer time.
  for (let attempt = 0; attempt < 3; attempt++) {
    const actual = getCalendarDateTimeParts(new Date(instant));
    const actualCalendarTime = Date.UTC(
      actual.year,
      actual.month - 1,
      actual.day,
      actual.hour,
      actual.minute,
      actual.second,
    );
    const correction = expectedCalendarTime - actualCalendarTime;

    if (correction === 0) {
      return new Date(instant);
    }

    instant += correction;
  }

  throw new RangeError(`Cannot resolve midnight in ${CALENDAR_TIME_ZONE}.`);
}

function getCalendarDateTimeParts(date: Date) {
  const parts = CALENDAR_DATE_TIME_FORMATTER.formatToParts(date);

  return {
    year: getNumericPart(parts, 'year'),
    month: getNumericPart(parts, 'month'),
    day: getNumericPart(parts, 'day'),
    hour: getNumericPart(parts, 'hour'),
    minute: getNumericPart(parts, 'minute'),
    second: getNumericPart(parts, 'second'),
  };
}

function getNumericPart(
  parts: Intl.DateTimeFormatPart[],
  type: CalendarDateTimePartType,
): number {
  const part = parts.find(candidate => candidate.type === type);

  if (part === undefined) {
    throw new RangeError(`Cannot determine ${type} in ${CALENDAR_TIME_ZONE}.`);
  }

  return Number(part.value);
}
