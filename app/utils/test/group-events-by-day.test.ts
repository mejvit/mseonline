import { describe, expect, it } from 'vitest';
import { groupEventsByDay } from '../group-events-by-day';
import type { CalendarEvent } from '#shared/types/calendar-event';


describe('groupEventsByDay', () => {
  it('keeps events together within the same day', () => {

    const event1: CalendarEvent = {
      id: '1',
      place: 'Test 1',
      title: 'Test',
      start: '2026-05-12T08:00:00',
      end: '2026-05-12T09:00:00',
      description: {
        streamLinks: []
      }
    };

    const event2: CalendarEvent = {
      id: '2',
      place: 'Test 2',
      title: 'Test',
      start: '2026-05-12T08:00:00',
      end: '2026-05-12T09:00:00',
      description: {
        streamLinks: []
      }
    };

    const event3: CalendarEvent = {
      id: '3',
      place: 'Test 3',
      title: 'Test',
      start: '2026-05-12T08:00:00',
      end: '2026-05-12T09:00:00',
      description: {
        streamLinks: []
      }
    };

    const events: CalendarEvent[] = [event1, event2, event3];
    const actualResult = groupEventsByDay(events);

    expect(actualResult.size).toBe(1);

    const firstDayEvents = Array.from(actualResult.values())[0];
    expect(firstDayEvents).toEqual([event1, event2, event3]);

    const days = Array.from(actualResult.keys());
    expect(days).toEqual(['2026-05-12']);
  });

  it('splits events when the start date is in different day', () => {

    const event1: CalendarEvent = {
      id: '1',
      place: 'Test 1',
      title: 'Test',
      start: '2026-05-12T08:00:00',
      end: '2026-05-12T09:00:00',
      description: {
        streamLinks: []
      }
    };

    const event2: CalendarEvent = {
      id: '2',
      place: 'Test 2',
      title: 'Test',
      start: '2026-05-13T08:00:00',
      end: '2026-05-13T09:00:00',
      description: {
        streamLinks: []
      }
    };

    const event3: CalendarEvent = {
      id: '3',
      place: 'Test 3',
      title: 'Test',
      start: '2026-05-14T08:00:00',
      end: '2026-05-14T09:00:00',
      description: {
        streamLinks: []
      }
    };

    const event4: CalendarEvent = {
      id: '4',
      place: 'Test 4',
      title: 'Test',
      start: '2026-05-14T18:00:00',
      end: '2026-05-14T19:00:00',
      description: {
        streamLinks: []
      }
    };

    const events: CalendarEvent[] = [event1, event2, event3, event4];
    
    const actualResult = groupEventsByDay(events);
    expect(actualResult.size).toBe(3);
      
    const days = Array.from(actualResult.keys());
    expect(days).toEqual(['2026-05-12', '2026-05-13', '2026-05-14']);
  
    const eventGroups = Array.from(actualResult.values())
    expect(eventGroups).toEqual([
      [event1], [event2], [event3, event4]
    ]);
  });
});