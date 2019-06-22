const isComplexDataType = obj => ((typeof obj === 'object' || typeof obj === 'function') && obj !==null)

const myAssign = function(target,...source){
    if(target == null){
        throw new TypeError('Cannot convert undefined or null to object')
    }
    return source.reduce((pre,now)=>{
        isComplexDataType(pre) || (pre = new Object(pre))
        if(pre == null) return pre;
        [...Object.keys(now),...Object.getOwnPropertySymbols(now)].forEach(key => {
            pre[key] = cur[key]
        })
        return pre
    },target)
}