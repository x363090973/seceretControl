/*
   @Description: 单个表格的基础数据类
 * @Date: 2020-03-06 17:06:33
 * @LastEditors: xiangjiacheng
 * @LastEditTime: 2020-07-01 14:51:17
 * @FilePath: \koa-quickstart\model\basicClass\hwUser.js
 */
'use strict';
const _ = require('lodash');
const moment = require('moment')
const Joi = require('@hapi/joi');
const md5 = require('md5');

/**
 * @description 基础元素:单个卡密对象
 */
module.exports = class HwUser {

    /**
     * @param {*} user 
     */
    constructor(user) {


        /**@description 易语言的系统取硬盘特征 */
        this.hardDiskNumber = _.get(user, 'hardDiskNumber', '')

        /**@description  */
        this.cpuNumber = _.get(user, 'cpuNumber', '')

        /**根据硬件信息生成的MD5ID */
        this.id = HwUser.buildId(this)

        /**最后登陆时间 */
        this.lastLoginTime = _.get(user, 'lastLoginTime', '')

        /**到期时间 */
        this.deadline = _.get(user, 'deadline', moment().format('YYYY-MM-DD hh:mm:ss'))
        /**是否试用用户 */
        this.isTrialUser = _.get(user, 'isTrialUser', true)

        /**剩余时间 秒 */
        this.excessTime = 0

        if (this.isTrialUser) {
            this.deadline = moment().add(1, 'd').format('YYYY-MM-DD hh:mm:ss')
            this.isTrialUser = false
        }
        this.excessTime = moment(this.deadline).diff(moment(), 's')

        this.canUse = this.excessTime > 0
    }


    /**更新状态
     * @returns {HwUser}
     */
    update() {
        /**剩余时间 秒 */
        this.excessTime = 0
        this.excessTime = moment(this.deadline).diff(moment(), 's')
        this.canUse = this.excessTime > 0
        return this
    }


    /**
     * @param {any} hwUser 
     */
    static buildId(hwUser) {
        //过滤出对象属性
        let obj = _.pick(hwUser, ['hardDiskNumber', 'cpuNumber']);
        let keys = _.orderBy(_.keys(_.pickBy(obj, v => !_.isEmpty(v))));
        let str = _.map(keys, k => _.get(obj, k)).join('_');
        return md5(str);
    }

};