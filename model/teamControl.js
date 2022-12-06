/*
 * @Date: 2020-03-06 17:06:33
 * @LastEditTime: 2020-07-01 09:47:43
 * @LastEditors: xiangjiacheng
 * @Description: In User Settings Edit
 * @FilePath: \koa-quickstart\model\hwUserControl.js
 */
"use strict";
const _ = require("lodash");

const moment = require("moment");
const TeamList = require("./groupClass/teamList");
const Team = require("./basicClass/team");
/**
 * @description 申请队伍
 * @param  {Object}   data
 * @param  {number}   data.memberNum      队员数量
 * @param  {string}   data.type   队伍类型
 * @param  {number}   data.buildupTimeout   集结超时时间
 * @param  {number}   data.headIndex   队长次序
 */
exports.applyTeam = async (data) => {
  let {
    memberNum,
    type,
    buildupTimeout,
    headIndex
  } = data;
  let teamList = await TeamList.getInitData();  
  teamList.addMember(memberNum,type,buildupTimeout,headIndex)
};


/**
 * @description 获取队伍信息
 * @param  {Object}   data
 * @param  {string}   data.teamId      队伍ID
 * @param  {string}   data.memberId      成员ID
 */
exports.getTeamInfo = async (data) => {
  let {
    teamId,
    memberId,
  } = data;
  let teamList = await TeamList.getInitData();  
  teamList.getTeamInfo(teamId,memberId)
  
};


/** 
 * @description 获取队伍信息
 * @param  {Object}   data
 * @param  {string}   data.teamId      队伍ID
 * @param  {string}   data.memberId      成员ID
 */
 exports.updateMemberInfo = async (data) => {
  let {
    teamId,
    memberId,
  } = data;
  let teamList = await TeamList.getInitData();  
  teamList.getTeamInfo(teamId,memberId)
 
};