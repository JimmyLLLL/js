(function(modules) {
    //缓存已经加载过的 module 的 exports
    var installedModules = {};

    //它是 webpack 加载函数，用来加载 webpack 定义的模块，返回真正导出的对象
    //moduleId一般是路径类似"./src/index.js"
    function __webpack_require__(moduleId) {
        //缓存中存在，则直接返回结果
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports
        }

        //第一次加载时，初始化模块对象，并进行缓存
        var module = installedModules[moduleId] = {
            i: moduleId, // "./src/index.js"
            l: false, // 初始化尚未加载的标识
            exports: {} // 模块导出对象
        };

        /**
        * 执行模块
        * @param module -- 当前模块对象引用
        * @param module.exports -- 模块导出对象引用
        * @param __webpack_require__ -- 如果模块内还有其它模块，就利用到它
        */

        /*
            {
            "./src/hello.js": (function(){
                eval("module.exports = function(name) {\n    return 'hello ' + name\n}\n\n//# sourceURL=webpack:///./src/hello.js?")
            }),
            "./src/index.js": (function() {
                eval("var sayHello = __webpack_require__(/*! ./hello ...
            })
            }       
            modules对象
        */
        //在module.exports的环境下执行完函数，eval本身就是原来打包并进main.js的内容
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        

        //标记已加载
        module.l = true;

        //函数执行完毕后，导出了什么就是在这里
        /*
            上面的eval假设执行
            console.log('执行)
            module.exports = {
                ...
            }
        */
        return module.exports
    }
    //__webpack_require__函数定义到此结束

    //----------------------------------------------

    //原型链开始


    /*
        {
        "./src/hello.js": (function(){
            eval("module.exports = function(name) {\n    return 'hello ' + name\n}\n\n//# sourceURL=webpack:///./src/hello.js?")
        }),
        "./src/index.js": (function() {
            eval("var sayHello = __webpack_require__(/*! ./hello ...
        })
        }       
        modules对象
    */
    __webpack_require__.m = modules;
    //缓存的模块暂存c
    __webpack_require__.c = installedModules;
    //定义 exports 对象导出的属性
    __webpack_require__.d = function(exports, name, getter) {
        //如果 exports （不含原型链上）没有 [name] 属性，定义该属性的 getter
        /*
        __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property)
        };       
        */
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, {
                enumerable: true,
                get: getter
            })
        }
    };
    __webpack_require__.r = function(exports) {
        //如果有Symbol，typeof Symbol为function
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
        /*
            if(n&1){
                console.log('奇数')//奇数转为二进制最后一位肯定是1，而偶数二进制的最后一位是0，1转换为二进制还是1，所以判断的结果只会是0或者1.
            }else{
                console.log('偶数')
            }
         */
        //如果模式是奇数
        //moduleId一般是路径类似"./src/index.js"，这里value就是moduleId
        if (mode & 1) value = __webpack_require__(value);
        //8的二进制1000
        if (mode & 8) return value;
        //4的二进制100
        if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
        var ns = Object.create(null);
        /*
            __webpack_require__.r = function(exports) {
                //如果有Symbol，typeof Symbol为function
                if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                    Object.defineProperty(exports, Symbol.toStringTag, {
                        value: 'Module'
                    })
                }
                Object.defineProperty(exports, '__esModule', {
                    value: true
                })
            };
        */
        __webpack_require__.r(ns);
        Object.defineProperty(ns, 'default', {
            enumerable: true,
            value: value
        });
        //2的二进制10
        /*
            __webpack_require__.d = function(exports, name, getter) {
            if (!__webpack_require__.o(exports, name)) {
                Object.defineProperty(exports, name, {
                    enumerable: true,
                    get: getter
                })
            }  
        */
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
        /*
            __webpack_require__.d = function(exports, name, getter) {
            if (!__webpack_require__.o(exports, name)) {
                Object.defineProperty(exports, name, {
                    enumerable: true,
                    get: getter
                })
            }  
        */
        __webpack_require__.d(getter, 'a', getter);
        return getter
    };
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property)
    };
    // __webpack_public_path__
    __webpack_require__.p = "";

    //加载入口模块并返回入口模块的 exports
    return __webpack_require__(__webpack_require__.s = "./src/index.js")
})({
    "./src/hello.js": (function(module, exports) {
        eval("module.exports = function(name) {\n    return 'hello ' + name\n}\n\n//# sourceURL=webpack:///./src/hello.js?")
    }),
    "./src/index.js": (function(module, exports, __webpack_require__) {
        eval("var sayHello = __webpack_require__(/*! ./hello */ \"./src/hello.js\")\nconsole.log(sayHello('lucas'))\n\n//# sourceURL=webpack:///./src/index.js?")
    })
});