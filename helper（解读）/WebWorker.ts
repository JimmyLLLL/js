import { delay, Listener } from "~/utils/helper";

export class WebWorker {
  private listener = new Listener();
  private msgMap: Map<string, any> = new Map();
  // private errMap: Map<string, any>;
  private readonly worker: Worker;
  private currentListenerIdMap: {
    [key: string]: string;
  } = {};

  constructor(
    Wkr: any,
    private timeoutMap: {
      [key: string]: number;
    } = {}
  ) {
    this.worker = Wkr;
    this.worker.onmessage = this.handleMsg.bind(this);
    // this.worker.onerror = this.handleError;
  }

  pull(event: string, data: any): any {
    return new Promise((resolve, reject) => {
      let fulfilled: boolean = false;
      // console.log(event, data, this.worker);
      this.worker.postMessage({
        event,
        data
      });
      this.currentListenerIdMap[event] = `${event}_${Math.random()
        .toString(36)
        .substring(6)}`;
      this.listener.remove(event);
      this.listener.add(event, () => {
        const data = this.msgMap.get(event);
        fulfilled = true;
        if (data && data.isError) reject(data);
        else resolve(data);
      });
      delay(
        this.timeoutMap[event] || 500,
        this.currentListenerIdMap[event]
      ).then((listenerId: any) => {
        if (fulfilled) return;
        if (this.currentListenerIdMap[event] !== listenerId) return; // 该listener已被remove，无需判断超时
        console.error(`${event} event timeout with`, data);
        reject(new Error("响应超时!"));
      });
    });
  }

  private handleMsg(e: any) {
    const { event, data } = e.data;
    if (!event) {
      console.warn("unknown data");
      return;
    }
    this.msgMap.set(event, data);
    this.listener.emit(event);
  }

  destory() {
    this.worker.terminate();
  }

  // private handleError() {
  //
  // }
}
