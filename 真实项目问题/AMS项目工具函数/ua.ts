export const ua = navigator.userAgent;

const hasStr = (str: string) => ua.indexOf(str) !== -1;

export const isIE = hasStr("MSIE");
export const isWebkit = hasStr("AppleWebKit");
export const isChrome = hasStr("Chrome");
export const isMac = hasStr("Mac OS X");
export const isLinux = hasStr("Linux");
export const isFirefox = hasStr("Firefox");
export const isSafari = hasStr("Safari") && !isChrome;
export const isEdge = hasStr("Edge");
export const isWeChat = hasStr("MicroMessenger");
export const isIphone = hasStr("iPhone");
export const isIPad = hasStr("iPad");

export const chromeVer = (() => {
  if (!isChrome) {
    return 0;
  }

  const match = ua.match(/Chrome\/(\d{2})/) || [];

  return Number(match[1]);
})();

export const scrollElement =
  document.scrollingElement ||
  (isWebkit ? document.body : document.documentElement);

export const isMobile =
  ((document.body && document.body.clientWidth) || 0) <= 480;
