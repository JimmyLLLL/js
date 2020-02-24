//<script src="***.js"  onerror="errorHandler(this)"></script>
//<link rel="stylesheet" href="***.css" onerror="errorHandler(this)"></link>


//也可以使用 window.addEventListener('error') 方式对加载异常进行处理
//注意这时候我们无法使用 window.onerror 进行处理，因为 window.onerror 事件是通过事件冒泡获取 error 信息的，而网络加载错误是不会进行事件冒泡的

//这里多提一下，不支持冒泡的事件还有：鼠标聚焦 / 失焦（focus / blur）、鼠标移动相关事件（mouseleave / mouseenter）、一些 UI 事件（如 scroll、resize 等）


// 因此，我们也就知道 window.addEventListener 不同于 window.onerror，它通过事件捕获获取 error 信息，从而可以对网络资源的加载异常进行处理：

window.addEventListener('error', error => {
    if (!error.message) { 
        // 普通错误
        console.log(error)
    }else{
        //网络错误，网络错误没有message
        //但是，也因为没有 error.message 属性，我们也就没有额外信息获取具体加载的错误细节，现阶段也无法具体区分加载的错误类别：比如是 404 资源不存在还是服务端错误等，只能配合后端日志进行排查。
    }
}, true)