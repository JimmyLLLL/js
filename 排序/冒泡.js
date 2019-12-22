function bubbleSort(arr){
    let i = arr.length - 1;
    while(i>0){
        let pos = 0;
        for(let j=0;j<i;j++){
            if(arr[j]>arr[j+1]){
                pos = j;
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
        i=pos;
    }
    return arr
}
