export const createHistory = () => {
  const historyManager = window.history;
  const history = {
    listen: (callback) =>
      historyManager.addEventListener("popstate", (event) =>
        callback(event.location)
      ),
    push: (location) => historyManager.pushState(null, null, location.pathname),
    replace: (location) =>
      historyManager.replaceState(null, null, location.pathname),
  };
  return history;
};
