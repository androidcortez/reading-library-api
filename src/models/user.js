"use strict";

const { DataTypes } = require("sequelize");
const { UserType } = require("./userType");
const db = require("../config/db");
const { generateEncryptedPassword } = require("../common/util");

const User = db.define(
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
      validate: {
        notNull: {
          msg: "The userTypeId cannot be null",
        },
        notEmpty: {
          msg: "The userTypeId is required",
        },
        isInt: {
          msg: "The userTypeId must be integer",
        },
      },
    },
    fullName: {
      type: DataTypes.STRING(150),
      field: "full_name",
      allowNull: false,
      validate: {
        notNull: {
          msg: "The fullName cannot be null",
        },
        notEmpty: {
          msg: "The fullName is required",
        },
        len: {
          args: [0, 150],
          msg: "The fullName must be maximun 150 characters",
        },
      },
    },
    username: {
      type: DataTypes.STRING(50),
      field: "username",
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "The username cannot be null",
        },
        notEmpty: {
          msg: "The username is required",
        },
        len: {
          args: [0, 50],
          msg: "The username must be maximun 50 characters",
        },
      },
    },
    email: {
      type: DataTypes.STRING(150),
      field: "email",
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "The email cannot be null",
        },
        notEmpty: {
          msg: "The email is required",
        },
        len: {
          args: [0, 150],
          msg: "The email must be maximun 150 characters",
        },
        isEmail: {
          msg: "The email is not valid",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      field: "password",
      allowNull: false,
      validate: {
        notNull: {
          msg: "The password cannot be null",
        },
        notEmpty: {
          msg: "The password is required",
        },
      },
    },
    status: {
      type: DataTypes.INTEGER,
      field: "status",
      allowNull: false,
      defaultValue: 1,
      validate: {
        isIn: {
          args: [[0, 1]],
          msg: "The status must be only 0 or 1",
        },
      },
    },
    createdBy: {
      type: DataTypes.STRING(50),
      field: "created_by",
      allowNull: false,
      defaultValue: "admin",
      validate: {
        len: {
          args: [0, 50],
          msg: "The created_by must be maximun 50 characters",
        },
      },
    },
    updatedBy: {
      type: DataTypes.STRING(50),
      field: "updated_by",
      allowNull: false,
      defaultValue: "admin",
      validate: {
        len: {
          args: [0, 50],
          msg: "The updated_by must be maximun 50 characters",
        },
      },
    },
  },
  {
    tableName: "Users",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

User.belongsTo(UserType, {
  foreignKey: "userTypeId",
});

//Generate encrypted password
const setPassword = async (user) => {
  if (user.changed("password")) {
    const password = await generateEncryptedPassword(user.password);
    user.password = password;
  }
};

//Hooks
User.beforeCreate(setPassword);
User.beforeUpdate(setPassword);

module.exports = {
  User,
};
