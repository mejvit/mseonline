import { google } from 'googleapis';
import { CalendarEvent } from '#shared/types/calendar-event';
import { plusOneWeekMidnight, startOfDay } from '#server/utils/calendar-date-range';
import { parseDescription } from '../utils/event-description-parser';
import { parseTitle } from '../utils/event-title-parser';

const CALENDAR_READONLY_SCOPE = 'https://www.googleapis.com/auth/calendar.readonly';

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  if (
    !config.googleCalendarId ||
    !config.googleServiceAccountEmail ||
    !config.googleServiceAccountPrivateKey
  ) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Google Calendar configuration is missing.'
    });
  }

  const currentTime = new Date();

  const auth = new google.auth.JWT({
    email: config.googleServiceAccountEmail,
    key: config.googleServiceAccountPrivateKey.replace(/\\n/g, '\n'),
    scopes: [CALENDAR_READONLY_SCOPE]
  });

  const calendar = google.calendar({ version: 'v3', auth })
  const response = await calendar.events.list({
    calendarId: config.googleCalendarId,
    timeMin: startOfDay(currentTime).toISOString(),
    timeMax: plusOneWeekMidnight(currentTime).toISOString(),
    singleEvents: true,
    orderBy: 'startTime'
  });

  const events: CalendarEvent[] = (response.data.items ?? []).map((event, index) => {
    const title = parseTitle(event.summary ?? '');

    return {
      id: event.id ?? `${event.start?.dateTime}-${index}`,
      place: title.place ?? '', 
      title: title.title,
      start: event.start?.dateTime!,
      end: event.end?.dateTime ?? event.end?.date ?? null,
      description: parseDescription(event.description ?? '')
    };
  });

  return events;
})
