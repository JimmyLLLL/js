

const promise3 = import('./commonModule3')
promise3.then((res)=>{
    res.hello()
})
const promise1 = import('./commonModule1')
promise1.then((res)=>{
    res.test()
})
const promise2 = import('./commonModule2')
promise2.then((res)=>{
    res.test()
})
console.log('murphy标记')
