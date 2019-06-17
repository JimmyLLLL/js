//AMD规范有一个缺点
require.config({
    baseUrl:'test', 
    paths:{
        "jquery":'jquery.min', 
        "math":'Math.js'
    }
});
require(['jquery','math'],function($,math){
    let sum = math.add(10,20)
    $('#sum').html(sum) //答案输出到dom中
})

//前面这段代码中，即时你一时诗兴大发，不用jquery了
//document.getElementById('sum').innerHTML = sum
//但是你jquery在申明依赖时已经被加载了

//为了解决这个问题，推出CMD规范

define(function(require, exports, module) {
    if('老夫要用jquery了'){
        let $ = require('test/jquery.js'); //在需要时申明 
        $('#sum').html="你好"       
    }
});

