import { log, warn, error } from '../../utils/log';

describe('logger functions', () => {
  const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
  const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

  beforeEach(() => {
    consoleLogSpy.mockClear();
    consoleWarnSpy.mockClear();
    consoleErrorSpy.mockClear();
  });

  test('log function should call console.log with correct arguments', () => {
    log('This is a log message.');
    expect(consoleLogSpy).toHaveBeenCalledWith('[Zenithic]', 'This is a log message.');
  });

  test('warn function should call console.warn with correct arguments', () => {
    warn('This is a warning message.');
    expect(consoleWarnSpy).toHaveBeenCalledWith('[Zenithic] This is a warning message.');
  });

  test('error function should call console.error with correct arguments', () => {
    error('This is an error message.');
    expect(consoleErrorSpy).toHaveBeenCalledWith('[Zenithic] This is an error message.');
  });
});
