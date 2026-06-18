<template>
  <div>
    <NuxtRouteAnnouncer />

    <main>
      <h1>Mše Online</h1>
      <p v-if="pending">Načítám...</p>
      <p v-else-if="error">{{error}}</p>
      <p v-else-if="eventsByDay.size === 0">Nenalezeny žádné události</p>

      <table v-else class="event-list">
  <tbody
    v-for="[dateKey, dayEvents] in eventsByDay"
    :key="dateKey"
  >
    <tr class="event-list__day">
      <th colspan="3">
        {{ formatDate(dateKey) }}
      </th>
    </tr>

    <tr
      v-for="(event, index) in dayEvents"
      :key="event.id"
      class="event-list__row"
      :class="[
        getTemporalClass(event),
        {
          'event-list__row--new-time': hasDifferentTime(dayEvents, index),
        },
      ]"
    >
      <td>
        <time :datetime="event.start">
          {{ formatTime(event.start) }}
        </time>
      </td>

      <td>{{ event.title }}</td>

      <td>
        <ul>
          <li
            v-for="link in event.description.streamLinks"
            :key="link.url"
          >
            <a :href="link.url">{{ link.name }}</a>
          </li>

          <li v-if="event.description.note">
            {{ event.description.note }}
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
    </main>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
} from 'vue';
import type { CalendarEvent } from '#shared/types/calendar-event';
import { groupEventsByDay } from './utils/group-events-by-day';
import { formatDate, formatTime } from './utils/date-formatter';
import { getEventTemporalState } from './utils/event-temporal-state';

export default defineComponent({
  async setup() {
    const { data, pending, error } = await useFetch<CalendarEvent[]>('/api/calendar-events');
    const now = ref(new Date());
    let currentTimeTimer: ReturnType<typeof setInterval> | undefined;

    const eventsByDay = computed(() => groupEventsByDay(data.value ?? []));

    onMounted(() => {
      currentTimeTimer = setInterval(() => {
        now.value = new Date();
      }, 60_000);
    });

    onUnmounted(() => {
      if (currentTimeTimer !== undefined) {
        clearInterval(currentTimeTimer);
      }
    });

    function getTemporalClass(event: CalendarEvent): string {
      const state = getEventTemporalState(event, now.value);

      return `event-list__row--${state}`;
    }

    function hasDifferentTime(
      events: CalendarEvent[],
      index: number,
    ): boolean {
      if (index === 0) {
        return false;
      }

      return getTime(events[index]!.start)
        !== getTime(events[index - 1]!.start);
    }

    function getTime(value: string): string {
      const date = new Date(value);

      return `${date.getHours()}:${date.getMinutes()}`;
    }

    return {
      error,
      eventsByDay,
      formatDate,
      formatTime,
      getTemporalClass,
      hasDifferentTime,
      pending,
    };
  },
});
</script>

<style scoped>
  .event-list {
    width: 100%;
    border-collapse: collapse;
  }

  .event-list__row--new-time > td {
    border-top: 3px double currentColor;
  }
</style>
