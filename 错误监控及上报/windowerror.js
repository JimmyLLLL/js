//注意需要将 window.onerror 放在所有脚本之前，这样才能对语法异常和运行异常进行处理。
//mesage 为错误信息提示
//source 为错误脚本地址
//lineno 为错误的代码所在行号
//colno 为错误的代码所在列号
//error 为错误的对象信息，比如 error.stack 获取错误的堆栈信息
window.onerror = function (message, source, lineno, colno, error) { 
    // 为了行数选择正确，webpack配置sourcemap时一定要合理
}

/*
    优点：
    window.onerror 这种方式对代码侵入性较小，也就不必涉及 AST 自动插入脚本
    无论是异步还是非异步，onerror 都能捕获到运行时错误。
    缺点：
    与trycatch一样对语法错误无能为力
    网络错误（因为网络请求异常不会事件冒泡）无能为力
    注意：
    如果想使用 window.onerror 函数消化错误，需要显示返回 true，以保证错误不会向上抛出，控制台也就不会看到一堆错误提示
    window.onerror 不能保证获取跨域所获得的有效信息。由于安全原因，不同浏览器返回的错误信息参数可能并不一致。比如，跨域之后 window.onerror 在很多浏览器中是无法捕获异常信息的，要统一返回 Script error，这就需要 script 脚本设置为：crossorigin="anonymous"
*/