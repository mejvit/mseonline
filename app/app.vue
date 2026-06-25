<template>
  <div>
    <NuxtRouteAnnouncer />

    <main>
      <h1>Mše Online</h1>
      <p v-if="pending">Načítám...</p>
      <p v-else-if="error">{{ error }}</p>
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

          <EventRow
            v-for="(event, index) in dayEvents"
            :key="event.id"
            :event="event"
            :is-new-time="hasDifferentTime(dayEvents, index)"
            :now="now"
          />
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
import EventRow from './components/EventRow.vue';
import { groupEventsByDay } from './utils/group-events-by-day';
import { formatDate } from './utils/date-formatter';

export default defineComponent({
  components: {
    EventRow,
  },
  async setup() {
    const now = ref(new Date());
    let currentTimeTimer: ReturnType<typeof setInterval> | undefined;

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

    const { data, pending, error } = await useFetch<CalendarEvent[]>('/api/calendar-events');
    const eventsByDay = computed(() => groupEventsByDay(data.value ?? []));

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
      hasDifferentTime,
      now,
      pending,
    };
  },
});
</script>

<style scoped>
  .event-list {
    width: 100%;
    border-collapse: collapse;
    border: 3px solid #131846;
  }

  @media (min-width: 48rem) {
    .event-list {
      width: 90%;
      margin-inline: auto;
    }
  }

  .event-list__day > th {
    color: #fff;
    background: #3d4377;
    font-family: "Trebuchet MS", Helvetica, sans-serif;
    font-weight: 700;
    text-align: left;
    padding: .5em;
  }
</style>
