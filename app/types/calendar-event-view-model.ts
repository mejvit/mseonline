import type { CalendarEvent } from '#shared/types/calendar-event';
import type { EventState } from './event-state';

export type CalendarEventViewModel = CalendarEvent & {
    ui: {
        eventState: EventState,
        isInitialScrollTarget: boolean;
        isNewTime: boolean;
    }
}
