/*
 * @Date: 2020-06-22 11:44:36
 * @LastEditors: xiangjiacheng
 * @LastEditTime: 2020-06-22 15:05:27
 * @FilePath: \koa-quickstart\test\app.test.js
 */ 
let expect = require("chai").expect;
const _ = require('lodash')
const superagent = require('superagent')
let basrUrl = 'http://localhost:3000'

  describe('测试卡密Api', function() {
  
    it('首页测试', function() {
      superagent.get(`${basrUrl}/test`)
        .then(ret => {
          console.log(ret.text)
        })
    });
  });