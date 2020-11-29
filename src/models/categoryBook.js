"use strict";

const { DataTypes } = require("sequelize");
const db = require("../config/db");

const CategoryBook = db.define(
  "CategoryBook",
  {
    id: {
      type: DataTypes.INTEGER,
      name: "id",
      primaryKey: true,
      autoIncrement: true,
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
        isInt: {
          msg: "The bookId must be integer",
        },
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      field: "category_id",
      allowNull: false,
      validate: {
        notNull: {
          msg: "The categoryId cannot be null",
        },
        notEmpty: {
          msg: "The categoryId is required",
        },
        isInt: {
          msg: "The categoryId must be integer",
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
    tableName: "Categories_Books",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = {
  CategoryBook,
};
