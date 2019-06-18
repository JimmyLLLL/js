Array.prototype.selfFilter = function(fn,context){
    return this.reduce((pre,now,index)=>{
        return fn.call(context,now,index,this) ? [...pre,now] : [...pre]
    },[])
}