//这是带占位符的偏函数实现
/*
例子
    var subtract = function(a, b) { return b - a; };
    subFrom20 = partial(subtract, _, 20);
    subFrom20(5);
*/
function partial(fn){
    let args = Array.prototype.slice.call(arguments,1);
    return function(){
        let position = 0;
        let len = args.length;
        for(let i=0;i<len;i++){
            args[i] = args[i] === "_" ? arguments[position++] : args[i] //先把_补满
        }
        while(position < arguments.length){
            args.push(arguments[position++]) //多余的参数传金总参数
        }
        return fn.apply(this,args)
    }
}