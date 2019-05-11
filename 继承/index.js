//欢迎使用万恶的es5进行继承

//我觉得记忆名字实在是无语，什么寄生组合...总之无所谓了，最重要你要清楚为什么那么做

function ParentClass(name){
    this.name = name
}

ParentClass.prototype.sayHello = function(){
    console.log("i am your father fn"+this.name)
}

function SubClass(name,age){
    ParentClass.call(this,name)
    //实际上Parent这个函数，在此作用域下运行了一遍，也就是说sub的name被赋值了
    this.age = age
}

SubClass.prototype = Object.create(ParentClass.prototype)
//怎么样，疑惑吧，Object.create有什么用呢?
/*
Object.create = function(o){
    let F = function(){};
    F.prototype = o; //在本题里，这里相当于F.protoype = ParentClass.prototype
    return new F()
}
*/
//粗略可以了解为深复制了一番
SubClass.prototype.constructor = SubClass //不改的constructor还是ParentClass
SubClass.prototype.sayChildHello = function(name){
    console.log('I am your child fn'+this.name)
}


//ES6写法

class ParentClass{
    constructor(name){
        this.name = name
    }
    sayHello(){
        console.log('i am your father fn'+this.name)
    }
}

class SubClass extends ParentClass{
    constructor(name){
        super(name) //调用父类构造函数
    }
    sayChildHello() {
        console.log("I'm child fn" + this.name)
      }
      // 重新声明父类同名方法会覆写,ES5的话就是直接操作自己的原型链上
      sayHello(){
        console.log("override parent method !,I'm sayHello Method")
      }
}