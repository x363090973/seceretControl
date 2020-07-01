/*
 * @Date: 2020-03-06 17:06:33
 * @LastEditTime: 2020-07-01 14:59:01
 * @LastEditors: xiangjiacheng
 * @Description: In User Settings Edit
 * @FilePath: \koa-quickstart\model\cardControl.js
 */
'use strict';
const _ = require('lodash');
const Card = require('./basicClass/card');
const CardList = require('./groupClass/cardList');
const HwUserList = require('./groupClass/hwUserList');
const HwUser = require('./basicClass/hwUser');
const moment = require('moment')

/**
 * @description 生成card
 * @param  {Object}   data
 * @param  {number}   data.number       数量
 * @param  {string}   data.type       分组名称
 */
exports.createCards = async (data) => {
    let { number, type } = data
    let cardList = await CardList.getInitData();
    let str = `${type}_${new Date().getTime()}_${Math.floor(Math.random()*100)}`;
    let cards = [];
    for (let index = 0; index < number; index++) {
        let card = new Card({ type })
        str += index
        card.secret = cardList.aseEncode(str)
        cardList.addCard(card);
        cards.push(card)
    }
    await cardList.save()
    return cards
};

/**
 * @description 获取秘钥列表
 */
exports.getCardList = async () => {

    let cardList = await CardList.getInitData();

    return cardList.cardList
};


/**
 * @description 绑定秘钥
 * @param  {Object}   data
 * @param  {string}   data.cpuNumber       cpu编号
 * @param  {string}   data.hardDiskNumber       硬盘编号
 * @param  {string}   data.secret       秘钥编号
 */
exports.bind = async (data) => {
    let { cpuNumber, hardDiskNumber, secret } = data
    let cardList = await CardList.getInitData();
    let hwUserList = await HwUserList.getInitData();
    let md5id = HwUser.buildId({ cpuNumber, hardDiskNumber })
    if (!cardList.secretMap[secret]) {
        throw '秘钥错误不存在'
    }
    if (cardList.secretMap[secret].isActivated) {
        throw '该秘钥已经被激活'
    }
    cardList.secretMap[secret].bindInfo = {
        cpuNumber,
        hardDiskNumber,
        md5id
    }

    cardList.secretMap[secret].isActivated = true;
    console.log('cardList.secretMap[secret] ===================>', cardList.secretMap[secret])
    let str = cardList.aseDecode(secret)
    let type = str.split('_')[0]

    hwUserList.idMap[md5id].deedline = moment(hwUserList.idMap[md5id].deedline).isAfter(moment()) ? // @ts-ignore
        moment(hwUserList.idMap[md5id].deedline).add(1, type + 's').format('YYYY-MM-DD hh:mm:ss') : // @ts-ignore
        moment().add(1, type + 's').format('YYYY-MM-DD hh:mm:ss')
    hwUserList.idMap[md5id] = hwUserList.idMap[md5id].update()

    cardList.save();
    hwUserList.save()
    return hwUserList.idMap[md5id]
};


/**
 * @description 删除分组
 * @param  {Object}   data
 * @param  {string}   data.groupId       分组ID
   @returns 
 */
exports.deleteById = async (data) => {

};