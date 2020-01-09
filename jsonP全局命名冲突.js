//可以定义在一个文件暴露出去
const Jsonp = {
    setJsonp: function(option) {
      const succenn_name = "g_" + new Date().getTime() + Math.floor(Math.random() * 8999 + 1000);
      const html = document.getElementsByTagName('html')[0];
      const scriptDOM = document.createElement('script');
      scriptDOM.type = "text/javascript";
      scriptDOM.setAttribute('src', encodeURI(option.url + (option.url.indexOf('?') !== -1 ? '&' : '?') + "jsoncallback=" + succenn_name));

      html.appendChild(scriptDOM);
      option.success(window[succenn_name]())
      html.removeChild(scriptDOM);
    }
  }
  
  // 调用
  Jsonp.setJsonp({
    url: 'url',
    success: function(res) {

    }
  });