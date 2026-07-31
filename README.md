# MšeOnline.cz

MšeOnline.cz provides an overview of Catholic services streamed online. It displays upcoming events from a Google Calendar, with links to the relevant stream or parish website.

## Technology

- Nuxt 4 and Vue 3
- Google Calendar API
- Vitest

## Local setup

Install dependencies:

```bash
npm install
```

The calendar integration needs private local configuration, which is intentionally not included in this repository.

Start the development server:

```bash
npm run dev
```

## Available commands

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run preview   # Preview the production build locally
npm run generate  # Generate a static version of the site
npm test          # Run the test suite
```

## Project structure

- `app/pages/` contains the home page and the About page.
- `server/api/calendar-events.get.ts` retrieves upcoming events from Google Calendar.
- `server/utils/` parses calendar event data and calculates the requested date range.
- `public/` contains the logo, favicons, web-app manifest, and other static files.
