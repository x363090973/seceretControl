/*
 * @Date: 2020-06-22 14:43:44
 * @LastEditors: xiangjiacheng
 * @LastEditTime: 2020-06-30 17:31:28
 * @FilePath: \koa-quickstart\router\main.js
 */
const Router = require('koa-router')
let router = new Router()
const hwUserControl = require('../model/hwUserControl')
const Joi = require('@hapi/joi');


/**
 * @description 
 */
router.post('/login/free', async (ctx, next) => {

    const schema = Joi.object({
        cpuNumber: Joi.string().required(),
        hardDiskNumber: Joi.string().required(),
    }).unknown()
    console.log(ctx.request.body)
    let checkRet = schema.validate(ctx.request.body)
    if (checkRet.error) {
        throw checkRet.error.message
    }
    let { cpuNumber, hardDiskNumber } = ctx.request.body
    let ret = await hwUserControl.loginByFree({ cpuNumber, hardDiskNumber })
    ctx.body = ret
})










module.exports = router