import logdown from "logdown";
// import * as XLSX from 'xlsx';
import { on } from "./dom";
// import { login } from "~/api/faker/modules/auth";
// import { file } from '/api/modules/upload';

const log = logdown("PageStatus");
// const { read, utils } = XLSX;

type Procedure = (...args: any[]) => void;
export function debounce<F extends Procedure>(fn: F, time: number) {
  let timer: number = 0;

  return function(this: any, ...args: any[]) {
    window.clearTimeout(timer);

    timer = window.setTimeout(() => {
      fn.apply(this, args);
    }, time);
  };
}
export function throttle<F extends Procedure>(fn: F, time: number) {
  let timer: number = 0;
  let lastExec: number = Date.now();

  return function(this: any, ...args: any[]) {
    const now = Date.now();

    const exec = () => {
      lastExec = Date.now();
      fn.apply(this, args);
    };

    window.clearTimeout(timer);
    if (now - lastExec > time) {
      exec();
    } else {
      timer = window.setTimeout(exec, time);
    }
  };
}

export const createDownloadByBlob = (
  blob: string | Array<string>,
  config: {
    type?: string;
    charset?: string;
    filename: string;
  }
) => {
  let blobAry = blob;
  if (!Array.isArray(blob)) blobAry = [blob];

  const blobInstance = new Blob(blobAry as Array<string>, config);
//Internet Explorer 10 的 msSaveBlob 和 msSaveOrOpenBlob 方法允许用户在客户端上保存文件，方法如同从 Internet 下载文件，这是此类文件保存到“下载”文件夹的原因。
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blobInstance, config.filename);
  } else {
    const a = document.createElement("a");
    //表单元素input type=”hidden”的作用，隐藏域在页面中对于用户是不可见的，在表单插入中隐藏域的目的在于收集和发送信息，以利于被处理表单的程序所使用，注：隐藏只是在网页页面上不显示输入框，但是虽然隐藏了，还是具有form传值功能。一般用来传值，而不必让用户看到。
    a.setAttribute("type", "hidden");
    //把文件变成了url
    /*
  在每次调用 createObjectURL() 方法时，都会创建一个新的 URL 对象，即使你已经用相同的对象作为参数创建过。当不再需要这些 URL 对象时，每个对象必须通过调用 URL.revokeObjectURL() 方法来释放。
  浏览器在 document 卸载的时候，会自动释放它们，但是为了获得最佳性能和内存使用状况，你应该在安全的时机主动释放掉它们。   
    */
    const url = window.URL.createObjectURL(blobInstance);
    a.href = url;
    a.download = config.filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }
};

type STATUS = "active" | "hidden";
type LISTENER = {
  id: string;
  active: () => void;
  hidden: () => void;
};
type RESIZER = {
  id: string;
  cb: () => void;
};

export class ListenPageStatus {
  task: Array<LISTENER> = [];
  resizes: Array<RESIZER> = [];
  status: STATUS = "active";

  constructor() {
    // 浏览器标签页被隐藏或显示的时候会触发visibilitychange事件。
    on(document, "visibilitychange", this.listener.bind(this));
    on(window, "resize", this.resize.bind(this));
  }

  private listener() {
    if (document.hidden) {
      this.status = "hidden";
      for (let i = 0; i < this.task.length; i++) {
        if (typeof this.task[i].hidden === "function") {
          this.task[i].hidden();
        }
      }
    } else {
      this.status = "active";
      for (let i = 0; i < this.task.length; i++) {
        if (typeof this.task[i].active === "function") {
          this.task[i].active();
        }
      }
    }
  }
  private resize = debounce(() => {
    for (let i = 0; i < this.resizes.length; i++) {
      this.resizes[i].cb();
    }
  }, 500);

  public add(listener: { active: () => void; hidden: () => void }) {
    const id = `id_${Math.random()
      .toString(36)
      .substring(6)}`;
    this.task.push(
      Object.assign({}, listener, {
        id
      })
    );
    return id;
  }
  public addResize(resizer: () => void): string {
    const id = `id_${Math.random()
      .toString(36)
      .substring(6)}`;
    this.resizes.push({
      id,
      cb: resizer
    });
    return id;
  }

