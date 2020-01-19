// 一个可以向外组件输出的进度的promiseAll，that为组件实例指针，property为你想要赋值进度的属性
// 不能利用resultArray做任何事，因为这是无序的

export const promiseAll = function(
  promiseArray: any,
  that: any = null,
  property: string = ""
) {
  if (!Array.isArray(promiseArray)) {
    throw new TypeError("Args should be an array");
  }
  return new Promise((resolve, reject) => {
    try {
      const resultArray: Array<any> = [];
      const length = promiseArray.length;
      for (let i = 0; i < length; i++) {
        (promiseArray[i] as any).then((data: any) => {
          resultArray.push(data);
          that && (that[property] = resultArray.length / length);
          if (resultArray.length === length) {
            resolve(resultArray);
          }
        }, reject);
      }
    } catch (e) {
      reject(e);
    }
  });
};
