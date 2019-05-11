//真实的bind更复杂，参数要处理下，不过这里着重展示一下为什么bind跟apply、call不一样
Function.prototype.emulateBind = function (context){
    let that = this 
    return function(){
        //let that = this是因为你不知道这个return的函数在哪里会被调用
        //这样的话必须存储好this，this指向想要调用bind的原函数
        return that.apply(context)
    }
}