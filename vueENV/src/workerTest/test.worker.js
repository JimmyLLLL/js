console.log('启动了')
self.addEventListener('message', function (e) {
    let result = 0
    this.console.time()
    for(let i=0;i<9999999999;i++){
        result+=i
    }
    this.console.timeEnd()
    self.postMessage(result);
}, false);