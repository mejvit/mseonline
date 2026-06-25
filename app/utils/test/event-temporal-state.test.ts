import { describe, expect, it } from 'vitest';
import type { CalendarEvent } from '#shared/types/calendar-event';
import {
  EventTemporalState,
  getEventProgressPercentage,
  getEventTemporalState,
} from '../event-temporal-state';

function createEvent(start: string, end: string | null): CalendarEvent {
  return {
    id: '1',
    place: 'Test',
    title: 'Test event',
    start,
    end,
    description: {
      streamLinks: [],
    },
  };
}

describe('getEventTemporalState', () => {
  const now = new Date('2026-06-18T10:00:00');

  it('marks an ended event as past', () => {
    const event = createEvent(
      '2026-06-18T08:00:00',
      '2026-06-18T09:00:00',
    );

    expect(getEventTemporalState(event, now)).toBe(EventTemporalState.Past);
  });

  it('marks an event in progress as current', () => {
    const event = createEvent(
      '2026-06-18T09:00:00',
      '2026-06-18T11:00:00',
    );

    expect(getEventTemporalState(event, now)).toBe(EventTemporalState.Current);
  });

  it('keeps an event current at its exact end time', () => {
    const event = createEvent(
      '2026-06-18T09:00:00',
      '2026-06-18T10:00:00',
    );

    expect(getEventTemporalState(event, now)).toBe(EventTemporalState.Current);
  });

  it('marks an event that has not started as future', () => {
    const event = createEvent(
      '2026-06-18T11:00:00',
      '2026-06-18T12:00:00',
    );

    expect(getEventTemporalState(event, now)).toBe(EventTemporalState.Future);
  });
});

describe('getEventProgressPercentage', () => {
  it('returns the percentage of elapsed event duration', () => {
    const event = createEvent(
      '2026-06-18T09:00:00',
      '2026-06-18T11:00:00',
    );
    const now = new Date('2026-06-18T10:00:00');

    expect(getEventProgressPercentage(event, now)).toBe(50);
  });

  it('rounds one third of elapsed event duration', () => {
    const event = createEvent(
      '2026-06-18T09:00:00',
      '2026-06-18T10:00:00',
    );
    const now = new Date('2026-06-18T09:20:00');

    expect(getEventProgressPercentage(event, now)).toBe(33);
  });

  it('rounds two thirds of elapsed event duration', () => {
    const event = createEvent(
      '2026-06-18T09:00:00',
      '2026-06-18T10:00:00',
    );
    const now = new Date('2026-06-18T09:40:00');

    expect(getEventProgressPercentage(event, now)).toBe(67);
  });

  it('clamps progress before event start', () => {
    const event = createEvent(
      '2026-06-18T09:00:00',
      '2026-06-18T11:00:00',
    );
    const now = new Date('2026-06-18T08:00:00');

    expect(getEventProgressPercentage(event, now)).toBe(0);
  });

  it('clamps progress after event end', () => {
    const event = createEvent(
      '2026-06-18T09:00:00',
      '2026-06-18T11:00:00',
    );
    const now = new Date('2026-06-18T12:00:00');

    expect(getEventProgressPercentage(event, now)).toBe(100);
  });
});
