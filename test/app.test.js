/*
 * @Date: 2020-06-22 11:44:36
 * @LastEditors: xiangjiacheng
 * @LastEditTime: 2020-07-01 15:04:09
 * @FilePath: \koa-quickstart\test\app.test.js
 */
let expect = require("chai").expect;
const _ = require('lodash')
const superagent = require('superagent')
let basrUrl = 'http://localhost:3000';

(async () => {
    let secret = '1'
    await superagent.post(`${basrUrl}/hwUser/login/free`)
        .send({ cpuNumber: "cpuNumber", hardDiskNumber: 'hardDiskNumber' })
        .set('Accept', 'application/json')
        .then(ret => {
            expect(ret.body.cpuNumber).to.be.equals('cpuNumber')

        })
    await superagent.get(`${basrUrl}/hwUser/list`)
        .then(ret => {
            expect(ret.body.length).to.be.equals(1)

        })
    await superagent.get(`${basrUrl}/card/list/create`)
        .query({ number: '1', type: 'month' })
        .then(ret => {
            expect(ret.body.length).to.be.equals(1)
            expect(ret.body[0].type).to.be.equals('month')
            secret = ret.body[0].secret
        })
    await superagent.get(`${basrUrl}/card/list`)
        .then(ret => {

        })
    await superagent.post(`${basrUrl}/card/bind`)
        .send({ cpuNumber: "cpuNumber", hardDiskNumber: 'hardDiskNumber', secret })
        .set('Accept', 'application/json')
        .then(ret => {
            expect(ret.body.isTrialUser).to.be.equals(false)
        })
        .catch(err => {
            console.log(err)
        })
    await superagent.post(`${basrUrl}/card/bind`)
        .send({ cpuNumber: "cpuNumber", hardDiskNumber: 'hardDiskNumber', secret })
        .set('Accept', 'application/json')
        .then(ret => {
            expect(ret.body.err).to.be.equals('该秘钥已经被激活')
        })
        .catch(err => {
            console.log(err)
        })
})()