Object._create = function(obj){
    let o = function(){}
    o.prototype = obj;
    return new o();
}

//new o()返回对象，相当于o._proto_ = obj