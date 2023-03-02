/**
 * Logs a message to the console.
 */
export const log = (...args: any[]): void => {
  console.log(`[Zenithic]`, ...args);
};

/**
 * Logs a warning to the console.
 * @param message The warning to log.
 */
export const warn = (message: string): void => {
  console.warn(`[Zenithic] ${message}`);
};

/**
 * Logs an error to the console.
 * @param message The error to log.
 */
export const error = (message: string): void => {
  console.error(`[Zenithic] ${message}`);
};
