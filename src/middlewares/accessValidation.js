const { Unauthorized } = require("../common/errors");
const { PermissionType } = require("../models/permissionType");
const constants = require("../common/constants");

const accessValidation = async (req, res, next) => {
  if (req.decoded) {
    try {
      const permission = await PermissionType.findOne({
        where: {
          userTypeId: req.decoded.userTypeId,
          endpoint: req.route.path,
          method: req.method,
          status: constants.STATUS_CODE_ACTIVE,
        },
      });

      if (permission === null)
        throw new Unauthorized(
          "Your user is not authorized to access this endpoint"
        );

      next();
    } catch (err) {
      next(err);
    }
  }
};

module.exports = accessValidation;
