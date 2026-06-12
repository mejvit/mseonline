import { describe, expect, it } from 'vitest';
import { startOfDay, plusOneWeekMidnight } from '../date-utils';

describe('startOfDay', () => {
  it('returns midnight without modifying the original date', () => {
    const original = new Date(2026, 5, 12, 15, 30, 45);
    const result = startOfDay(original);

    expect(result).toEqual(new Date(2026, 5, 12, 0, 0));
    expect(original).toEqual(new Date(2026, 5, 12, 15, 30, 45));
  });
});

describe('plusOneWeekMidnight', () => {
  it('adds 7 days and sets midnight without modifying the original date', () => {
    const original = new Date(2026, 5, 12, 15, 30, 45);
    const result = plusOneWeekMidnight(original);

    expect(result).toEqual(new Date(2026, 5, 19));
    expect(original).toEqual(new Date(2026, 5, 12, 15, 30, 45));
  });
});