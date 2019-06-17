//超强暴力扁平之递归法
function flatten(arr){
    let result = [];
    for(let i = 0,len = arr.length;i<len;i++){
        if(Array.isArray(arr[i])){
            result = result.concat(flatten(arr[i]))
        }else {
            result.push(arr[i])
        }
    }
    return result
}
//滑稽奸笑，ES6来了

function flatten(arr){
    return arr.reduce(function(prev,next){
        return prev.concat(Array.isArray(next)?flatten(next):next)
    },[])
}

//蛇皮法,只因...只会脱掉最外层的arr包裹
function flatten(arr){
    while(arr.some(item=>Array.isArray(item))){
        arr = [].concat(...arr);
    }
    return arr;
}