self.addEventListener('message', function (e) {
    let result = 0
    for(let i=0;i<999999999999;i++){
        result+=i
    }
    self.postMessage(result);
  }, false);