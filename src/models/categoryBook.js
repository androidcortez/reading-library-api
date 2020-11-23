"use strict";

const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { body } = require("express-validator");

const CategoryBookModel = db.define(
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
    },
    categoryId: {
      type: DataTypes.INTEGER,
      field: "category_id",
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
    tableName: "Categories_Books",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

const validatorSave = [
  body("bookId")
    .notEmpty()
    .withMessage("The bookId is required")
    .isInt()
    .withMessage("The bookId must be integer"),
  body("categoryId")
    .notEmpty()
    .withMessage("The categoryId is required")
    .isInt()
    .withMessage("The categoryId must be integer"),
  body("status")
    .optional()
    .isInt()
    .withMessage("The status must be integer")
    .isIn([0, 1])
    .withMessage("The status must be only 0 or 1"),
];

const validatorUpdate = [
  body("bookId")
    .optional()
    .notEmpty()
    .withMessage("The bookId is required")
    .isInt()
    .withMessage("The bookId must be integer"),
  body("categoryId")
    .optional()
    .notEmpty()
    .withMessage("The categoryId is required")
    .isInt()
    .withMessage("The categoryId must be integer"),
  body("status")
    .optional()
    .isInt()
    .withMessage("The status must be integer")
    .isIn([0, 1])
    .withMessage("The status must be only 0 or 1"),
];

module.exports = {
  CategoryBookModel,
  validatorSave,
  validatorUpdate,
};
