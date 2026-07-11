<template>
  <div>
    <NuxtRouteAnnouncer />

    <Navbar />

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
            v-scroll-into-view="event.ui.isInitialScrollTarget"
            :key="event.id"
            :event="event"
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
import Navbar from './components/Navbar.vue';
import { getEventState } from './utils/event-state-calculator.js';
import { groupEventsByDay } from './utils/group-events-by-day';
import { formatDate } from './utils/date-formatter';
import { EventTemporalState } from './types/event-state.js';

export default defineComponent({
  components: {
    EventRow,
    Navbar,
  },
  directives: {
    scrollIntoView: {
      mounted(element: HTMLElement, binding) {
        if (!binding.value) {
          return;
        }

        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
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

    const eventsByDay = computed(() => {
      const events = data.value ?? [];
      let firstCurrentEventFound = false;

      const uiEvents = (events).map((event, index) => {
        const eventState = getEventState(event, now.value);

        const isInitialScrollTarget = !firstCurrentEventFound && (
          eventState.temporalState === EventTemporalState.Current || eventState.temporalState === EventTemporalState.Future
        )

        if (isInitialScrollTarget) {
          firstCurrentEventFound = true;
        }

        return {
          ...event,
          ui: {
            eventState,
            isInitialScrollTarget,
            isNewTime: hasDifferentTime(events, index)
          }
        }
      });
      return groupEventsByDay(uiEvents)
    });

    function hasDifferentTime(
      events: CalendarEvent[],
      index: number,
    ): boolean {
      if (index === 0) {
        return false;
      }

      const thisStart = new Date(events[index]!.start).setSeconds(0, 0);
      const prevStart = new Date(events[index - 1]!.start).setSeconds(0, 0);

      return thisStart !== prevStart;
    }

    return {
      error,
      eventsByDay,
      formatDate,
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
