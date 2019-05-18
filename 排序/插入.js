//初学有点难理解，跟着我的思路走
//首先这个函数排序后是从小到大顺序的

function insertionSort(array){
    if(Object.prototype.toString.call(array).slice(8,-1) === 'Array') {
        for(var i=1;i<array.length;i++){
            let key = array[i];  //锁定你现在的i值对应的数组值，随时以后用
            let j = i-1;  //这个j值将会把i值之前的数字全部遍历一遍，比如i=3，j有机会等于2，1，0最后-1跳出while循环
            while(j >=0 && array[j]>key){
                //如果你的i值对应的数组数值比较小的话
                array[j+1] = array[j];    //当i=1，第一次循环j=0
                j--;
            }
            array[j+1] = key
        }
        return array
    }else{
        return 'array is not an Array'
    }
}


//比如现在是数组，3，4，1

//i=1   key=array[1]就是4 j=i-1就是0
//此时j>0,array[0]=3,开始判断,array[j]就是3大于key就是4吗？不可能，跳出while循环，array[j+1]就是array[1]=key就是array[1]，于是排序根本没改变

//i=2   key=array[2]就是1 j=1
//此时j>0,array[1]=4，开始判断，array[j]就是4大于key就是1吗？答案是肯定的，array[2] = array[1],j--，现在array变成了3,4,4，j=0
//此时j>=0吗，是的，array[0]就是3大于1吗，肯定的，于是进入while循环，array[1] = array[0]，j--，现在array变成了,3,3,4,j=-1
//此时j>=0吗？否定，跳出while循环
//array[j+1]就是array[0] = key就是原来的1,数组变成了1，3，4，排序完成，神奇吧
//我自己看得都头疼了