import { createBrowserHistory, History } from "history";

class HistoryService {
  readonly history: History;

  constructor() {
    this.history = createBrowserHistory();
  }

  go(path: string) {
    this.history.push(path);
  }
}

export default new HistoryService();
