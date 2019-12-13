const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const SECREKEY = 'test';
const PASSWORD = 123
const ACCOUNT = 123

module.exports = {
  //一进入网页自动登录
  async memoryLogin(ctx) {
    const token = ctx.cookies.get('token');
    console.log(token)
    try {
      const payload = jwt.verify(token, SECREKEY);
      const { account, password } = payload;
      const content = { account, password };
      const newToken = jwt.sign(content, SECREKEY, {
        expiresIn: "1h"
      });
      ctx.cookies.set(
        'token', 
        newToken,
        {
            path:'/',
            maxAge:1000*3600,
            httpOnly :true,
            overwrite:true
        }
    )
      ctx.body = {
        status: 200,
        message:'重续成功'
      };
    } catch (e) {
      ctx.body = {
        status: 401,
        error_msg: '密码错误'
      };
    }
  },
    async login(ctx) {
        const { account, password } = ctx.request.body;
        try {
          if (password === PASSWORD) {
            const content = { account, password };
            const token = jwt.sign(content, SECREKEY, {
              expiresIn: "1h" // 1小时过期
            });
            ctx.cookies.set(
                'token', 
                token,    //可替换为token
                {
                  maxAge: 10 * 60 * 1000*1000*10, // cookie有效时长
                  httpOnly: true,  // 是否只用于http请求中获取
                  overwrite: true,  // 是否允许重写
                  path:'/'
                }
            )
            ctx.body = {
              status: 200
            };
          } else {
            ctx.body = {
              status: 401,
              error_msg: '密码错误'
            };
          }
        } catch (e) {
          console.log(e);
          ctx.body = {
            status: 500,
            error_msg: '500'
          };
        }
      }

}