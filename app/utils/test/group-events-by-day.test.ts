import { describe, expect, it } from 'vitest';
import { groupEventsByDay } from '../group-events-by-day';
import type { CalendarEventViewModel } from '../../types/calendar-event-view-model';
import { EventTemporalState } from '../../types/event-state';

const TEST_EVENT_UI: CalendarEventViewModel['ui'] = {
  eventState: {
    temporalState: EventTemporalState.Future
  },
  isInitialScrollTarget: false,
  isNewTime: false
};

describe('groupEventsByDay', () => {
  it('keeps events together within the same day', () => {

    const event1: CalendarEventViewModel = {
      id: '1',
      place: 'Test 1',
      title: 'Test',
      start: '2026-05-12T08:00:00+02:00',
      end: '2026-05-12T09:00:00+02:00',
      ui: TEST_EVENT_UI,
      description: {
        streamLinks: []
      }
    };

    const event2: CalendarEventViewModel = {
      id: '2',
      place: 'Test 2',
      title: 'Test',
      start: '2026-05-12T08:00:00+02:00',
      end: '2026-05-12T09:00:00+02:00',
      ui: TEST_EVENT_UI,
      description: {
        streamLinks: []
      }
    };

    const event3: CalendarEventViewModel = {
      id: '3',
      place: 'Test 3',
      title: 'Test',
      start: '2026-05-12T08:00:00+02:00',
      end: '2026-05-12T09:00:00+02:00',
      ui: TEST_EVENT_UI,
      description: {
        streamLinks: []
      }
    };

    const events: CalendarEventViewModel[] = [event1, event2, event3];
    const actualResult = groupEventsByDay(events);

    expect(actualResult.size).toBe(1);

    const firstDayEvents = Array.from(actualResult.values())[0];
    expect(firstDayEvents).toEqual([event1, event2, event3]);

    const days = Array.from(actualResult.keys());
    expect(days).toEqual(['2026-05-12']);
  });

  it('splits events when the start date is in different day', () => {

    const event1: CalendarEventViewModel = {
      id: '1',
      place: 'Test 1',
      title: 'Test',
      start: '2026-05-12T08:00:00+02:00',
      end: '2026-05-12T09:00:00+02:00',
      ui: TEST_EVENT_UI,
      description: {
        streamLinks: []
      }
    };

    const event2: CalendarEventViewModel = {
      id: '2',
      place: 'Test 2',
      title: 'Test',
      start: '2026-05-13T08:00:00+02:00',
      end: '2026-05-13T09:00:00+02:00',
      ui: TEST_EVENT_UI,
      description: {
        streamLinks: []
      }
    };

    const event3: CalendarEventViewModel = {
      id: '3',
      place: 'Test 3',
      title: 'Test',
      start: '2026-05-14T08:00:00+02:00',
      end: '2026-05-14T09:00:00+02:00',
      ui: TEST_EVENT_UI,
      description: {
        streamLinks: []
      }
    };

    const event4: CalendarEventViewModel = {
      id: '4',
      place: 'Test 4',
      title: 'Test',
      start: '2026-05-14T18:00:00+02:00',
      end: '2026-05-14T19:00:00+02:00',
      ui: TEST_EVENT_UI,
      description: {
        streamLinks: []
      }
    };

    const events: CalendarEventViewModel[] = [event1, event2, event3, event4];
    
    const actualResult = groupEventsByDay(events);
    expect(actualResult.size).toBe(3);
      
    const days = Array.from(actualResult.keys());
    expect(days).toEqual(['2026-05-12', '2026-05-13', '2026-05-14']);
  
    const eventGroups = Array.from(actualResult.values())
    expect(eventGroups).toEqual([
      [event1], [event2], [event3, event4]
    ]);
  });

  it('groups events by the Prague date around midnight', () => {
    const beforeMidnight: CalendarEventViewModel = {
      id: '1',
      place: 'Test 1',
      title: 'Test',
      start: '2026-05-12T21:30:00Z',
      end: '2026-05-12T22:00:00Z',
      ui: TEST_EVENT_UI,
      description: {
        streamLinks: []
      }
    };

    const afterMidnight: CalendarEventViewModel = {
      id: '2',
      place: 'Test 2',
      title: 'Test',
      start: '2026-05-12T22:30:00Z',
      end: '2026-05-12T23:00:00Z',
      ui: TEST_EVENT_UI,
      description: {
        streamLinks: []
      }
    };

    const actualResult = groupEventsByDay([beforeMidnight, afterMidnight]);

    expect(Array.from(actualResult.keys())).toEqual(['2026-05-12', '2026-05-13']);
  });
});
