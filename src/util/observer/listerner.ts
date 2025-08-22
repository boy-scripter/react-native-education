type EventMap = Record<string, any>;
type Listener<T> = (payload: T) => void;

export class Observer<T extends EventMap> {
  private listeners: { [K in keyof T]?: Listener<T[K]>[] } = {};

  subscribe<K extends keyof T>(event: K, listener: Listener<T[K]>) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event]!.push(listener);
    return () => this.unsubscribe(event, listener);
  }

  unsubscribe<K extends keyof T>(event: K, listener: Listener<T[K]>) {
    this.listeners[event] = this.listeners[event]?.filter(l => l !== listener);
  }

  emit<K extends keyof T>(event: K, payload: T[K]) {
    this.listeners[event]?.forEach(listener => listener(payload));
  }
}
