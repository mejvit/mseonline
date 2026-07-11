import type { CalendarEvent } from '#shared/types/calendar-event';
import { EventTemporalState, type EventState } from '../types/event-state'

export function getEventState(event: CalendarEvent, now: Date): EventState {
  const temporalState = getEventTemporalState(event, now);
  return {
    temporalState,
    percentage: temporalState === EventTemporalState.Current ? getEventProgressPercentage(event, now) : undefined
  };
}

function getEventTemporalState(
  event: CalendarEvent,
  now: Date,
): EventTemporalState {
  const startTime = new Date(event.start).getTime();
  const endTime = new Date(event.end ?? event.start).getTime();
  const currentTime = now.getTime();

  if (
    Number.isNaN(startTime)
    || Number.isNaN(endTime)
    || Number.isNaN(currentTime)
  ) {
    throw new RangeError('Cannot determine temporal state from an invalid date.');
  }

  if (endTime < currentTime) {
    return EventTemporalState.Past;
  }

  if (startTime <= currentTime) {
    return EventTemporalState.Current;
  }

  return EventTemporalState.Future;
}

function getEventProgressPercentage(
  event: CalendarEvent,
  now: Date,
): number {
  const startTime = new Date(event.start).getTime();
  const endTime = new Date(event.end ?? event.start).getTime();
  const currentTime = now.getTime();

  if (
    Number.isNaN(startTime)
    || Number.isNaN(endTime)
    || Number.isNaN(currentTime)
  ) {
    throw new RangeError('Cannot determine event progress from an invalid date.');
  }

  if (endTime <= startTime) {
    return currentTime >= startTime ? 100 : 0;
  }

  const progress = ((currentTime - startTime) / (endTime - startTime)) * 100;

  return Math.round(Math.min(100, Math.max(0, progress)));
}
