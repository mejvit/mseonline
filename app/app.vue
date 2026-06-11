<template>
  <div>
    <NuxtRouteAnnouncer />

    <main>
      <h1>Mše Online</h1>
      <p v-if="pending">Načítám...</p>
      <p v-else-if="error">{{error}}</p>
      <p v-else-if="events.length === 0">Nenalezeny žádné mše svaté</p>

      <ul v-else>
        <li v-for="event in events" :key="event.id">
          <ul>
            <li>{{ event.title }}</li>
            <li>{{ event.start }} - {{ event.end }}</li>
            <li>{{ event.description }}</li>
          </ul>
        </li>
      </ul>
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import type { CalendarEvent } from '#shared/types/calendar-event';

export default defineComponent({
  async setup() {
    const { data, pending, error } = await useFetch<CalendarEvent[]>('/api/calendar-events')

    const events = computed(() => data.value ?? [])

    return {
      error,
      events,
      pending
    }
  }
})
</script>
