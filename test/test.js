/*
 * @Date: 2020-06-23 11:53:06
 * @LastEditors: xiangjiacheng
 * @LastEditTime: 2020-06-30 16:18:37
 * @FilePath: \koa-quickstart\test\test.js
 */
const moment = require('moment')


console.log(moment("2020-10-30 10:27:56").diff(moment(), 's') / 3600 / 24)