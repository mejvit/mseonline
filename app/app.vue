<template>
  <div>
    <NuxtRouteAnnouncer />

    <main>
      <h1>Mše Online</h1>
      <p v-if="pending">Načítám...</p>
      <p v-else-if="error">{{error}}</p>
      <p v-else-if="events.length === 0">Nenalezeny žádné události</p>

      <table class="event-list" v-else>
        <tr v-for="event in events" :key="event.id">
          <td>
            <time :datetime="event.start">{{ event.start }}</time>
          </td>
          <td>{{ event.title }}</td>
          <td>
            <ul>
                <li v-for="link in event.description.streamLinks">
                  <a :href="link.url">{{ link.name }}</a>
                </li>
                <li v-if="event.description.note">{{ event.description.note }}</li>
              </ul>
            </td>
        </tr>
      </table>
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
