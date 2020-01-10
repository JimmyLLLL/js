const SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
const ieVersion = Number(document.DOCUMENT_NODE);

const trim = function(str: string) {
  return (str || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "");
};

const camelCase = function(name: string) {
  return name
    .replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    })
    .replace(MOZ_HACK_REGEXP, "Moz$1");
};

/**
 * convert nodelist to array
 * @param {nodelist} element
 */
export const toNodeArray = (
  element: NodeListOf<HTMLElement>
): Array<HTMLElement> => Array.prototype.slice.call(element);

/**
 * check parent is or isn't contains child
 * @param {*} parent nodeElement
 * @param {*} child nodeElement
 */
export const contains = (parent: HTMLElement, child: HTMLElement) =>
  parent !== child && parent.contains(child);

/**
 * check element is or isn't dom
 */
export const isDom: Function = (function() {
  if (typeof HTMLElement === "object") {
    return function(obj: any) {
      return obj instanceof HTMLElement;
    };
  }

  return function(obj: any) {
    return (
      obj &&
      typeof obj === "object" &&
      obj.nodeType === 1 &&
      typeof obj.nodeName === "string"
    );
  };
})();

/**
 * 转换为dom
 * @param {string,nodeElement} element
 */
export const toDom = (element: string | HTMLElement): Array<HTMLElement> =>
  typeof element === "string"
    ? toNodeArray(document.querySelectorAll(element))
    : [element];

/**
 * find parent child.
 * @param {root} parent
 * @param {*} child
 */
export const findChild = (
  parent: string | HTMLElement,
  child: Array<HTMLElement>
): Array<HTMLElement> => {
  const parentDom = parent instanceof HTMLElement ? parent : toDom(parent)[0];

  return child.filter(ele => contains(parentDom, ele));
};

export const off: (
  element: HTMLElement | any,
  event: string,
  handler: EventListenerOrEventListenerObject
) => void = (function() {
  if (document.removeEventListener) {
    return function(
      element: HTMLElement,
      event: string,
      handler: EventListenerOrEventListenerObject
    ) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  }

  return function(
    element: any,
    event: string,
    handler: EventListenerOrEventListenerObject
  ) {
    if (element && event) {
      element.detachEvent(`on ${event}`, handler);
    }
  };
})();

/**
 * bind element event
 */
export const on: Function = (function() {
  const mousewheelevt = /Firefox/i.test(navigator.userAgent)
    ? "DOMMouseScroll"
    : "mousewheel"; // FF doesn't recognize mousewheel as of FF3.x

  if (document.addEventListener) {
    return function(
      element: string,
      event: string,
      handler: EventListenerOrEventListenerObject,
      useCapture: boolean = false
    ) {
      const parent = toDom(element)[0];
      if (parent && element && event && handler) {
        parent.addEventListener(
          event === "mousewheel" ? mousewheelevt : event,
          handler,
          useCapture
        );
        return function() {
          off(parent, event === "mousewheel" ? mousewheelevt : event, handler);
        }; // 返回解绑函数
      }
    };
  }

  return function(
    element: string,
    event: string,
    handler: EventListenerOrEventListenerObject
  ) {
    if (element && event && handler) {
      const dom: any = toDom(element)[0];

      if (dom.attachEvent) {
        dom.attachEvent(
          `on${event === "mousewheel" ? mousewheelevt : event}`,
          handler
        );
        return function() {
          off(
            toDom(element)[0],
            event === "mousewheel" ? mousewheelevt : event,
            handler
          );
        }; // 返回解绑函数
      }
      throw new Error("HTMLElement no attachEvent method.");
    }
  };
})();

/**
 * like jquery delegate
 * @param {*} element 委托
 * @param {*} event 委托事件
 * @param {*} delegateElement 元素
 * @param {*} handler 事件处理
 */
export const delegate = (
  element: string | HTMLElement,
  event: string,
  delegateElement: string,
  handler: Function,
  useCapture: boolean = true
): Function => {
  return on(
    element,
    event,
    function(e: Event) {
      const domDeleEle = toDom(delegateElement);
      const fileterDomDeleEle = findChild(element, domDeleEle);
      const curTarget = e.target;

      if (fileterDomDeleEle.includes(curTarget as HTMLElement)) handler(e);
    },
    useCapture
  );
};