  public remove(id: string) {
    this.task = this.task.filter(task => task.id !== id);
  }
  public removeResize(id: string) {
    this.resizes = this.resizes.filter(resizer => resizer.id !== id);
  }
}

export const pageStatus = new ListenPageStatus();

type LoopConfig = {
  time?: number;
  router?: Array<string>;
};
export class Loop {
  taskFn: Function = null;
  timeOut: any = null;
  _taskStatus: boolean = true;
  config: LoopConfig = {
    time: 3000,
    router: []
  };

  get taskStatus() {
    if (
      this.config.router.includes(window.location.pathname) && //window.location.pathname：例如http://localhost/ams/shared_main得/ams/shared_main
      this._taskStatus
    )
      return true;

    return false;
  }

  /**
   * @param fn task function
   * @param config time is interval, router is the page url array at runtime
   */
  constructor(fn: Function, config: LoopConfig = { time: 3000, router: [] }) {
    this.taskFn = fn;
    this.config = Object.assign({}, this.config, config);
    this.pageStatus();
    this.start();
  }

  public async start(force: boolean = false) {
    try {
      if (force || this.taskStatus) {
        await this.taskFn();
      }
    } catch (e) {
      console.error(e);
    }
    this.timeOut = setTimeout(async () => {
      await this.start();
    }, this.config.time);
  }

  public stop() {
    this._taskStatus = false;
    clearTimeout(this.timeOut);
  }

  private pageStatus() {
    pageStatus.add({
      active: () => {
        this._taskStatus = true;
      },
      hidden: () => {
        this._taskStatus = false;
      }
    });
  }
}

type CoventData = Array<{
  children: Array<{
    [key: string]: number | string;
  }>;
  [key: string]:
    | number
    | string
    | Array<{
        [key: string]: number | string;
      }>;
}>;
// export class DataToExcel {
// 	data: CoventData;
// 	title: Array<{
// 		prop: string
// 		label: string
// 	}>;

// 	get templateUrl(): {
// 		[key: string]: string
// 		} {
// 		return {
// 			holdingpanorama: '/static/xlsx/持仓全景.xlsx'
// 		}
// 	}

// 	constructor(data: CoventData, title: Array<{
// 		prop: string
// 		label: string
// 	}>) {
// 		this.data = data;
// 		this.title = title;
// 	}

// 	handleTreeData() {
// 		const xlsx: Array<Array<string | number>> = [];
// 		const title: Array<string> = [];
// 		const titleMap: {
// 			[key: string]: string
// 		} = this.title.reduce((prev: {
// 			[key: string]: string
// 		}, curr) => {
// 			prev[curr.label] = curr.prop;
// 			title.push(curr.label);
// 			return prev;
// 		}, {});

// 		xlsx.push(title);
// 		this.data.forEach(item => {
// 			item.children.forEach(data => {
// 				const xlsxLine: Array<string | number> = [];
// 				title.forEach(key => {
// 					const val = data[titleMap[key]];
// 					xlsxLine.push(val || '空');
// 				})
// 				xlsx.push(xlsxLine);
// 			})
// 		})
// 		return xlsx;
// 	}

// 	treeToExcel(filename: string) {
// 		const xlsx = this.handleTreeData();
// 		console.log(xlsx);
// 		const workBook = utils.book_new();
// 		const workSheet = utils.aoa_to_sheet(xlsx);

// 		utils.book_append_sheet(workBook, workSheet, 'RQAms');
// 		XLSX.writeFile(workBook, `${filename}.xlsx`);
// 	}

// 	useTemplateToXlsx(pagename: string, filename: string) {
// 		const url = this.templateUrl[pagename];
// 		const req = new XMLHttpRequest();
// 		const xlsx = this.handleTreeData();
// 		req.open('GET', url, true);
// 		req.responseType = 'arraybuffer';

// 		req.onload = () => {
// 			const data = new Uint8Array(req.response);
// 			const workBook = read(data, {
// 				type: 'array'
// 			});
// 			// debugger;
// 			console.log(workBook.Sheets['Sheet1']);

// 			utils.sheet_add_aoa(workBook.Sheets['Sheet1'], xlsx);
// 			// utils.book_append_sheet(workBook, workBook.Sheets['Sheet1'], name);
// 			XLSX.writeFile(workBook, `${filename}.xlsx`);
// 		}
// 		req.send();
// 	}
// }
