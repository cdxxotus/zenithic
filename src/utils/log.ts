/**
 * Logs a message to the console.
 * @param message The message to log.
 */
export const log = (message: string): void => {
  console.log(`[Zenithic] ${message}`);
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
