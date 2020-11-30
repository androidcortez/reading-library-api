"use strict";

const { Op } = require("sequelize");

const { User } = require("../models/user");
const { UserType } = require("../models/userType");
const { BadRequest, Unauthorized } = require("../common/errors");
const Util = require("../common/util");
const constants = require("../common/constants");

async function login(req, res, next) {
  try {
    let { username, password } = req.body;

    if (!username || !password) {
      throw new BadRequest("username and password are required");
    }

    password = await Util.generateEncryptedPassword(password);

    //check authentication by username or email, password and status active
    const user = await User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        [Op.or]: [{ username }, { email: username }],
        password,
        status: constants.STATUS_CODE_ACTIVE,
      },
      include: { model: UserType, attributes: ["type"] },
    });

    if (user === null) {
      throw new Unauthorized("Wrong username or password");
    }

    user.dataValues["token"] = Util.generateAccessToken({
      username: user.username,
      userTypeId: user.userTypeId,
      type: user.UserType.type,
    });

    res.json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  login,
};
