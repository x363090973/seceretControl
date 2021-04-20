const _ = require('lodash');
const ObjectId = require('objectid');
const moment = require('moment')

 class Member {
    constructor(Member){
        /**
         * @description team唯一ID
         *  */
        this.id = _.get(Member, 'id', ObjectId().toHexString());
        /**
        * @description team成员数量
        *  */
        this.headIndex = _.get(Member, 'headIndex', 2);
        /**
         * @description 成员信息
         */
        this.memberInfo = _.get(Member, 'memberInfo', {});

        this.isHead = _.get(Member, 'isHead', false)
    }
}


module.exports.Member = Member

/**
 * @description 
 */
 module.exports.Team  = class Team {

    /**
     * @param {*} team 
     */
    constructor(team) {
        /**
         * @description team唯一ID
         *  */
        this.id = _.get(team, 'id', ObjectId().toHexString());
        /**
         * @description team成员数量
         *  */
        this.memberNum = _.get(team, 'memberNum', 0);
        /**队伍成员 
         *  @type {Array<Member>}
        */
        this.memberList = _.get(team, 'memberList', [])
        /**队伍类型,区分各个项目的队伍 */
        this.type = _.get(team, 'type', 'common')
        /**集结开始时间 */
        this.buildupStartTime =_.get(team, 'buildupStartTime', new Date())
        /**集结超时时间 */
        this.buildupTimeout =_.toNumber(_.get(team, 'buildupTimeout', 10))
        /**集结状态1.集结中 2. 满员 */
        this.status = _.get(team, 'status', 1) //1.集结中 2. 满员
        /**队长 */
        this.header = _.get(team, 'header', '')
        /**团队共享信息 */
        this.teamInfo = _.get(team, 'teamInfo', {})
    }


  

};


  