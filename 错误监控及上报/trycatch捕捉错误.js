//错误误收集方案一般有两种，try catch 捕获错误和 window.onerror 监听


//自动化 try catch捕获 自动化方案的基本原理是 AST 技术：比如 UglifyJS 就提供操作 AST 的 API，我们可以对每个函数添加 try catch


const fs = require('fs')

//Lodash是一个一致性、模块化、高性能的 JavaScript 实用工具库。
const _ = require('lodash')
const UglifyJS = require('uglify-js')

const isASTFunctionNode =  node => node instanceof UglifyJS.AST_Defun || node instanceof UglifyJS.AST_Function
​   
const globalFuncTryCatch = (source, errorHandler) => {

    const errorHandlerSource = errorHandler.toString()
    const errorHandlerAST = UglifyJS.parse('(' + errorHandlerSource + ')(error);')
    var tryCatchAST = UglifyJS.parse('try{}catch(error){}')
    const sourceAST = UglifyJS.parse(source)
    var topFuncScope = []

    tryCatchAST.body[0].catch.body[0] = errorHandlerAST

    //阅读代码时结合uglifyjs生成的AST阅读即可，此过程只是自动化加上try catch
    const walker = new UglifyJS.TreeWalker(function (node) {
        if (isASTFunctionNode(node)) {
            topFuncScope.push(node)
        }
    })
    sourceAST.walk(walker)
    sourceAST.transform(transfer)

    const transfer = new UglifyJS.TreeTransformer(null,
        node => {
            if (isASTFunctionNode(node) && _.includes(topFuncScope, node)) {
                var stream = UglifyJS.OutputStream()
                for (var i = 0; i < node.body.length; i++) {
                    node.body[i].print(stream)
                }
                var innerFuncCode = stream.toString()
                tryCatchAST.body[0].body.splice(0, tryCatchAST.body[0].body.length)
                var innerTyrCatchNode = UglifyJS.parse(innerFuncCode, {toplevel: tryCatchAST.body[0]})
                node.body.splice(0, node.body.length)
                return UglifyJS.parse(innerTyrCatchNode.print_to_string(), {toplevel: node});
            }
        })
    const outputCode = sourceAST.print_to_string({beautify: true})
    return outputCode
}

module.exports.globalFuncTryCatch = globalFuncTryCatch

//try catch 处理异常的能力有限
/*
    语法错误无能为力
    try {
        setTimeout(() => {
            a 这里没办法检测出语法错误，只能在异步里面继续包一个trycatch
        })
    } catch(e) {
        console.log(e)
    }
    而且代码的进入性较强
*/