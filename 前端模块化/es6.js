//这个大家应该太熟了，在网上复制粘贴一个例子，居然还是es5的语法...
/** 定义模块 math.js **/
var basicNum = 0;
var add = function (a, b) {
    return a + b;
};
export { basicNum, add };

/** 引用模块 **/
import { basicNum, add } from './math';
function test(ele) {
    ele.textContent = add(99,basicNum);
}


//着重讨论下ES6与CommonJS模块的差异
/*
1.CommonJS输出的是一个值的拷贝，ES6输出的是一个值的引用
解读：CommonJS输出一个值的拷贝，意味着一旦输出了，中途模块内部的变化是无法影响这个值的
     而ES6是引用，一旦变了，import加载的值也会变

2.CommonJS模块是运行时加载，ES6时编译时输出接口（怎么样，看不懂吧～）
运行时加载：require时，先加载整个模块，变成个对象（深度拷贝了，复制了，不关联了），在对象上调用方法。
编译时加载：ES6模块不是对象，通过export指定输出，对外接口只是一种静态定义，import时制定加载某个输出，不是加载整个模块
*/