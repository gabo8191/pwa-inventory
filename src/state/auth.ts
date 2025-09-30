type AuthSubscriber = (token: string | null) => void;

class AuthState {
  private key = 'auth_token';
  private subscribers: AuthSubscriber[] = [];

  getToken(): string | null {
    try {
      return localStorage.getItem(this.key);
    } catch {
      return null;
    }
  }

  setToken(token: string): void {
    try {
      localStorage.setItem(this.key, token);
      this.notify();
    } catch {
      // ignore storage errors (private mode)
    }
  }

  clearToken(): void {
    try {
      localStorage.removeItem(this.key);
      this.notify();
    } catch {
      // ignore storage errors (private mode)
    }
  }

  subscribe(cb: AuthSubscriber): () => void {
    this.subscribers.push(cb);
    cb(this.getToken());
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== cb);
    };
  }

  private notify(): void {
    const token = this.getToken();
    for (const s of this.subscribers) s(token);
  }
}

export const auth = new AuthState();
