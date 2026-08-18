import { describe, expect, it } from 'vitest';
import { formatDate, formatTime } from '../date-formatter';
describe('dateFormatter', () => {
    it('formats date', () => {
        const date = '2026-06-15';
        const formattedDate = formatDate(date);

        expect(formattedDate).toEqual('Pondělí, 15. 6. 2026');
    });

    it('rejects an invalid date format', () => {
        expect(() => formatDate('2026-6-15')).toThrow(TypeError);
    });

    it('rejects an impossible calendar date', () => {
        expect(() => formatDate('2026-02-30')).toThrow(RangeError);
    });

    it('formats time', () => {
       const time = '2026-06-15T08:30:12+02:00';
       const formattedTime = formatTime(time);

       expect(formattedTime).toEqual('08:30');
    });

    it('formats summer and winter times in the Prague time zone', () => {
        expect(formatTime('2026-06-15T06:30:12Z')).toEqual('08:30');
        expect(formatTime('2026-01-15T08:30:12Z')).toEqual('09:30');
    });

    it('rejects an invalid datetime format', () => {
        expect(() => formatTime('2026-06-15 08:30:12')).toThrow(TypeError);
    });

    it('rejects an impossible calendar datetime', () => {
        expect(() => formatTime('2026-06-15T25:30:12')).toThrow(RangeError);
    });
});
