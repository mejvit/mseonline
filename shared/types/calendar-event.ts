import type { StreamDescription } from "./stream-description";

export type CalendarEvent = {
    id: string;
    title: string;
    start: string;
    end: string | null;
    description: StreamDescription;
};
