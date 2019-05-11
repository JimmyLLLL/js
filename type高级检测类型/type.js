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


