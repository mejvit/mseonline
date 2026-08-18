import type { CalendarEvent } from '#shared/types/calendar-event';
import type { CalendarEventViewModel } from '~/types/calendar-event-view-model';
import { CALENDAR_TIME_ZONE } from './calendar-time-zone';

const DATE_KEY_FORMATTER = new Intl.DateTimeFormat('en-CA', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: CALENDAR_TIME_ZONE,
});

export function groupEventsByDay(events: CalendarEventViewModel[]): Map<string, CalendarEventViewModel[]> {
  const groups = new Map<string, CalendarEventViewModel[]>();

  for (const event of events) {
    const dateKey = getDateKey(event.start);

    if (!groups.has(dateKey)) {
      groups.set(dateKey, []);
    }

    groups.get(dateKey)!.push(event);
  }

  return groups;
}

function getDateKey(value: string): string {
  if (!value.includes('T')) {
    return value;
  }

  const date = new Date(value);
  const parts = DATE_KEY_FORMATTER.formatToParts(date);
  const year = parts.find(part => part.type === 'year')!.value;
  const month = parts.find(part => part.type === 'month')!.value;
  const day = parts.find(part => part.type === 'day')!.value;

  return `${year}-${month}-${day}`;
}
