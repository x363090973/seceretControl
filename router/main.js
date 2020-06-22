/*
 * @Date: 2020-06-22 14:43:44
 * @LastEditors: xiangjiacheng
 * @LastEditTime: 2020-06-22 14:54:30
 * @FilePath: \koa-quickstart\router\main.js
 */ 
const Router = require('koa-router')

let router = new Router()
router.get('/test',(ctx,next) => {
  ctx.body = {
    data:'ok'
  }
})
module.exports = router