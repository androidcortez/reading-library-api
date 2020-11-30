"use strict";

const { DataTypes } = require("sequelize");
const db = require("../config/db");

const PermissionType = db.define(
  "PermissionType",
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
      },
    },
    endpoint: {
      type: DataTypes.STRING(200),
      field: "endpoint",
      allowNull: false,
      validate: {
        notNull: {
          msg: "The endpoint cannot be null",
        },
        notEmpty: {
          msg: "The endpoint is required",
        },
        len: {
          args: [0, 200],
          msg: "The endpoint must be maximun 200 characters",
        },
      },
    },
    method: {
      type: DataTypes.STRING(10),
      field: "method",
      allowNull: false,
      validate: {
        notNull: {
          msg: "The method cannot be null",
        },
        notEmpty: {
          msg: "The method is required",
        },
        len: {
          args: [0, 10],
          msg: "The method must be maximun 10 characters",
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
    tableName: "Permissions_Types",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = {
  PermissionType,
};
