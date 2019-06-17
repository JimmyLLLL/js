//AMD采用异步加载，模块的加载不影响后面的语句的运行

//AMD只是一个思想，或者说规范
//所有依赖这个模块的语句，都定义在一个回调函数中，等待加载完成后，这个回调函数才会运行

//这里介绍用require.js实现AMD规范

//require.config指定引用路径，define定义模块，require加载模块

//引入require.js和自己的main.js

//html文件中
<script src="./require.js" data-main="./main.js"></script>

//什么？你问data-main是什么？这个我也觉得怪怪的，main.js是自己写的函数，你可以理解成先src加载require.js再载入main.js好了


//main.js

require.config({
    baseUrl:'js/lib', //好的，下面你引用的所有文件都是在js/lib下面的了
    paths:{
        "jquery":'jquery.min',  //相当于commonJS里的 ，let jquery = require('js/lib/jquery.min')
        "underscore":'underscore.min'
    }
});

//执行基本操作
require(['jquery','underscore'],function($,_){
    //$和_分别时代表jquery和underscore
})



//————————————————————————————分界线——————————————————————————————————————————


//上例子

//Math.js

define(function(){
    let basicNum = 0
    let add = function(x,y){
        return x + y;
    }
    return {
        add,
        basicNum
    }
})

//另一个main.js要依赖Math.js了
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


//如果你要定一个依赖别的模块的模块
require.config({
    baseUrl:'test', 
    paths:{
        'underscore':'underscore.js'
    }
});
define(['underscore'],function(_){
    //_就是underscore
    let classify = function(list){
        _.countBy(list,function(num){
            return num > 30 ? 'old' : 'young'
        })
    }
    return {
        classify
    }
})