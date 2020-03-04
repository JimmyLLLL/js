
let test1,test2
const promise1 = import('./commonModule1')
promise1.then((res)=>{
    test1 = res.test
})
const promise2 = import('./commonModule2')
promise2.then((res)=>{
    test2 = res.test
})

export const hello = ()=>{test1();test2()}