/*
 * @Date: 2020-06-22 14:43:44
 * @LastEditors: xiangjiacheng
 * @LastEditTime: 2020-07-01 14:49:00
 * @FilePath: \koa-quickstart\router\main.js
 */
const Router = require("koa-router");
let router = new Router();
const hwUserControl = require("../model/hwUserControl");
const cardControl = require("../model/cardControl");
const Joi = require("@hapi/joi");
const {
  required
} = require("@hapi/joi");

//获取软件版本
router.post("/software/getVersion", async (ctx, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
    }).unknown();
    let checkRet = schema.validate(ctx.request.body);
    if (checkRet.error) {
      throw checkRet.error.message;
    }
    let {
      name
    } = ctx.request.body;

    let softwareVersionList = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '../data/softwareVersion.json'), 'utf8'))

    let ret = softwareVersionList.find(e => e.name === name)
    if (ret) {
      ctx.body = {
        status: "success",
        data: ret
      };
    } else {
      ctx.body = {
        status: "fail",
        msg: "不存在该软件",
      };
    }

  } catch (error) {
    ctx.body = {
      status: "fail",
      msg: error.message || error,
    };
  }
});


/**
 * @description 硬件用户登录
 */
router.post("/hwUser/login/free", async (ctx, next) => {
  try {
    const schema = Joi.object({
      cpuNumber: Joi.string().required(),
      hardDiskNumber: Joi.string().required(),
    }).unknown();
    console.log(ctx.request.body);
    let checkRet = schema.validate(ctx.request.body);
    if (checkRet.error) {
      throw checkRet.error.message;
    }
    let {
      cpuNumber,
      hardDiskNumber
    } = ctx.request.body;
    let ret = await hwUserControl.loginByFree({
      cpuNumber,
      hardDiskNumber,
    });
    ctx.body = {
      status: "success",
      data: ret,
    };
  } catch (error) {
    ctx.body = {
      status: "fail",
      msg: error.message || error,
    };
  }
});

/**
 * @description 硬件用户登录
 */
router.post("/hwUser/loginBySecert", async (ctx, next) => {
  try {
    const schema = Joi.object({
      cpuNumber: Joi.string().required(),
      hardDiskNumber: Joi.string().required(),
      secret: Joi.string().required(),
    }).unknown();
    console.log(ctx.request.body);
    let checkRet = schema.validate(ctx.request.body);
    if (checkRet.error) {
      throw checkRet.error.message;
    }
    let {
      cpuNumber,
      hardDiskNumber,
      secret
    } = ctx.request.body;
    let ret = await hwUserControl.loginBySecert({
      cpuNumber,
      hardDiskNumber,
      secret,
    });
    ctx.body = {
      status: "success",
      data: ret,
    };
  } catch (error) {
    ctx.body = {
      status: "fail",
      msg: error.message || error,
    };
  }
});
/**
 * @description 获取硬件用户列表
 */
router.get("/hwUser/list", async (ctx, next) => {
  let ret = await hwUserControl.getUserList();
  ctx.body = ret;
});

//获取新的激活码
router.get("/card/list/create", async (ctx, next) => {
  try {
    const schema = Joi.object({
      type: Joi.string().required(),
    }).unknown();
    console.log(ctx.request.query);
    let checkRet = schema.validate(ctx.request.query);
    if (checkRet.error) {
      throw checkRet.error.message;
    }
    let {
      number = 3, type
    } = ctx.request.query;
    let ret = await cardControl.createCards({
      number,
      type,
    });
    ctx.body = ret;
  } catch (error) {
    ctx.body = {
      err: error.msg || error,
    };
  }
});
//获取激活码列表
router.get("/card/list", async (ctx, next) => {
  try {
    let ret = await cardControl.getCardList();
    ctx.body = {
      status: "success",
      data: ret,
    };
  } catch (error) {
    ctx.body = {
      status: "fail",
      msg: error.message || error,
    };
  }
});
//激活码绑定
router.post("/card/bind", async (ctx, next) => {
  try {
    const schema = Joi.object({
      cpuNumber: Joi.string().required(),
      hardDiskNumber: Joi.string().required(),
      secret: Joi.string().required(),
    }).unknown();
    console.log(ctx.request.body);
    let checkRet = schema.validate(ctx.request.body);
    if (checkRet.error) {
      throw checkRet.error.message;
    }
    let {
      cpuNumber,
      hardDiskNumber,
      secret
    } = ctx.request.body;
    let ret = await cardControl.bind({
      cpuNumber,
      hardDiskNumber,
      secret,
    });
    ctx.body = {
      status: "success",
      data: ret
    };
  } catch (error) {
    ctx.body = {
      status: "fail",
      msg: error.message || error,
    };
  }
});

//激活码解绑
router.post("/card/unBind", async (ctx, next) => {
  try {
    const schema = Joi.object({
      cpuNumber: Joi.string().required(),
      hardDiskNumber: Joi.string().required(),
      secret: Joi.string().required(),
    }).unknown();
    console.log(ctx.request.body);
    let checkRet = schema.validate(ctx.request.body);
    if (checkRet.error) {
      throw checkRet.error.message;
    }
    let {
      cpuNumber,
      hardDiskNumber,
      secret
    } = ctx.request.body;
    await cardControl.unBind({
      cpuNumber,
      hardDiskNumber,
      secret,
    });
    ctx.body = {
      status: "success",
    };
  } catch (error) {
    ctx.body = {
      status: "fail",
      msg: error.message || error,
    };
  }
});

module.exports = router;