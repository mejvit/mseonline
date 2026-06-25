<template>
  <tr
    class="event-list__row"
    :class="[
      getTemporalClass(),
      {
        'event-list__row--new-time': isNewTime,
      },
    ]"
    :style="rowStyle"
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
  computed,
  defineComponent,
  type PropType,
} from 'vue';
import type { CalendarEvent } from '#shared/types/calendar-event';
import { formatTime } from '../utils/date-formatter';
import {
  EventTemporalState,
  getEventProgressPercentage,
  getEventTemporalState,
} from '../utils/event-temporal-state';

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
    const temporalState = computed(() => getEventTemporalState(props.event, props.now));
    const rowStyle = computed(() => {
      if (temporalState.value !== EventTemporalState.Current) {
        return {};
      }

      return {
        '--event-progress': `${getEventProgressPercentage(props.event, props.now)}%`,
      };
    });

    function getTemporalClass(): string {
      return `event-list__row--${temporalState.value}`;
    }

    return {
      formatTime,
      getTemporalClass,
      rowStyle,
    };
  }
});
</script>

<style scoped>
  .event-list__row {
    font-family: Cambria, Georgia, serif;
  }

  .event-list__row > td {
    border-top: 1px solid #000;
    padding: 1em;
  }

  .event-list__row:hover {
    background: #f2f2f2;
  }

  .event-list__row > td:first-child {
    position: relative;
    padding-left: 2.75em;
    text-align: center;
  }

  .event-list__row > td:first-child time {
    font-family: "Trebuchet MS", Helvetica, sans-serif;
    font-size: 0.9em;
    font-weight: 700;
  }

  .event-list__row > td + td {
    border-left: 1px dashed #000;
  }

  .event-list__row > td:nth-child(3) a {
    color: inherit;
    font-weight: 700;
    text-decoration: underline;
  }

  .event-list__row > td:nth-child(3) a:hover {
    text-decoration: none;
  }

  .event-list__row > td:nth-child(3) a:active {
    color: red;
  }

  .event-list__row > td:first-child::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1rem;
    border-right: 1px solid #000;
    background: var(--event-strip-color);
  }

  .event-list__row--past {
    --event-strip-color: #999;
    color: #999;
  }

  .event-list__row--past:nth-child(even) {
    background: #eaeaea;
  }

  .event-list__row--past:nth-child(odd) {
    background: #fff;
  }

  .event-list__row--current {
    --event-strip-color: #13ff02;
  }

  .event-list__row--current:nth-child(odd) {
    background: #fbe9b9;
  }

  .event-list__row--current > td:first-child::before {
    background: linear-gradient(
      to top,
      var(--event-strip-color) 0 var(--event-progress),
      transparent var(--event-progress) 100%
    );
  }

  .event-list__row--future {
    --event-strip-color: #f9ef2f;
  }

  .event-list__row--future:nth-child(odd) {
    background: #fbe9b9;
  }

  .event-list__row--new-time > td {
    border-top: 3px double #000;
  }
</style>
