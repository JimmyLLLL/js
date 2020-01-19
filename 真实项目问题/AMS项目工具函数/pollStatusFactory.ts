import api from "~/api";
import { TaskStatus } from "~/utils/dicts";

interface IOption {
  timeout?: number;
}

interface ITaskResolver {
  fail(curRes: { error_msg: string }): void;
  done(): void;
  doing?(): void;
  error(err: Error): void;
}

export interface IPollStatus {
  (id: string): Promise<void>;
  destroy(cleanTask?: boolean): void;
  pushTask(taskResolver: ITaskResolver): boolean;
}

export default function pollStatusFactory({ timeout = 1000 }: IOption = {}) {
  let pollTimerId: number;
  let destroyed: boolean = false;
  const taskResolvers: ITaskResolver[] = [];

  const pollStatus: IPollStatus = async function(id: string) {
    try {
      window.clearTimeout(pollTimerId);
      const res = await api.upload.tasksState({ id });
      const curRes = res[id];
      switch (curRes.state) {
        case TaskStatus.fail:
          taskResolvers.forEach(({ fail }) => fail && fail(curRes));
          return;
        case TaskStatus.done:
          taskResolvers.forEach(({ done }) => done && done());
          return;
        case TaskStatus.doing:
          taskResolvers.forEach(({ doing }) => doing && doing());
          break;
        default:
      }
      // FIXME use await to block
      pollTimerId = window.setTimeout(pollStatus.bind(null, id), timeout);
    } catch (err) {
      console.error(err);
      taskResolvers.forEach(({ error }) => error && error(err));
    }
  };

  pollStatus.destroy = function(cleanTask: boolean = true) {
    if (cleanTask) taskResolvers.length = 0;
    pollTimerId && window.clearTimeout(pollTimerId);
    destroyed = true;
  };

  pollStatus.pushTask = function(taskResolver: ITaskResolver) {
    if (destroyed) return false;
    taskResolvers.push(taskResolver);
    return true;
  };

  // todo pause

  return pollStatus;
}
