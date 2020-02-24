Function.prototype.bind = Function.prototype.bind || function (context){
    const that = this
    const args = Array.prototype.slice.call(arguments,1)
    // 下面为验证是不是作为构造函数做准备
    const F = function () {}
    F.prototype = this.prototype
    const bound = function () {
        const innerArgs = Array.prototype.slice.call(arguments);
        const finalArgs = args.concat(innerArgs);
        return that.apply(this instanceof F ? this : context || this, finalArgs) //作为构造函数则放弃context绑定
    }
    bound.prototype = new F()
    return bound
}

/*
    普通执行 const a = b.bind(context)
            a()
            this指向window
            而 new a()
            /*
                function myNew(){
                    let obj = new object()
                    let Constructor = Array.prototype.shift.call(arguments)

                    obj._proto_ = Constructor.prototype //获得了prototype

                    let ret = Constructor.apply(obj,arguments)

                    return typeof ret === 'object' ? ret : obj;
                    //假如你b有对象返回，那么优先返回对象的值，没有的话再返回obj
                }           
            */
*/