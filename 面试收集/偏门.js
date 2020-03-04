第一题
const a = 123
const b = {
    a:456,
    c:function(){
        console.log(this.a)
    }
}

console.log(b.c()) //456

//坑人地方来了

console.log((b.c)()) //依旧是456

第二题
// ['1', '2', '3'].map(parseInt)
parseInt('1', 0) //radix为0时，且string参数不以“0x”和“0”开头时，按照10为基数处理。这个时候返回1
parseInt('2', 1) //基数为1（1进制）表示的数中，最大值为0，小于2，所以无法解析，返回NaN
parseInt('3', 2) //基数为2（2进制）表示的数中，最大值为2，小于3，所以无法解析，返回NaN
//map函数返回的是一个数组，所以最后结果为[1, NaN, NaN]

parseInt("10");			//返回 10
parseInt("19",10);		//返回 19 (10+9)
parseInt("11",2);		//返回 3 (2+1)
parseInt("17",8);		//返回 15 (8+7)
parseInt("1f",16);		//返回 31 (16+15)