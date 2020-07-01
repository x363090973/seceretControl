/*
 * @Date: 2020-06-22 14:43:44
 * @LastEditors: xiangjiacheng
 * @LastEditTime: 2020-07-01 14:49:00
 * @FilePath: \koa-quickstart\router\main.js
 */
const Router = require('koa-router')
let router = new Router()
const hwUserControl = require('../model/hwUserControl')
const cardControl = require('../model/cardControl')
const Joi = require('@hapi/joi');


/**
 * @description 硬件用户登录
 */
router.post('/hwUser/login/free', async (ctx, next) => {

    try {
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
    } catch (error) {
        throw error.message || error
    }

})


/**
 * @description 获取硬件用户列表
 */
router.get('/hwUser/list', async (ctx, next) => {

    let ret = await hwUserControl.getUserList()
    ctx.body = ret
})



//获取新的激活码
router.get('/card/list/create', async (ctx, next) => {
    try {
        const schema = Joi.object({
            type: Joi.string().required(),
        }).unknown()
        console.log(ctx.request.query)
        let checkRet = schema.validate(ctx.request.query)
        if (checkRet.error) {
            throw checkRet.error.message
        }
        let { number = 3, type } = ctx.request.query
        let ret = await cardControl.createCards({
            number,
            type
        })
        ctx.body = ret
    } catch (error) {
        ctx.body = {
            err: error.msg || error
        }
    }

})
//获取激活码列表
router.get('/card/list', async (ctx, next) => {
    try {

        let ret = await cardControl.getCardList()
        ctx.body = ret
    } catch (error) {
        ctx.body = {
            err: error.msg || error
        }
    }

})
//激活码绑定
router.post('/card/bind', async (ctx, next) => {

    try {
        const schema = Joi.object({
            cpuNumber: Joi.string().required(),
            hardDiskNumber: Joi.string().required(),
            secret: Joi.string().required(),
        }).unknown()
        console.log(ctx.request.body)
        let checkRet = schema.validate(ctx.request.body)
        if (checkRet.error) {
            throw checkRet.error.message
        }
        let { cpuNumber, hardDiskNumber, secret } = ctx.request.body
        let ret = await cardControl.bind({ cpuNumber, hardDiskNumber, secret })
        ctx.body = ret
    } catch (error) {

        ctx.body = {
            err: error.message || error
        }
    }
})
module.exports = router