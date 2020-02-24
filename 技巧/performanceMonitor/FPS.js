/*理论上说，FPS 越高，动画会越流畅，目前大多数设备的屏幕刷新率为 60 次/秒，所以通常来讲 FPS 为 60 frame/s 时动画效果最好，也就是每帧的消耗时间为 16.67ms。

requestAnimationFrame 大家应该都不陌生，方法告诉浏览器您希望执行动画并请求浏览器调用指定的函数在下一次重绘之前更新动画。
当你准备好更新屏幕画面时你就应用此方法。这会要求你的动画函数在浏览器下次重绘前执行。回调的次数常是每秒 60 次，大多数浏览器通常匹配 W3C 所建议的刷新率。

使用 requestAnimationFrame 计算 FPS 原理
原理是，正常而言 requestAnimationFrame 这个方法在一秒内会执行 60 次，也就是不掉帧的情况下。
假设动画在时间 A 开始执行，在时间 B 结束，耗时 x ms。而中间 requestAnimationFrame 一共执行了 n 次，则此段动画的帧率大致为：n / (B - A)。*/


var frame = 0; //每一秒清零，记录一秒内执行的帧数
var lastTime = performance.now(); //lastFameTime的高端版本，一秒才动一次，因为测的是每秒帧率
var lastFameTime = performance.now();
  
var loop = function () {
    var now = performance.now(); //当前帧开始时间

    lastFameTime = now; //记录当前开始时间为相对下次loop的上次执行时间
    frame++;//每次一帧加1
  

    //一秒钟如果满帧的话loop调用60次
    if (now > 1000 + lastTime) {
        var fps = Math.round((frame * 1000) / (now - lastTime)); //知道一帧的执行时间就可以估算每秒帧率了，这里算是取平均的意思，标准下，这边frame应该可以达60
        console.log(`${new Date()} 1S内 FPS：`, fps);
        frame = 0;//每一秒清零，记录一秒内执行的帧数
        lastTime = now;//lastFameTime的高端版本，一秒才动一次，因为测的是每秒帧率
    };
  
    window.requestAnimationFrame(loop);
}
 
loop();


/*
值得注意的是，这个方法计算的结果和真实的帧率肯定是存在误差的，
因为它是将每两次主线程执行 javascript 的时间间隔当成一帧，而非主线程加合成线程所消耗的时间为一帧。但是对于现阶段而言，算是一种可取的方法。
*/