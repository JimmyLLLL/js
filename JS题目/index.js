['1','2','3'].map(parseInt)
//输出1 NaN NaN
//考察两个点，map的参数有三个（item，index，array（本身））
//parseInt参数两个（item，index）第二个为进制
//相当于 parseInt('1',0) => 1    0进制无所谓，是1就1
//相当于 parseInt('2',1) => NaN    1进制下不存在2
//相当于 parseInt('3',2) => NaN


//对数组 ['2018-03-05', '2013-06-12','2019-03-12','2018-03-05','2014-02-22'] 去重且排序
//有意思的是js对日期居然可以大小排序，在下服气
let arr = [...new Set(['2018-03-05', '2013-06-12','2019-03-12','2018-03-05','2014-02-22'])].sort(function(a,b){
    return a<b ? -1:1; // 这里返回的是升序的,降序改下返回值就好了.所以是相对
  })


//求[1, 10, 11, -1,'-5',12, 13, 14, 15, 2, 3, 4, 7, 8, 9]内最大值与最小值之差
function MaxMinPlus(arr){
    return Array.isArray(arr)?Math.max.apply(Math,arr)-Math.min.apply(Math,arr):console.log('传入的不是数组')
}
//其实这个题目最让我感兴趣的是Math.max的用法，它是不支持传入数组的，你只能Math.max(1,1,2,23,4)这样求最大值
//利用Math.max.apply，你可以直接传入一个数组了



//请给Array实现一个方法，去重后返回重复的字符（新数组）
//嗯，Array.from(new set([含有重复元素的数组])大法不行了，因为要返回重复的字符
let testArr = [1,6,8,3,7,9,2,7,2,4,4,3,3,1,5,3];
Array.prototype.extraChar = function(){
    let cacheExtraChar = []; //缓存重复出现的字符
    let that = this
    this.map(function(item,index){
        (that.indexOf(item)!==that.lastIndexOf(item))&&cacheExtraChar.indexOf(item)===-1?cacheExtraChar.push(item):-1 //核心算法
    })
    return cacheExtraChar;
}

testArr.cacheExtraChar() //[1,3,7,2,4]



//对象数组排序
let par = [{age:5,name:'张三'},{age:3,name:'李四'},{age:15,name:'王五'},{age:1,name:'随便'}]
let parSort = par.sort(function(a,b){
    return a.age - b.age;
})


//判断一个回文字符串（正反序一样的字符串就是回文字符串）
let isPalindromes = function(params){
    params = params.toString().toLowerCase() //很明显，无视大小写的存在
    return params === params.split('').reverse().join('')
    //我想借这道题强调一点，string通过split('')变为了数组
    //数组才有reverse方法
    //数组通过join('')变为字符串
}

//判断同字母异序
let isAnagram = function(str1,str2){
    str1 = str1.toString().toLowerCase()
    str2 = str2.toString().toLowerCase()
    return str1.split('').sort().join('') === str2.split('').sort().join('')
    //这个sort在这里真的是绝了
}
//很明显我还想强调一下，sort是属于数组的



//js实现一秒后输出0-9
for(var i=0;i<10;i++){
    setTimeout((function(i){
        return function(){
            console.log(i)
        }
    })(i),1000)
}

//es6实现
for(let i=0;i<10;i++){
    setTimeout(function(){
        console.log(i)
    },1000)
}


//浅拷贝，浅拷贝是你可以把{b:{c:'1},2,a:'2'}整体换个引用地址拷贝了一遍
//但是，里面的{c:'1'}的引用地址你是依旧引用以前的
//实现浅拷贝

function shallowClone(sourceObj){
    if(!sourceObj||typeof sourceObj !== 'object'){
        console.log('您传入的不是对象')
        return
    }
    let targetObj = sourceObj.constructor === Array?[]:{}
    for(let keys in sourceObj){
        if(sourceObj.hasOwnProperty(keys)){
            //很明显不要继承过来的属性
            targetObj[keys] = sourceObj[keys]
        }
    }
    return targetObj
}

//很明显很多人应该对 for(x in arr)和for(x of arr)的差异有困惑
//for(x of arr)迭代的直接是值，例如 let a = [1,2,3]  输出1，2，3
//for(x in arr)迭代键值，例如let a = [1,2,3] 输出0，1，2

//欢迎使用es6更简便的方法
Object.assign({},targetObj)
//一句搞定，很想打我前面写了这么多？


//深度拷贝
let deepClone = function(sourceObj){
    if(!sourceObj||typeof sourceObj !=='object'){
        console.log('您传入的不是对象')
        return
    }
    return window.JSON?JSON.parse(JSON.stringify(sourceObj)):console.log('您的浏览器不支持JSON API')
}

//实际上，js基础好的同学一看这个深度拷贝肯定是有问题的，就是嵌套对层对象是有问题的，深层对象会变成一句string，留你们自己测试
//深层对象的解决办法也有，很暴力，记得上面的shallowClone浅拷贝吗？在上面加个递归吧



function Foo() {
  getName = function () { console.log(1) }
  return this
}
Foo.getName = function () { console.log(2) }
Foo.prototype.getName = function() { console.log(3) }
var getName = function () { console.log(4) }
function getName() {
  console.log(5)
}

Foo.getName() //2 函数也是一个 object, 可以拥有属性和方法, Foo.getName 被赋值为一个输出 2 的函数, 所以输出 2
getName() //4 变量提升问题，getName后来被赋值function () { console.log(4) }
Foo().getName() //1 全局getName被改变
getName() //1 全局getName被改变
new Foo.getName() //2 new会执行这个函数
new Foo().getName() //3
/*
var foo = new Foo()
foo.getName()

函数也是属性，可以Foo.getName，但是
Foo.getName将不会被记录到new里面，因为无论是Foo本身的this也没有赋值，还是prototype也没getNanme函数，所以Foo.getName函数会在nwe后丢失
 */
new new Foo().getName() //3，没什么意义，这边new Foo().getName()已经是prototype.getName()执行过了，返回一个实例对象，再new也没意义