export const once = function(el: HTMLElement, event: string, fn?: any) {
  const listener = function() {
    const args: Array<any> = Array.prototype.slice.call(arguments);
    if (fn) {
      fn.apply(null, args);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};

export function hasClass(el: HTMLElement, cls: string) {
  if (!el || !cls) return false;
  if (cls.indexOf(" ") !== -1)
    throw new Error("className should not contain space.");
  if (el.classList) {
    return el.classList.contains(cls);
  }

  return ` ${el.className} `.indexOf(` ${cls} `) > -1;
}

/**
 * add class, like:'a b c'
 * @param {nodeElement} el
 * @param {string} cls
 */
export function addClass(el: HTMLElement, cls: string) {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || "").split(" ");

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ` ${clsName}`;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

export function removeClass(el: HTMLElement, cls: string) {
  if (!el || !cls) return;
  const classes = cls.split(" ");
  let curClass = ` ${el.className} `;

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(` ${el.className} `, " ");
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

export const getStyle =
  ieVersion < 9
    ? function(element: HTMLElement | any, styleName: string) {
        if (!element || !styleName) return null;
        let styleNameNew: any = camelCase(styleName);
        if (styleNameNew === "float") {
          styleNameNew = "styleFloat";
        }
        try {
          switch (styleName) {
            case "opacity":
              try {
                return element.filters.item("alpha").opacity / 100;
              } catch (e) {
                return 1.0;
              }
            default:
              return element.style[styleNameNew] || element.currentStyle
                ? element.currentStyle[styleNameNew]
                : null;
          }
        } catch (e) {
          return element.style[styleNameNew];
        }
      }
    : function(element: HTMLElement, styleName: string) {
        if (!element || !styleName) return null;
        let styleNameNew: any = camelCase(styleName);
        if (styleNameNew === "float") {
          styleNameNew = "cssFloat";
        }
        try {
          const computed = document.defaultView.getComputedStyle(element, "");
          return element.style[styleNameNew] || computed
            ? computed[styleNameNew]
            : null;
        } catch (e) {
          return element.style[styleNameNew];
        }
      };

export function setStyle(
  element: HTMLElement,
  styleName: string | Array<string>,
  value: number | string
) {
  if (!element || !styleName) return;

  if (typeof styleName === "object") {
    for (const prop in styleName) {
      if (Object.prototype.hasOwnProperty.call(styleName, prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    const styleNameNew = camelCase(styleName);
    if (styleNameNew === "opacity" && ieVersion < 9) {
      element.style.filter = isNaN(Number(value))
        ? ""
        : `alpha(opacity=${Number(value) * 100})`;
    } else {
      (<any>element.style)[styleNameNew] = value;
    }
  }
}

/**
 * 隐藏元素
 * @param {nodeElement} element
 */
export const hide = (element: HTMLElement) => {
  if (!element) return;

  setStyle(element, "display", "none");
};

/**
 * 显示隐藏的元素
 * @param {nodeElement} element
 */
export const show = (element: HTMLElement) => {
  if (!element) return;

  setStyle(element, "display", "block");
};

export const THEME_MODE: string[] = ["dark", "light"];

/**
 * 主题渲染
 * @param {string} theme
 */
export const themeRender = (theme: string = "light") => {
  if (!THEME_MODE.includes(theme)) return;
  const bodyClassList = document.body.classList;
  [...bodyClassList]
    .filter(className => className.includes("theme"))
    .map(className => bodyClassList.remove(className));
  bodyClassList.add(`theme-${theme}`);
};

/**
 * 启动主题
 */
export const themeInit = () => {
  window.addEventListener("storage", function(evt: any) {
    const { key, newValue, oldValue } = evt;
    if (key === "theme" && THEME_MODE.includes(newValue)) {
      themeRender(newValue);
    }
  });
  const theme = localStorage.theme;
  themeRender(THEME_MODE.includes(theme) ? theme : "light");
};
