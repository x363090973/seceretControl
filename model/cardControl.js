/*
 * @Date: 2020-03-06 17:06:33
 * @LastEditTime: 2020-06-23 18:57:06
 * @LastEditors: xiangjiacheng
 * @Description: In User Settings Edit
 * @FilePath: \koa-quickstart\model\cardControl.js
 */
'use strict';
const _ = require('lodash');
const Card = require('./basicClass/card');
const CardList = require('./groupClass/cardList');


/**
 * @description 生成card
 * @param  {Object}   data
 * @param  {number}   data.number       数量
 * @param  {string}   data.type       分组名称

 */
exports.crateCard = async (data) => {
    let { number, type } = data
    let cardList = await CardList.getInitData();
    let str = `${type}_${new Date().getTime()}_${Math.floor(Math.random()*100)}`
    for (let index = 0; index < number; index++) {
        let card = new Card({ type })
        str += index
        card.secret = cardList.aseEncode(str)
        cardList.addCard(card)
    }
    await cardList.save()
};


/**
 * @description 删除分组
 * @param  {Object}   data
 * @param  {string}   data.groupId       分组ID
   @returns 
 */
exports.deleteById = async (data) => {

};

/**
 * @description 删除分组
 * @param  {Object}   data
 * @param  {string}   data.groupId       分组ID
   @returns 
 */
exports.getCardList = async (data) => {
    let cardList
};