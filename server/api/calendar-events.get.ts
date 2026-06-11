import { google } from 'googleapis'
import { CalendarEvent } from '#shared/types/calendar-event'

const CALENDAR_READONLY_SCOPE = 'https://www.googleapis.com/auth/calendar.readonly'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  if (
    !config.googleCalendarId ||
    !config.googleServiceAccountEmail ||
    !config.googleServiceAccountPrivateKey
  ) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Google Calendar configuration is missing.'
    })
  }

  const auth = new google.auth.JWT({
    email: config.googleServiceAccountEmail,
    key: config.googleServiceAccountPrivateKey.replace(/\\n/g, '\n'),
    scopes: [CALENDAR_READONLY_SCOPE]
  })

  const calendar = google.calendar({ version: 'v3', auth })
  const response = await calendar.events.list({
    calendarId: config.googleCalendarId,
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  })

  const events: CalendarEvent[] = (response.data.items ?? []).map((event, index) => {
    return {
      id: event.id ?? `${event.start?.dateTime}-${index}`,
      title: event.summary ?? '',
      start: event.start?.dateTime!,
      end: event.end?.dateTime ?? event.end?.date ?? null,
      description: event.description ?? ''
    }
  })

  return events
})
