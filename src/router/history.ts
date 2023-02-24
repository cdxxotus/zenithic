import { History } from "../types/router";

export const createHistory = () => {
  const historyManager = window.history;
  const history: History = {
    listen: (callback) =>
      window.addEventListener("popstate", () =>
        callback(document.location.pathname)
      ),
    push: (pathname) => historyManager.pushState(null, "", pathname),
    replace: (pathname) => historyManager.replaceState(null, "", pathname),
  };
  return history;
};
