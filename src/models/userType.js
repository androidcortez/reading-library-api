"use strict";

const { DataTypes } = require("sequelize");
const db = require("../config/db");

const UserType = db.define(
  "UserType",
  {
    id: {
      type: DataTypes.INTEGER,
      name: "id",
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING(50),
      field: "type",
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "The type cannot be null",
        },
        notEmpty: {
          msg: "The type is required",
        },
        len: {
          args: [0, 50],
          msg: "The type must be maximun 50 characters",
        },
      },
    },
    description: {
      type: DataTypes.STRING(200),
      field: "description",
      allowNull: false,
      validate: {
        notNull: {
          msg: "The description cannot be null",
        },
        notEmpty: {
          msg: "The description is required",
        },
        len: {
          args: [0, 200],
          msg: "The description must be maximun 200 characters",
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
    tableName: "Users_Types",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = {
  UserType,
};
