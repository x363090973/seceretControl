/*
 * @Date: 2020-06-22 09:54:41
 * @LastEditors: xiangjiacheng
 * @LastEditTime: 2020-06-22 15:05:51
 * @FilePath: \koa-quickstart\app.js
 */ 
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
let router = require('./router/main')
// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
app.use(router.routes());
app.use(router.allowedMethods())


// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');