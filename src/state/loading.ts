class LoadingState {
  private activeRequests = 0;
  private subscribers: Array<(count: number) => void> = [];

  subscribe(listener: (count: number) => void): () => void {
    this.subscribers.push(listener);
    listener(this.activeRequests);
    return () => {
      this.subscribers = this.subscribers.filter((l) => l !== listener);
    };
  }

  private notify(): void {
    for (const s of this.subscribers) s(this.activeRequests);
  }

  increment(): void {
    this.activeRequests += 1;
    this.notify();
  }

  decrement(): void {
    this.activeRequests = Math.max(0, this.activeRequests - 1);
    this.notify();
  }
}

export const loading = new LoadingState();
