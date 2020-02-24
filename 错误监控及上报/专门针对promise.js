new Promise((resolve, reject) => {
    throw new Error()
}).then( () => {
    console.log('resolved')
}, err => {
    console.log('rejected')
    throw err
}).catch(err => {
    console.log(err, 'catch')
})
//输出：rejected，在有 onRejected 的情况下，onRejected 发挥作用，catch 并未被调用。 


new Promise((resolve, reject) => {
    resolve()
}).then(() => {
    throw new Error()
    console.log('resolved')
}, err => {
    console.log('rejected')
    throw err
}).catch(err => {
    console.log(err, 'catch')
})

//输出被catch到的内容，写catch优势就在于可以一起连then里面的报错一起捕获


//除此之外，对于 Promise 的错误处理，我们还可以注册对 Promise 全局异常的捕获事件 unhandledrejection：

window.addEventListener("unhandledrejection",  e => {
    e.preventDefault()
    console.log(e.reason)
    return true
})

//这对于集中管理和错误收集更加友好。