/*
   @Description: 单个表格的基础数据类
 * @Date: 2020-03-06 17:06:33
 * @LastEditors: xiangjiacheng
 * @LastEditTime: 2020-07-01 14:26:35
 * @FilePath: \koa-quickstart\model\basicClass\card.js
 */
'use strict';
const _ = require('lodash');
const ObjectId = require('objectid');
const moment = require('moment')

/**
 * @description 基础元素:单个卡密对象
 */
module.exports = class Card {

    /**
     * @param {*} card 
     */
    constructor(card) {
        /**
         * @description 表格唯一ID
         *  */
        this._id = _.get(card, '_id', ObjectId().toHexString());

        /**@description 秘钥 */
        this.secret = _.get(card, 'secret', '')
        /**
         * @description 类型
         * day|week|month|quarter|year
         */
        this.type = _.get(card, 'type', '')

        /**
         * 系统生成时间
         */
        this.creatTime = _.get(card, 'creatTime', moment().toLocaleString())

        /**
         * @description 是否被激活
         */
        this.isActivated = _.get(card, 'isActivated', false)

        /**
         * @description 截止时间
         */
        this.deadline = _.get(card, 'deadline')

        /**
         * @description 剩余秒数
         */
        this.excessTime = _.get(card, 'excessTime', 0)


        /**
         * @description 是否已经过期
         *  */
        this.isExpired = this.isActivated ? moment().isAfter(this.deadline) : false

        /**
         * @description 绑定的地址
         **/
        this.bindInfo = _.get(card, 'bindInfo', {
            cpuNumber: '',
            hardDiskNumber: '',
            md5id: ''
        })
    }


    /**
     * 返回给前段的数据
     * @returns
     */
    toFront() {

    }


    /**
     * 返回支持被赋值的keys
     */
    static getSetKeys() {
        return ['name', 'tableList'];
    }

    /**
     * 有效期
     */
    get validity() {

        switch (this.type) {
            case 'day':
                return 1
            case 'week':
                return 7
            case 'month':
                return 30
            case 'quarter':
                return 90
            case 'year':
                return 365
            default:
                break;
        }

    }

};