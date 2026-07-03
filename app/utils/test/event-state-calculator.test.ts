import { describe, expect, it } from 'vitest';
import type { CalendarEvent } from '#shared/types/calendar-event';
import { getEventState } from '../event-state-calculator';
import { EventTemporalState } from '../../types/event-state'

function createEvent(start: string, end: string | null): CalendarEvent {
  return {
    id: '1',
    place: 'Test',
    title: 'Test event',
    start,
    end,
    description: {
      streamLinks: []
    }
  };
}

describe('getEventState', () => {
  it('marks ongoing event as current and returns the percentage of elapsed event duration', () => {
    const now = new Date('2026-06-18T10:00:00');
    const event = createEvent(
      '2026-06-18T09:00:00',
      '2026-06-18T11:00:00',
    );
    const eventState = getEventState(event, now);
    expect(eventState.temporalState).toBe(EventTemporalState.Current);
    expect(eventState.percentage).toBe(50);
  });

  it('rounds one third of elapsed event duration', () => {
    const now = new Date('2026-06-18T09:20:00');
    const event = createEvent(
      '2026-06-18T09:00:00',
      '2026-06-18T10:00:00',
    );

    const eventState = getEventState(event, now);
    expect(eventState.temporalState).toBe(EventTemporalState.Current);
    expect(eventState.percentage).toBe(33);
  });

  it('rounds two thirds of elapsed event duration', () => {
    const now = new Date('2026-06-18T09:40:00');
    const event = createEvent(
      '2026-06-18T09:00:00',
      '2026-06-18T10:00:00',
    );

    const eventState = getEventState(event, now);
    expect(eventState.temporalState).toBe(EventTemporalState.Current);
    expect(eventState.percentage).toBe(67);
  });

  it ('marks event that has not started as future and does not set progress', () => {
    const now = new Date('2026-06-18T10:00:00');
    const event = createEvent(
      '2026-06-18T11:00:00',
      '2026-06-18T12:00:00',
    );
    const eventState = getEventState(event, now);
    expect(eventState.temporalState).toBe(EventTemporalState.Future);
    expect(eventState.percentage).toBeUndefined();
  });

  it ('marks ended event as past and does not set progress', () => {
    const now = new Date('2026-06-18T10:00:00');
    const event = createEvent(
      '2026-06-18T08:00:00',
      '2026-06-18T09:00:00',
    );
    const eventState = getEventState(event, now);
    expect(eventState.temporalState).toBe(EventTemporalState.Past);
    expect(eventState.percentage).toBeUndefined();
  })
});
