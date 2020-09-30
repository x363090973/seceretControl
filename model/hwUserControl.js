/*
 * @Date: 2020-03-06 17:06:33
 * @LastEditTime: 2020-07-01 09:47:43
 * @LastEditors: xiangjiacheng
 * @Description: In User Settings Edit
 * @FilePath: \koa-quickstart\model\hwUserControl.js
 */
"use strict";
const _ = require("lodash");
const HwUser = require("./basicClass/hwUser");
const HwUserList = require("./groupClass/hwUserList");
const moment = require("moment");
const CardList = require("./groupClass/cardList");
/**
 * @description 试用用户登录
 * @param  {Object}   data
 * @param  {string}   data.cpuNumber       cpu的序列号
 * @param  {string}   data.hardDiskNumber   硬盘的特征
 */
exports.loginByFree = async (data) => {
  let {
    cpuNumber,
    hardDiskNumber
  } = data;
  let hwUserList = await HwUserList.getInitData();
  let md5id = HwUser.buildId({
    cpuNumber,
    hardDiskNumber,
  });
  if (!hwUserList.idMap[md5id]) {
    let hwUser = new HwUser({
      cpuNumber,
      hardDiskNumber,
    });
    hwUserList.addHwUser(hwUser);
  }
  hwUserList.idMap[md5id].lastLoginTime = moment();
  await hwUserList.save();
  return hwUserList.idMap[md5id];
};

/**
 * @description 通过卡密登录
 * @param  {Object}   data
 * @param  {string}   data.cpuNumber       cpu的序列号
 * @param  {string}   data.hardDiskNumber   硬盘的特征
 * @param  {string}   data.secret   硬盘的特征
 */
exports.loginBySecert = async (data) => {
  let {
    cpuNumber,
    hardDiskNumber,
    secret
  } = data;
  let cardList = await CardList.getInitData();

  //1. 判断卡密是否存在
  if (!cardList.secretMap[secret]) {
    throw "卡密错误";
  }

  //2. 判断卡密与设备是否对应
  if (cardList.secretMap[secret].bindInfo.cpuNumber === cpuNumber && cardList.secretMap[secret].bindInfo.hardDiskNumber == hardDiskNumber) {
    return cardList.secretMap[secret];
  } else {
    throw "该设备跟卡密未绑定";
  }
};

/**
 * @description 获取用户列表
   @returns 
 */
exports.getUserList = async () => {
  let hwUserList = await HwUserList.getInitData();
  _.forEach(hwUserList.hwUserList, (h) => h.update());
  return hwUserList.hwUserList;
};

/**
 * @description 删除分组
 * @param  {Object}   data
 * @param  {string}   data.groupId       分组ID
   @returns 
 */
exports.deleteById = async (data) => {};

/**
 * @description 删除分组
 * @param  {Object}   data
 * @param  {string}   data.groupId       分组ID
   @returns 
 */
exports.getCardList = async (data) => {
  let cardList;
};