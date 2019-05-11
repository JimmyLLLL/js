//原生ajax其实很少在真正项目中使用，但是对于一个好的开发者来讲，还是要知道其原理，方便日后你也可以自己做一个封装ajax

let xhr  = new XMLHttpRequest();

xhr.onreadystatechange = function(){
    if(xhr.readyState===4){
        if(xhr.status===200){
            console.log(xhr.responseText)
        }else{
            console.log('err'+xhr.status)
        }
    }
}

xhr.open('GET','请求的网址')

xhr.setRequestHeader('Content-type','application/json')

xhr.send(null) //post情况下就有值