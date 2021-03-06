//类型检测
//支持Boolean Number String Function Array Date RegExp Object Error Null Undefined，window去掉不常用Math和Json

function type(obj){
    const class2type = {}
    "Boolean Number String Function Array Date RegExp Object Error Null Undefined".split(" ").map((item)=>{
        class2type["[object " + item + "]"] = item.toLowerCase()
    })
    if(obj!=null && obj===obj.window){
        return 'window'
    }
    return typeof obj === "object" || typeof obj === "function" ?
    class2type[Object.prototype.toString.call(obj)] || "object" :
    typeof obj;
}


//仅仅判断是否
//es6封装法 利用闭包存好type
const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target)

//定制

const isArray = isType('Array')
console.log(isArray([]))  //true