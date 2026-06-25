<template>
  <tr class="event-list__row"
    :class="[
      getTemporalClass(),
      {
        'event-list__row--new-time': isNewTime,
      },
    ]"
  >
    <td>
      <time :datetime="event.start">
        {{ formatTime(event.start) }}
      </time>
    </td>
    <td>
      <strong v-if="event.place">{{ event.place }}</strong><span v-if="event.place"> - </span>{{ event.title }}
    </td>
    <td>
      <ul>
        <li v-for="link in event.description.streamLinks" :key="link.url">
          <a :href="link.url">{{ link.name }}</a>
        </li>

        <li v-if="event.description.note">
          {{ event.description.note }}
        </li>
      </ul>
    </td>
  </tr>
</template>

<script lang="ts">
import {
  defineComponent,
  type PropType,
} from 'vue';
import type { CalendarEvent } from '#shared/types/calendar-event';
import { formatTime } from '../utils/date-formatter';
import { getEventTemporalState } from '../utils/event-temporal-state';

export default defineComponent({
  props: {
    event: {
      type: Object as PropType<CalendarEvent>,
      required: true,
    },
    isNewTime: {
      type: Boolean,
      required: true,
    },
    now: {
      type: Date,
      required: true,
    },
  },
  setup(props) {
    function getTemporalClass(): string {
      const state = getEventTemporalState(props.event, props.now);

      return `event-list__row--${state}`;
    }

    return {
      formatTime,
      getTemporalClass,
    };
  }
});
</script>

<style scoped>
  .event-list__row--new-time > td {
    border-top: 3px double currentColor;
  }
</style>
