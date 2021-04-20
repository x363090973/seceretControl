/*
 * 硬件用户管理
 * @Date: 2020-03-17 15:59:52
 * @LastEditors: xiangjiacheng
 * @LastEditTime: 2020-06-30 18:06:07
 * @FilePath: \koa-quickstart\model\groupClass\teamList.js
 */

'use strict';
const _ = require('lodash');
const OSS_PATH_PREFIX = require('../modelConstant').OSS_PATH_PREFIX
const {Team,Member} = require('../basicClass/team')
const path = require('path');
const fs = require('fs');
const moment = require('moment')
const ObjectId = require('objectid');
/**
 * 集合模块:唯一硬件使用者
 */
module.exports = class TeamList {
    constructor() {
        /**
         * @description  
         * @type {Array<Team>}
         * @public
         */
        this.teamList = [];
        this.dataSavePathName = 'TeamList';
        /**
         *  @type {Object.<string, Team>}
         */
        this.idMap = {}

    }

    /**
     * @description OSS存储数据 
     */
    get _saveData() {
        return _.pick(this, ['teamList']);
    }


    /**
     * @description OSS存储地址
     */
    get _dataSavePath() {
        return path.join(__dirname, `../../data/${this.dataSavePathName}.json`);
    }

    /**
     * @returns {Promise<TeamList>}
     */
    static async getInitData() {
        let teamList = new TeamList()
        teamList.initData()
        return teamList
    }


    /**初始化数据并生成goods跟material的MAP结构 */
    async initData() {
        //获取储存的json数据
        let jsonData;
        if (fs.existsSync(this._dataSavePath)) {
            jsonData = JSON.parse(fs.readFileSync(this._dataSavePath, 'utf8'))
        } else {
            jsonData = {
                teamList: []
            }
        }
        _.assign(this, jsonData);
        this._makeMapData()
    }

    /**
     * @description 将数据展开 
     */
    _makeMapData() {
        this.idMap = {};
        this.teamList = _.map(this.teamList, u => new Team(u))
        _.map(this.teamList, u => {
            this.idMap[u.id] = u;
        })
    }




    /**
     * @returns {Promise<void>}
     */
    async save() {
        fs.writeFileSync(this._dataSavePath, JSON.stringify(this._saveData))
    }


    /**
     * @param {Team} team 
     */
  

    /**
     * 添加一个成员
     * @param {number} memberNum 
     * @param {string} type 
     * @param {number} buildupTimeout 
     */
    addMember(memberNum,type,buildupTimeout,headIndex){
        let team =  this.teamList.find(e => e.memberNum == memberNum && e.type ==type && e.status ==1)
        if(team){
            team.memberList.push(new Member({
                
            }))
            if(team.memberList.length == team.memberNum){
                team.status = 2
            }
        }else{
            let newTeam = new Team({
                type:type,
                buildupTimeout,
                memberNum,
                headIndex,
            })
            this.teamList.push(team)
            this.idMap[team.id] = team
            newTeam.memberList.push(ObjectId().toHexString())
        }
    }

    getTeamInfo(teamId,memberId){
        let team = this.idMap[teamId]
        if(!team) {
            throw '没有找到队伍'
        }
    }
};