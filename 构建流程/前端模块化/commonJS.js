//NodeJS是commonJS规范的主要实践者


//math.js
let basicNum = 0
function add(a,b){
    return a + b
}

//不推荐直接使用exports
module.exports = {
    add,
    basicNum
}

//引用math.js

let math = require('./math')
math.add(2,5)

//没错，就这么简单。。。

//commonJS用同步的方式家在模块，由于在服务端，
//文件都存在本地磁盘，所以读取速度很快，同步没关系
//但是在浏览器中，因为网络原因，异步是个更好的选择

