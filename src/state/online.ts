type OnlineSubscriber = (online: boolean) => void;

class OnlineState {
  private online = typeof navigator !== 'undefined' ? navigator.onLine : true;
  private subscribers: OnlineSubscriber[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.handleChange);
      window.addEventListener('offline', this.handleChange);
    }
  }

  private handleChange = () => {
    this.online = navigator.onLine;
    this.notify();
  };

  isOnline(): boolean {
    return this.online;
  }

  subscribe(cb: OnlineSubscriber): () => void {
    this.subscribers.push(cb);
    cb(this.online);
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== cb);
    };
  }

  private notify(): void {
    for (const s of this.subscribers) s(this.online);
  }
}

export const online = new OnlineState();
