

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

/*
Object.create = function(o){
    let F = function(){};
    F.prototype = o; //在本题里，这里相当于F.protoype = ParentClass.prototype
    return new F()
}
*/

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