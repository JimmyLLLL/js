Array.prototype.selfFlat = function(depth = 1){
    let arr = Array.prototype.slice.call(this)
    if(depth === 0) return arr
    return arr.reduce((pre,now) => {
        if(Array.isArray(now)){
            return [...pre,...selfFlat.call(now,depth-1)]
        }else{
            return [...pre,now]
        }
    },[])
}