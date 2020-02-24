function merge(leftArr, rightArr){  
    var result = [];  
    while (leftArr.length > 0 && rightArr.length > 0){  
      if (leftArr[0] < rightArr[0])  
        result.push(leftArr.shift()); //把最小的最先取出，放到结果集中   
      else   
        result.push(rightArr.shift());  
    }   
    return result.concat(leftArr).concat(rightArr);  //剩下的就是合并，这样就排好序了  
}  

function mergeSort(array){  
    if (array.length == 1) return array;  
    var middle = Math.floor(array.length / 2);       //求出中点  
    var left = array.slice(0, middle);               //分割数组  
    var right = array.slice(middle);  
    return merge(mergeSort(left), mergeSort(right)); //递归合并与排序  
}  

var arr = mergeSort([32,12,56,78,76,45,36]);
console.log(arr);   // [12, 32, 36, 45, 56, 76, 78]