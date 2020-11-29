"use strict";

const { DataTypes } = require("sequelize");
const db = require("../config/db");

const UserFeedback = db.define(
  "UserFeedback",
  {
    id: {
      type: DataTypes.INTEGER,
      name: "id",
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
      allowNull: false,
      validate: {
        notNull: {
          msg: "The userId cannot be null",
        },
        notEmpty: {
          msg: "The userId is required",
        },
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      field: "book_id",
      allowNull: false,
      validate: {
        notNull: {
          msg: "The bookId cannot be null",
        },
        notEmpty: {
          msg: "The bookId is required",
        },
      },
    },
    comment: {
      type: DataTypes.STRING,
      field: "comment",
      allowNull: false,
      validate: {
        notNull: {
          msg: "The comment cannot be null",
        },
        notEmpty: {
          msg: "The comment is required",
        },
      },
    },
    score: {
      type: DataTypes.FLOAT,
      field: "score",
      allowNull: false,
      validate: {
        notNull: {
          msg: "The score cannot be null",
        },
        notEmpty: {
          msg: "The score is required",
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
    tableName: "Users_Feedback",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = {
  UserFeedback,
};
