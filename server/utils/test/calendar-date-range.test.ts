import { describe, expect, it } from 'vitest';
import {
  fourHoursAgoStartOfHour,
  plusOneWeekMidnight,
} from '../calendar-date-range';

describe('plusOneWeekMidnight', () => {
  it('adds 7 days and sets midnight without modifying the original date', () => {
    const original = new Date(2026, 5, 12, 15, 30, 45);
    const result = plusOneWeekMidnight(original);

    expect(result).toEqual(new Date(2026, 5, 19));
    expect(original).toEqual(new Date(2026, 5, 12, 15, 30, 45));
  });
});

describe('fourHoursAgoStartOfHour', () => {
  it('returns 7:00 when current time is 11:59', () => {
    const original = new Date(2026, 5, 12, 11, 59, 45);
    const result = fourHoursAgoStartOfHour(original);

    expect(result).toEqual(new Date(2026, 5, 12, 7, 0));
    expect(original).toEqual(new Date(2026, 5, 12, 11, 59, 45));
  });

  it('returns 22:00 previous day when current time is 2:00', () => {
    const original = new Date(2026, 5, 12, 2, 0, 45);
    const result = fourHoursAgoStartOfHour(original);

    expect(result).toEqual(new Date(2026, 5, 11, 22, 0));
    expect(original).toEqual(new Date(2026, 5, 12, 2, 0, 45));
  });
});
