function myNew(){
    let obj = new object()
    let Constructor = [].shift.call(arguments)
    //上面这句话的意思是提取第一个参数，let a = new b()，模仿写法a=myNew(b),b就是第一个参数了
    //有点难以理解吧，意思你可以理解为，在arguments这个环境中，你调用了shift，于是就返回了第一个元素
    obj._proto_ = Constructor.prototype
    //把b有的函数安排上了
    let ret = Constructor.apply(obj,arguments)
    //把b函数运行一遍，里面有可能有this.name = xxx之类的，就可以把值给到新obj
    //arguments就是假如你还传进了什么参数，还可以给b再执行下
    return typeof ret === 'object' ? ret : obj;
    //假如你b有对象返回，那么优先返回对象的值，没有的话再返回obj
}