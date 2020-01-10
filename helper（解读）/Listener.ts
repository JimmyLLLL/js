export class Listener {
  private eventMap: {
    [key: string]: Function;
  } = {};
  add(event: string, cb: Function) {
    if (!cb || typeof cb !== "function") return;
    this.eventMap[event] = cb;
  }
  remove(event: string) {
    if (!this.eventMap[event]) return;
    this.eventMap[event] = null;
  }
  emit(event: string) {
    if (!this.eventMap[event]) return;
    this.eventMap[event]();
  }
}
