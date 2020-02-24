window.performance = { 
    memory: {
        usedJSHeapSize,
        totalJSHeapSize,
        jsHeapSizeLimit
    },

    navigation: {
        // 页面重定向跳转到当前页面的次数
        redirectCount,
        // 以哪种方式进入页面 0 正常跳转进入 1 window.location.reload() 重新刷新 2 通过浏览器历史记录，以及前进后退进入 255 其他方式进入
        type,         
    },

    timing: {
        // 等于前一个页面 unload 时间，如果没有前一个页面，则等于 fetchStart 时间
        navigationStart
        // 前一个页面 unload 时间，如果没有前一个页面或者前一个页面与当前页面不同域，则值为 0
        unloadEventStart,
        // 前一个页面 unload 事件绑定的回调函数执行完毕的时间
        unloadEventEnd,
        redirectStart,
        redirectEnd,
        // 检查缓存前，准备请求第一个资源的时间
        fetchStart,
        // 域名查询开始的时间
        domainLookupStart,
        // 域名查询结束的时间
        domainLookupEnd,
        // HTTP（TCP） 开始建立连接的时间            
        connectStart,
        // HTTP（TCP）建立连接结束的时间
        connectEnd,
        secureConnectionStart,
        // 连接建立完成后，请求文档开始的时间
        requestStart,
        // 连接建立完成后，文档开始返回并收到内容的时间
        responseStart,
        // 最后一个字节返回并收到内容的时间
        responseEnd,
        // Document.readyState 值为 loading 的时间
        domLoading,
        // Document.readyState 值为 interactive
        domInteractive,
        // DOMContentLoaded 事件开始时间
        domContentLoadedEventStart,
        // DOMContentLoaded 事件结束时间
        domContentLoadedEventEnd,
        // Document.readyState 值为 complete 的时间            
        domComplete,
        // load 事件开始的时间
        loadEventStart,
        // load 事件结束的时间
        loadEventEnd
    }
}

const calcTime = () => {
    let times = {}
    let t = window.performance.timing

    // 重定向时间
    times.redirectTime = t.redirectEnd - t.redirectStart

    // DNS 查询耗时
    times.dnsTime = t.domainLookupEnd - t.domainLookupStart

    // TCP 建立连接完成握手的时间
    connect = t.connectEnd - t.connectStart

    // TTFB 读取页面第一个字节的时间
    times.ttfbTime = t.responseStart - t.navigationStart     /* (navigationStart等于前一个页面 unload 时间，如果没有前一个页面，则等于 fetchStart 时间 )*/

    // DNS 缓存时间
    times.appcacheTime = t.domainLookupStart - t.fetchStart

    // 卸载页面的时间
    times.unloadTime = t.unloadEventEnd - t.unloadEventStart

    // TCP 连接耗时
    times.tcpTime = t.connectEnd - t.connectStart

    // request 请求耗时
    times.reqTime = t.responseEnd - t.responseStart

    // 解析 DOM 树耗时
    times.analysisTime = t.domComplete - t.domInteractive

    // 白屏时间
    times.blankTime = t.domLoading - t.fetchStart

    // domReadyTime 即用户可交互时间
    times.domReadyTime = t.domContentLoadedEventEnd - t.fetchStart

    // 用户等待页面完全可用的时间
    times.loadPage = t.loadEventEnd - t.navigationStart

    return times
}

/*
这个 API并不适用所有场景。比如：使用 window.performance.timing 所获的数据，
在单页应用中改变 URL 但不刷新页面的情况下（单页应用典型路由方案），是不会更新的，还需要开发者重新设计统计方案。
同时，可能无法满足一些自定义的数据。
*/