//pending状态一旦决定了，不可更改
//then为异步，new Promise里面的构造函数为同步
//catch不能捕获任意错误，比如then里面的setTimeout手动抛出一个error，throw那种
//如果then返回一个promise.reject()会中断链式调用
//promise无论是catch还是then，return的都是一个新的promise（前提promise没有被中断）


//延时函数

const delay = (time) => new Promise((resolve,reject)=>{
    setTimeout(resolve,time)
})

let test = async function(){
    console.log(1)
    await delay(2000)
    console.log('我两秒后才触发',3)
}

//奸笑

let test = new Promise((resolve,reject)=>{
    resolve();
})
test.then((data)=>{
    console.log('promise first then:',data); //undefined，都没值传进来
    return Promise.resolve(1);
})
.then((data)=>{
    console.log('get parent(p1) resolve data:',data); //1
    return Promise.reject(new Error('哎呀，中断了，你能奈我和'))
})
.then((data)=>{
    console.log('result of p2:',data); //还执行个毛，上面都出错了
    return Promise.resolve(3)
})
.catch((err)=>{
    console.log('err:',err)  //err，哎呀，中断了，你能奈我和，promise.reject()中断链式调用，转给catch
    return false
})


//最后你当然可以增加一个finally，无论报不报错最终都会执行