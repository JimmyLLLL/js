export const getOffsetAndLimit = (page: number, limit: number) => {
  let offset = limit * (page - 1);
  if (offset < 0) {
    if (process.env.NODE_ENV !== "production") {
      console.error(new Error("the offset may calculate failed")); // fixme
    }
    offset = 0;
  }
  return {
    offset,
    limit
  };
};

export const delay = (timeout: number = 3000, msg: any = null) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(msg);
    }, timeout);
  });

export const keeping = (promise: Promise<any>, ms: number) =>
  Promise.all([promise, delay(ms)]);

export const getMinAndMaxFromSeries = (
  series: Array<{ data: Array<{ x: number; y: number }>; [key: string]: any }>
) => {
  let min: number = null;
  let max: number = null;
  series.forEach(item => {
    const first = item.data[0];
    const last = item.data[item.data.length - 1];
    if (first) min = first.x;
    if (last) max = last.x;
  });
  return { min, max };
};

export const deepCopy = function(obj: any) {
  if (typeof obj !== "object") return;
  const newObj: any = obj instanceof Array ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] =
        typeof obj[key] === "object" ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
};

export const flatten = function(arr: any): any[] {
  return !Array.isArray(arr) ? arr : [].concat.apply([], arr.map(flatten));
};
