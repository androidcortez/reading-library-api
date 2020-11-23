"use strict";

const { DataTypes, QueryTypes } = require("sequelize");
const db = require("../config/db");
const { body } = require("express-validator");

const UserModel = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      name: "id",
      primaryKey: true,
      autoIncrement: true,
    },
    userTypeId: {
      type: DataTypes.INTEGER,
      field: "user_type_id",
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING(150),
      field: "full_name",
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(50),
      field: "username",
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(150),
      field: "email",
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      field: "password",
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      field: "status",
      allowNull: false,
      defaultValue: 1,
    },
    createdBy: {
      type: DataTypes.STRING(50),
      field: "created_by",
      allowNull: false,
      defaultValue: "admin",
    },
    updatedBy: {
      type: DataTypes.STRING(50),
      field: "updated_by",
      allowNull: false,
      defaultValue: "admin",
    },
  },
  {
    tableName: "Users",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

(async () => {
  await db.sync();
})();

//Generate encrypted password
const setPassword = async (user) => {
  if (user.changed("password")) {
    const result = await db.query("SELECT SHA1(?) as password", {
      replacements: [user.password],
      type: QueryTypes.SELECT,
    });
    user.password = result[0].password;
  }
};

//Hooks
UserModel.beforeCreate(setPassword);
UserModel.beforeUpdate(setPassword);

// validate if username already in use
function usernameIsUsed(username) {
  return UserModel.findOne({ where: { username } });
}

// validate if email already in use
function emailIsUsed(email) {
  return UserModel.findOne({ where: { email } });
}

const validatorSave = [
  body("userTypeId")
    .notEmpty()
    .withMessage("The userTypeId is required")
    .isInt()
    .withMessage("The userTypeId must be integer"),
  body("fullName")
    .notEmpty()
    .withMessage("The fullName is required")
    .isString()
    .withMessage("The fullName must be string")
    .isLength({ max: 150 })
    .withMessage("The fullName must be maximun 150 characters"),
  body("username")
    .notEmpty()
    .withMessage("The username is required")
    .isString()
    .withMessage("The username must be string")
    .isLength({ max: 50 })
    .withMessage("The username must be maximun 50 characters")
    .custom((value) => {
      return usernameIsUsed(value).then((user) => {
        if (user) {
          return Promise.reject("The username already in use");
        }
      });
    }),
  body("email")
    .notEmpty()
    .withMessage("The email is required")
    .isString()
    .withMessage("The email must be string")
    .isEmail()
    .withMessage("The email is not valid")
    .isLength({ max: 150 })
    .withMessage("The email must be maximun 150 characters")
    .custom((value) => {
      return emailIsUsed(value).then((email) => {
        if (email) {
          return Promise.reject("The email already in use");
        }
      });
    }),
  body("password")
    .notEmpty()
    .withMessage("The password is required")
    .isString()
    .withMessage("The password must be string")
    .isLength({ max: 200 })
    .withMessage("The password must be maximun 200 characters"),
  body("status")
    .optional()
    .isInt()
    .withMessage("The status must be integer")
    .isIn([0, 1])
    .withMessage("The status must be only 0 or 1"),
];

const validatorUpdate = [
  body("userTypeId")
    .optional()
    .notEmpty()
    .withMessage("The userTypeId is required")
    .isInt()
    .withMessage("The userTypeId must be integer"),
  body("fullName")
    .optional()
    .notEmpty()
    .withMessage("The fullName is required")
    .isString()
    .withMessage("The fullName must be string")
    .isLength({ max: 150 })
    .withMessage("The fullName must be maximun 150 characters"),
  body("username")
    .optional()
    .notEmpty()
    .withMessage("The username is required")
    .isString()
    .withMessage("The username must be string")
    .isLength({ max: 50 })
    .withMessage("The username must be maximun 50 characters")
    .custom((value) => {
      return usernameIsUsed(value).then((user) => {
        if (user) {
          return Promise.reject("The username already in use");
        }
      });
    }),
  body("email")
    .optional()
    .notEmpty()
    .withMessage("The email is required")
    .isString()
    .withMessage("The email must be string")
    .isEmail()
    .withMessage("The email is not valid")
    .isLength({ max: 150 })
    .withMessage("The email must be maximun 150 characters")
    .custom((value) => {
      return emailIsUsed(value).then((email) => {
        if (email) {
          return Promise.reject("The email already in use");
        }
      });
    }),
  body("password")
    .optional()
    .notEmpty()
    .withMessage("The password is required")
    .isString()
    .withMessage("The password must be string")
    .isLength({ max: 200 })
    .withMessage("The password must be maximun 200 characters"),
  body("status")
    .optional()
    .isInt()
    .withMessage("The status must be integer")
    .isIn([0, 1])
    .withMessage("The status must be only 0 or 1"),
];

module.exports = {
  UserModel,
  validatorSave,
  validatorUpdate,
};
