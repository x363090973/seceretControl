/*
 * @Date: 2020-03-06 17:06:33
 * @LastEditTime: 2020-06-30 17:52:23
 * @LastEditors: xiangjiacheng
 * @Description: In User Settings Edit
 * @FilePath: \koa-quickstart\model\hwUserControl.js
 */
'use strict';
const _ = require('lodash');
const HwUser = require('./basicClass/hwUser');
const HwUserList = require('./groupClass/hwUserList');
const moment = require('moment')
/**
 * @description 试用用户登录
 * @param  {Object}   data
 * @param  {string}   data.cpuNumber       cpu的序列号
 * @param  {string}   data.hardDiskNumber   硬盘的特征
 */
exports.loginByFree = async (data) => {
    let { cpuNumber, hardDiskNumber } = data;
    let hwUserList = await HwUserList.getInitData();
    let md5id = HwUser.buildId({ cpuNumber, hardDiskNumber })
    if (!hwUserList.idMap[md5id]) {
        let hwUser = new HwUser({ cpuNumber, hardDiskNumber })
        hwUserList.addHwUser(hwUser)
    }
    hwUserList.idMap[md5id].lastLoginTime = moment()
    await hwUserList.save()
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

/**
 * @description 删除分组
 * @param  {Object}   data
 * @param  {string}   data.groupId       分组ID
   @returns 
 */
exports.getCardList = async (data) => {
    let cardList
};