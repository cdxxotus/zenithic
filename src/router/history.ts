import { History } from "../types/router";

/**
 * Creates a history object that can be used to manage the browser's history.
 * @returns A history object.
 */
export const createHistory = () => {
  // Get the history manager
  const historyManager = window.history;

  // Create the history object
  const history: History = {
    // Listen to the browser's popstate event
    listen: (callback) =>
      // Add an event listener
      window.addEventListener("popstate", () =>
        // Call the callback with the current pathname
        callback(document.location.pathname)
      ),
    // Push a pathname to the browser's history
    push: (pathname) => historyManager.pushState(null, "", pathname),
    // Replace the current pathname in the browser's history
    replace: (pathname) => historyManager.replaceState(null, "", pathname),
  };

  // Return the history object
  return history;
};
