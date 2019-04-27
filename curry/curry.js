//初版curry

function curry(fn,args){
    const length = fn.length
    args = args || []
    return function(){
        const _args = args.slice(0)
        let arg
        for(let i=0;i<arguments.length;i++){
            arg = arguments[0]
            _args.push(arg)
        }
        if(_args.length<length){
            return curry.call(this,fn,_args)
        }
        else{
            return fn.apply(this,_args)
        }
    }
}