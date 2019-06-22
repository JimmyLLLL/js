const finonacci = function (n){
    if(n<1) throw new Error('参数有误')
    if(n===1 || n===2) return 1
    return finonacci(n-1) + finonacci(n-2)
}

//运行中造成了极大的浪费，因为递归每个finonacci都递归到底

const memory = function(fn){
    let obj = {}
    return function(n){
        if(!obj[n]){
            obj[n] = fn(n)
        }
        return obj[n]
    }
}

const finonacciPlus = memory(finonacci)
