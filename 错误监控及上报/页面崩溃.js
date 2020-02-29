//一个成熟的系统还需要收集崩溃和卡顿，对此我们可以监听 window 对象的 load 和 beforeunload 事件，并结合 sessionStorage 对网页崩溃实施监控：

window.addEventListener('load', () => {
    sessionStorage.setItem('good_exit', 'pending')
})

window.addEventListener('beforeunload', () => {
    //正常关闭会经过beforeunload，但是崩溃不会
    sessionStorage.setItem('good_exit', 'true')
})

if(sessionStorage.getItem('good_exit') &&
    sessionStorage.getItem('good_exit') !== 'true') {
    // 捕获到页面崩溃
}