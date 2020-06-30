/*
 * 硬件用户管理
 * @Date: 2020-03-17 15:59:52
 * @LastEditors: xiangjiacheng
 * @LastEditTime: 2020-06-30 18:06:07
 * @FilePath: \koa-quickstart\model\groupClass\hwUserList.js
 */

'use strict';
const _ = require('lodash');
const OSS_PATH_PREFIX = require('../modelConstant').OSS_PATH_PREFIX
const HwUser = require('../basicClass/hwUser')
const path = require('path');
const fs = require('fs');


/**
 * 集合模块:唯一硬件使用者
 */
module.exports = class HwUserList {
    constructor() {
        /**
         * @description  
         * @type {Array<HwUser>}
         * @public
         */
        this.hwUserList = [];
        this.dataSavePathName = 'hwUserList';
        /**
         *  @type {Object.<string, HwUser>}
         */
        this.idMap = {}

    }

    /**
     * @description OSS存储数据 
     */
    get _saveData() {
        return _.pick(this, ['hwUserList']);
    }


    /**
     * @description OSS存储地址
     */
    get _dataSavePath() {
        return path.join(__dirname, `../../data/${this.dataSavePathName}.json`);
    }

    /**
     * @returns {Promise<HwUserList>}
     */
    static async getInitData() {
        let hwUserList = new HwUserList()
        hwUserList.initData()
        return hwUserList
    }


    /**初始化数据并生成goods跟material的MAP结构 */
    async initData() {
        //获取储存的json数据
        let jsonData;
        if (fs.existsSync(this._dataSavePath)) {
            jsonData = JSON.parse(fs.readFileSync(this._dataSavePath, 'utf8'))
        } else {
            jsonData = {
                hwUserList: []
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
        this.hwUserList = _.map(this.hwUserList, u => new HwUser(u))
        _.map(this.hwUserList, u => {
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
     * @param {HwUser} hwUser 
     */
    addHwUser(hwUser) {
        this.hwUserList.push(hwUser)
        this.idMap[hwUser.id] = hwUser
    }

    /**
     * @description 获取用户信息
     * @returns 
     */
    getUerinfoByID(id) {
        if (!this.idMap[id]) {

        }
        return this.idMap[id]
    }



};