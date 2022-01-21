import { formatTime } from "../TimeFormatter";

describe('TimeFormatter', () => {
    it('should format zero seconds', () => {
        expect(formatTime(0)).toBe('00:00:00')
    });

    it('should format one minute', () => {
        expect(formatTime(60)).toBe('00:01:00')
    });

    it('should format one minute and thirty seconds', () => {
        expect(formatTime(90)).toBe('00:01:30')
    });

    it('should format thirty minutes and fifty-five seconds', () => {
        expect(formatTime(60 * 30 + 55)).toBe('00:30:55')
    });

    it('should format one hour', () => {
        expect(formatTime(60 * 60)).toBe('01:00:00')
    });
});
