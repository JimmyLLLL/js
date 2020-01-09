xxxx //xxxx未定义，由于没有错误捕获机制，不能打印'你好'
window.onerror = function(){
    console.log('你好')
}

// ----------

try{
    
}catch{

}finally{
    throw new Error('错误')
}
window.onerror = function(){
    console.log('你好')
}
//全局捕获错误，打印'你好

//---------
window.onerror = function(){
    console.log('你好')
}

function test(){
    try{
        return console.log('try') //return也会执行finally
        //throw new Errow('错误') 即使这边抛错，全局能监听，finally也能执行
    }catch{
    
    }finally{
        throw new Error('错误')
    }
}
test() //打印try，你好
//函数内部抛出错误，结束函数调用并出栈


/*
<script></script>
<script></script>
<script></script>
<script>
window.onerror = function(){
    console.log('你好')
}
</script>
上面的script挂掉会直接阻断解析，下面的onerror没有办法挂上去
*/

/*
使用window.onerror和window.addEventListener('error')都能捕获，
但是window.onerror含有详细的error堆栈信息，
存在error.stack中，所以我们选择使用onerror的方式对js运行时错误进行捕获。
*/

/*
资源加载错误使用addEventListener去监听error事件捕获,当一项资源（如<img>或<script>）加载失败，
加载资源的元素会触发一个Event接口的error事件，并执行该元素上的onerror()处理函数。
这些error事件不会向上冒泡到window，不过能被window.addEventListener在捕获阶段捕获。
window.addEventListener('error', (e) => {
    console.log('dom2', e)
},true)
*/

//图片防御错误
//<img src="images/logo.png" onerror="javascript:this.src='address'">

//https://mp.weixin.qq.com/s/BX0kb9HgPABi9LD9Q27Bbw