function bubbleSort(arr){
    let i = arr.length - 1;
    while(i>0){
        let pos = 0; //记录交换的位置
        for(let j=0;j<i;j++){
            if(arr[j]>arr[j+1]){
                pos = j; //记录交换的位置
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
        i=pos; //意思就是说，你最后交换值的位置，就是你当前的值得最高排名了，后面的值都比你的大
        //就没必要继续去看后面的交换了，后面已经交换好了，从pos位置截止就好
    }
    return arr
}
