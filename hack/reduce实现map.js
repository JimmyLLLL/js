Array.prototype.selfMap = function(fn,context){
    let arr = Array.prototype.slice.call(this)
    return arr.reduce((pre,now,index)=>{
        return [...pre,fn.call(context,now,index,this)]
    },[])
}