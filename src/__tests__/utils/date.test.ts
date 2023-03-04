import { format } from '../../utils/date';

describe('format function', () => {
  test('formats a date using a format string', () => {
    const date = new Date('2023-03-04T12:34:56Z');
    const formatString = 'YYYY-MM-DD hh:mm:ss';
    const expected = '2023-03-04 12:34:56';

    const result = format(date, formatString);

    expect(result).toBe(expected);
  });

  test('pads single-digit day and month values with a leading zero', () => {
    const date = new Date('2023-03-04T12:34:56Z');
    const formatString = 'DD/MM/YYYY';
    const expected = '04/03/2023';

    const result = format(date, formatString);

    expect(result).toBe(expected);
  });

  test('handles midnight correctly', () => {
    const date = new Date('2023-03-04T00:00:00Z');
    const formatString = 'hh:mm:ss';
    const expected = '00:00:00';

    const result = format(date, formatString);

    expect(result).toBe(expected);
  });
});
