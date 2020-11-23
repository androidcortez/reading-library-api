"use strict";

const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { body } = require("express-validator");

const CategoryModel = db.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      name: "id",
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(150),
      field: "name",
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
    tableName: "Categories",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

(async () => {
  await db.sync();
})();

const validatorSave = [
  body("name")
    .notEmpty()
    .withMessage("The name is required")
    .isString()
    .withMessage("The name must be string")
    .isLength({ max: 150 })
    .withMessage("The name must have maximun 150 characters"),
  body("status")
    .optional()
    .isInt()
    .withMessage("The status must be integer")
    .isIn([0, 1])
    .withMessage("The status must be only 0 or 1"),
];

const validatorUpdate = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("The name is required")
    .isString()
    .withMessage("The name must be string")
    .isLength({ max: 150 })
    .withMessage("The name must have maximun 150 characters"),
  body("status")
    .optional()
    .isInt()
    .withMessage("The status must be integer")
    .isIn([0, 1])
    .withMessage("The status must be only 0 or 1"),
];

module.exports = {
  CategoryModel,
  validatorSave,
  validatorUpdate,
};