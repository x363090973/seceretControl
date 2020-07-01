/*
 * 分组的分组管理列表
 * @Date: 2020-03-17 15:59:52
 * @LastEditors: xiangjiacheng
 * @LastEditTime: 2020-07-01 14:33:54
 * @FilePath: \koa-quickstart\model\groupClass\cardList.js
 */

'use strict';
const _ = require('lodash');
const OSS_PATH_PREFIX = require('../modelConstant').OSS_PATH_PREFIX
const Card = require('../basicClass/card')
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const moment = require('moment')

/**
 * 集合模块:卡密管理
 */
module.exports = class CardList {
    constructor() {
        /**
         * @description  卡密列表
         * @type {Array<Card>}
         * @public
         */
        this.cardList = [];

        this.dataSavePathName = 'cardList'
        /**
         * @description 过期的卡密
         */
        this.expiredCardList = [];
        /**
         * @description 使用中的卡密
         */
        this.useCardList = [];
        /**
         * @description  秘钥的MAP
         *  @type {Object.<string, Card>}
         */
        this.secretMap = {}
        this.secretkey = 'zhangchi'
    }

    /**
     * @description 
     * @type {Array<Card>}
     */
    get newCardList() {
        return this.cardList.filter(c => !c.isActivated)
    }



    /**
     * @description OSS存储数据 
     */
    get _saveData() {
        return _.pick(this, ['cardList']);
    }


    /**
     * @description OSS存储地址
     */
    get _dataSavePath() {
        return path.join(__dirname, `../../data/${this.dataSavePathName}.json`);
    }

    /**
     * @returns {Promise<CardList>}
     */
    static async getInitData() {
        let cardList = new CardList()
        cardList.initData()
        return cardList
    }


    /**初始化数据并生成goods跟material的MAP结构 */
    async initData() {
        //获取储存的json数据
        let jsonData;
        if (fs.existsSync(this._dataSavePath)) {
            jsonData = JSON.parse(fs.readFileSync(this._dataSavePath, 'utf8'))
        } else {
            jsonData = {
                cardList: []
            }
        }
        _.assign(this, jsonData);
        this._makeMapData()
    }

    /**
     * @description 将数据展开 
     */
    _makeMapData() {
        this.cardList = _.map(this.cardList, c => new Card(c))
        _.map(this.cardList, c => this.secretMap[c.secret] = c)
        //过滤一个月之前产生但是没有激活的卡
        this.cardList = this.cardList.filter(c => moment(c.creatTime).isAfter(moment().subtract(2, 'month')) || !c.isExpired)
    }


    /**
     * @returns {Promise<void>}
     */
    async save() {
        fs.writeFileSync(this._dataSavePath, JSON.stringify(this._saveData))
    }


    /**
     * @param {Card} card 
     */
    addCard(card) {
        this.cardList.push(card)
    }


    /**
     * @description 加密算法
     * @param {*} data 加密字符串 
     * @returns 返回一个卡密 
     */
    aseEncode(data) {

        // 如下方法使用指定的算法与密码来创建cipher对象
        const cipher = crypto.createCipher('aes192', this.secretkey);

        // 使用该对象的update方法来指定需要被加密的数据
        let crypted = cipher.update(data, 'utf-8', 'hex').toString();

        crypted += cipher.final('hex');

        return crypted;
    };


    /**
     * @description 解密算法
     * @param {*} data 解密字符串
     * @returns 解密字符串 
     */
    aseDecode(data) {
        /* 
         该方法使用指定的算法与密码来创建 decipher对象, 第一个算法必须与加密数据时所使用的算法保持一致;
         第二个参数用于指定解密时所使用的密码，其参数值为一个二进制格式的字符串或一个Buffer对象，该密码同样必须与加密该数据时所使用的密码保持一致
        */
        const decipher = crypto.createDecipher('aes192', this.secretkey);

        /*
         第一个参数为一个Buffer对象或一个字符串，用于指定需要被解密的数据
         第二个参数用于指定被解密数据所使用的编码格式，可指定的参数值为 'hex', 'binary', 'base64'等，
         第三个参数用于指定输出解密数据时使用的编码格式，可选参数值为 'utf-8', 'ascii' 或 'binary';
        */
        let decrypted = decipher.update(data, 'hex', 'utf-8').toString();

        decrypted += decipher.final('utf-8');
        return decrypted;
    };

};