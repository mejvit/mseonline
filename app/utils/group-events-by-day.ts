import type { CalendarEvent } from '#shared/types/calendar-event';
import type { CalendarEventViewModel } from '~/types/calendar-event-view-model';

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
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}