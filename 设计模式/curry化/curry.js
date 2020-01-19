//初版curry

function curry(fn,args){
    const length = fn.length
    args = args || []
    return function(){
        const _args = args.slice(0)
        let arg
        for(let i=0;i<arguments.length;i++){
            arg = arguments[0]
            _args.push(arg)
        }
        if(_args.length<length){
            return curry.call(this,fn,_args)
        }
        else{
            return fn.apply(this,_args)
        }
    }
}


//curry带占位符

const curry = (fn,placeholder = '_') => {
    //第二个参数是让你定制你想代替的符号的
    curry.placeholder = placeholder
    if(fn.length <= 1) return fn
    let argsList = []
    const generator = (...args) => {
        let firstHavePlaceholderIndex = -1
        args.forEach(arg => {
            let placeholderIndex = argsList.findIndex( //返回第一个满足下面条件的索引
                arg => arg === curry.placeholder
            )
            if(placeholderIndex < 0){ //当你第一次用了_，第二次是不可能走到这一步的，placeholderIndex总是有值
                firstHavePlaceholderIndex = argsList.push(arg) -1 //push方法返回数组长度
            }else if(placeholderIndex !== firstHavePlaceholderIndex){  //填补模块，第二次补值一定会到这里，因为firstHavePlaceholderIndex无法更改，第一次加_值无论如何无法达到这。
                argsList[placeholderIndex] = arg
            }else{
                argsList.push(arg)
            }
        })
        let realArgList = argsList.filter(arg => arg !== curry.placeholder)
        if(realArgList.length === fn.length){
            return fn(...argsList)
        }else if(realArgList.length > fn.length){
            throw new Error('超过初始函数参数最大值')
        }else{
            return generator
        }
    }
    return generator
}