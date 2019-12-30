//0.js

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    [0],
    {
        "./src/hello.js": (function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            eval("__webpack_require__.r(__webpack_exports__);\n// module.exports = function(name) {\n//     return 'hello ' + name\n// }\nvar sayHello = function sayHello(name) {\n  return \"hello \".concat(name);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (sayHello);\n\n//# sourceURL=webpack:///./src/hello.js?")
        })
    }])


//main.js
/*
{
    // 所有静态加载，在modules传参
    "./src/index.js": (function(module, exports, __webpack_require__) {
    eval("// var sayHello = rt sayHello from './hello.js'\n// console.log(......
}
*/
(function(modules) {
    /***
    * webpackJsonp 只是一个数组
    * webpackJsonp 用于从异步加载的文件中安装模块
    * 把 webpackJsonp 挂载到全局是为了方便在其他文件中调用
    *
    * 
    * data是数组，包含三个参数［chunkIds,moreModules,executeModules］
    * @param chunkIds 异步加载的文件中存放的需要安装的模块对应的 Chunk ID
    * @param moreModules 异步加载的文件中存放的需要安装的模块列表
    * @param executeModules 在异步加载的文件中存放的需要安装的模块都安装成功后，需要执行的模块对应的 index
    */
    function webpackJsonpCallback(data) {
        var chunkIds = data[0];
        var moreModules = data[1];
        var moduleId, chunkId, i = 0,
            resolves = [];
        // 把所有 chunkId 对应的模块都标记成已经加载成功 
        for (; i < chunkIds.length; i++) {
            chunkId = chunkIds[i];
            if (installedChunks[chunkId]) {
                resolves.push(installedChunks[chunkId][0])
            }
            // 键为 Chunk 的 ID，值为 0 代表已经加载成功
            installedChunks[chunkId] = 0
        }
        for (moduleId in moreModules) {
            if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
            /*
            {
                // 所有静态加载，在modules传参
                "./src/index.js": (function(module, exports, __webpack_require__) {
                eval("// var sayHello = rt sayHello from './hello.js'\n// console.log(......
            }
            */
                modules[moduleId] = moreModules[moduleId]
            }
        }
        if (parentJsonpFunction) parentJsonpFunction(data);
        while (resolves.length) {
            resolves.shift()()
        }
    };

    var installedModules = {};
    // 存储每个 Chunk 的加载状态
    // 键为 Chunk 的 ID，值为 0 代表已经加载成功，原本是个饱含信息的对象
    var installedChunks = {
        "main": 0
    };

    function jsonpScriptSrc(chunkId) {
        //__webpack_require__.p = "";
        return __webpack_require__.p + "" + ({}[chunkId] || chunkId) + ".js"
    }
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports
        }

        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports
    }

    /**
    * 用于加载被分割出去的，需要异步加载的 Chunk 对应的文件
    * @param chunkId 需要异步加载的 Chunk 对应的 ID
    * @returns {Promise}
    */
    __webpack_require__.e = function requireEnsure(chunkId) {
        var promises = [];
        /* data是数组，包含三个参数［chunkIds,moreModules,executeModules］
        * @param chunkIds 异步加载的文件中存放的需要安装的模块对应的 Chunk ID
        * @param moreModules 异步加载的文件中存放的需要安装的模块列表
        * @param executeModules 在异步加载的文件中存放的需要安装的模块都安装成功后，需要执行的模块对应的 index
        */
        var installedChunkData = installedChunks[chunkId];
        // 如果加载状态为 0 表示该 Chunk 已经加载成功了，直接返回 resolve Promise
        if (installedChunkData !== 0) {
            if (installedChunkData) {
                promises.push(installedChunkData[2])
            } else {
                var promise = new Promise(function(resolve, reject) {
                    installedChunkData = installedChunks[chunkId] = [resolve, reject]
                });
                promises.push(installedChunkData[2] = promise);
                var script = document.createElement('script');
                var onScriptComplete;
                script.charset = 'utf-8';
                // 设置异步加载的最长超时时间
                script.timeout = 120;
                if (__webpack_require__.nc) {
                    script.setAttribute("nonce", __webpack_require__.nc)
                }
                // 文件的路径为配置的 publicPath、chunkId 拼接而成
                script.src = jsonpScriptSrc(chunkId);
                onScriptComplete = function(event) {
                    script.onerror = script.onload = null;
                    clearTimeout(timeout);
                    var chunk = installedChunks[chunkId];
                    if (chunk !== 0) {
                        if (chunk) {
                            var errorType = event && (event.type === 'load' ? 'missing' : event.type);
                            var realSrc = event && event.target && event.target.src;
                            var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
                            error.type = errorType;
                            error.request = realSrc;
                            chunk[1](error)
                        }
                        installedChunks[chunkId] = undefined
                    }
                };
                var timeout = setTimeout(function() {
                    onScriptComplete({
                        type: 'timeout',
                        target: script
                    })
                }, 120000);
                script.onerror = script.onload = onScriptComplete;head 
                // 通过 DOM 操作，往 HTML head 中插入一个 script 标签去异步加载 Chunk 对应的 JavaScript 文件
                document.head.appendChild(script)
            }
        }
        return Promise.all(promises)
    };

    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.d = function(exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, {
                enumerable: true,
                get: getter
            })
        }
    };

    __webpack_require__.r = function(exports) {
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            Object.defineProperty(exports, Symbol.toStringTag, {
                value: 'Module'
            })
        }
        Object.defineProperty(exports, '__esModule', {
            value: true
        })
    };

    __webpack_require__.t = function(value, mode) {
        if (mode & 1) value = __webpack_require__(value);
        if (mode & 8) return value;
        if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
        var ns = Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, 'default', {
            enumerable: true,
            value: value
        });
        if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key]
        }.bind(null, key));
        return ns
    };

    __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ?
        function getDefault() {
            return module['default']
        } : function getModuleExports() {
            return module
    };
    __webpack_require__.d(getter, 'a', getter);
        return getter
    };
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property)
    };
    __webpack_require__.p = "";
    __webpack_require__.oe = function(err) {
        console.error(err);
        throw err;
    };

    var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
    var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
    jsonpArray.push = webpackJsonpCallback;
    jsonpArray = jsonpArray.slice();
    for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);

    var parentJsonpFunction = oldJsonpFunction;
    return __webpack_require__(__webpack_require__.s = "./src/index.js")
    })({
        // 所有没有经过异步加载的，随着执行入口文件加载的模块
        "./src/index.js": (function(module, exports, __webpack_require__) {
        eval("// var sayHello = require('./hello')\n// console.log(sayHello('lucas'))\n// import sayHello from './hello.js'\n// console.log(sayHello('lucas'))\nnew Promise(function (resolve) {\n  __webpack_require__.e(/*! require.ensure */ 0).then((function (require) {\n    resolve(__webpack_require__(/*! ./hello */ \"./src/hello.js\"));\n  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);\n}).then(function (sayHello) {\n  console.log(sayHello('lucas'));\n});\n\n//# sourceURL=webpack:///./src/index.js?")
    })
});