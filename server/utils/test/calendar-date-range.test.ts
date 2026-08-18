import { describe, expect, it } from 'vitest';
import {
  fourHoursAgoStartOfHour,
  plusOneWeekMidnight,
} from '../calendar-date-range';

describe('plusOneWeekMidnight', () => {
  it('returns Prague midnight in summer and does not change the input', () => {
    const original = new Date('2026-06-12T13:30:45Z');
    const result = plusOneWeekMidnight(original);

    expect(result.toISOString()).toEqual('2026-06-18T22:00:00.000Z');
    expect(original.toISOString()).toEqual('2026-06-12T13:30:45.000Z');
  });

  it('returns Prague midnight in winter', () => {
    const result = plusOneWeekMidnight(new Date('2026-01-12T13:30:45Z'));

    expect(result.toISOString()).toEqual('2026-01-18T23:00:00.000Z');
  });

  it('returns Prague midnight on the spring time change day', () => {
    const result = plusOneWeekMidnight(new Date('2026-03-22T13:30:45Z'));

    expect(result.toISOString()).toEqual('2026-03-28T23:00:00.000Z');
  });

  it('returns Prague midnight on the autumn time change day', () => {
    const result = plusOneWeekMidnight(new Date('2026-10-18T13:30:45Z'));

    expect(result.toISOString()).toEqual('2026-10-24T22:00:00.000Z');
  });

  it('uses the Prague date when UTC is on the previous day', () => {
    const result = plusOneWeekMidnight(new Date('2026-06-12T22:30:45Z'));

    expect(result.toISOString()).toEqual('2026-06-19T22:00:00.000Z');
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
