//很奇怪为什么会有下面这个函数？是因为稀疏数组的关系，去了解一下它的，值得的

const findRealElementIndex = function(arr,initIndex){
    let index
    for(let i = initIndex||0;i<arr.length;i++){
        if(!arr.hasOwnProperty(i)) continue
        index = i
        break
    }
    return index
}

Array.prototype.selfReduce = function(fn,initialValue){
    let arr = Array.prototype.slice.call(this)
    let res

    if(initialValue === undefined){
        res = arr[findRealElementIndex(arr)]
        for(let i = 0;i < arr.length -1;i++){
            let realElementIndex = findRealElementIndex(arr,i+1)
            res = fn.call(null,res,arr[realElementIndex],realElementIndex,this)
        }
    }else{
        res = initialValue
        for(let i=0;i<arr.length;i++){
            if(!arr.hasOwnProperty(i)) continue
            res = fn.call(null,res,arr[i],i,this)
        }
    }
    return res
}