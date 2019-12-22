function myNew(){
    let obj = new object()
    let Constructor = Array.prototype.shift.call(arguments)

    obj._proto_ = Constructor.prototype

    let ret = Constructor.apply(obj,arguments)

    return typeof ret === 'object' ? ret : obj;
    //假如你b有对象返回，那么优先返回对象的值，没有的话再返回obj
}