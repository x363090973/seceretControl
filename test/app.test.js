/*
 * @Date: 2020-06-22 11:44:36
 * @LastEditors: xiangjiacheng
 * @LastEditTime: 2020-06-30 17:52:44
 * @FilePath: \koa-quickstart\test\app.test.js
 */
let expect = require("chai").expect;
const _ = require('lodash')
const superagent = require('superagent')
let basrUrl = 'http://localhost:3000'

superagent.post(`${basrUrl}/login/free`)
    .send({ cpuNumber: "cpuNumber", hardDiskNumber: 'hardDiskNumber' })
    .set('Accept', 'application/json')
    .then(ret => {
        console.log(ret)
    })