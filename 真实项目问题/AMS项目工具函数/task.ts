import isEqual from "lodash/isEqual";
import logdown from "logdown";
import { pageStatus } from "./browser";
import { TASK_LOOP_TIME } from "~/utils/consts";

const log = logdown("Task");

type CallBack = (value: any) => any;
type TASK = {
  id: Object;
  api: () => any;
  cb?: Array<CallBack>;
};

let lifeStatus: "active" | "hidden" = "active";
pageStatus.add({
  active() {
    lifeStatus = "active";
  },
  hidden() {
    lifeStatus = "hidden";
  }
});

export default class Task {
  private task: Array<TASK> = [];
  private hiddenRun: boolean = false;

  constructor(hiddenRun: boolean = false) {
    this.hiddenRun = hiddenRun;
    this.loop();
  }

  public add(url: string, config: any, makeReq: any) {
    return (cb: (value: any) => void) => {
      const idObj = Object.assign({}, config, { url });
      const task: TASK = this.isGetId(idObj);

      if (task) return this.addCallBack(idObj, cb);

      const obj = {
        id: idObj,
        api: makeReq.bind(null, url, config),
        cb: [cb]
      };
      this.task.push(obj);
      return () => this.stop(obj.id, cb);
    };
  }

  private isGetId(id: Object): TASK {
    for (let i = 0; i < this.task.length; i++) {
      if (isEqual(id, this.task[i].id)) return this.task[i];
    }
  }

  private remove(id: Object) {
    this.task = this.task.filter(item => !isEqual(item.id, id));
    log.info(`remove id task: `, id);
    return this.task;
  }

  private async run() {
    if (this.task.length === 0) return;
    log.info("start run task queue.");
    const results = await Promise.all(this.task.map(item => item.api()));
    log.info("task result: ", results);
    this.task.forEach((item, index) => {
      if (results[index] && item.cb && item.cb.length !== 0) {
        log.info(
          "task id: ",
          item.id,
          " is success.",
          "result is: ",
          results[index]
        );
        item.cb.forEach(item => item(results[index]));
        this.remove(item.id);
      }
    });
  }

  private async loop() {
    if (this.hiddenRun) {
      await this.run();
    } else if (lifeStatus === "active") {
      await this.run();
    }

    setTimeout(async () => {
      await this.loop();
    }, TASK_LOOP_TIME);
  }

  // 根据id增加cb
  private addCallBack(id: Object, cb: (value: any) => void) {
    for (let i = 0; i < this.task.length; i++) {
      if (isEqual(id, this.task[i].id)) {
        if (this.task[i].cb) {
          this.task[i].cb.push(cb);
        } else {
          this.task[i].cb = [cb];
        }
        return () => this.stop(id, cb);
      }
    }
  }

  private stop(id: Object, fn: (value: any) => any): boolean {
    for (let i = 0; i < this.task.length; i++) {
      if (isEqual(id, this.task[i].id)) {
        log.info("success remove id task: ", id);
        this.task[i].cb = this.task[i].cb.filter(cb => cb !== fn);
        if (this.task[i].cb.length === 0) this.remove(id);
        return true;
      }
    }
    return false;
  }
}
