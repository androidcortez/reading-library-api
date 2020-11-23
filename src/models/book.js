"use strict";

const { DataTypes } = require("sequelize");
const db = require("../config/db");
const { body } = require("express-validator");

const BookModel = db.define(
  "Book",
  {
    id: {
      type: DataTypes.INTEGER,
      name: "id",
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(200),
      field: "title",
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      field: "description",
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(150),
      field: "author",
      allowNull: false,
    },
    publicationDate: {
      type: DataTypes.DATEONLY,
      field: "publication_date",
      allowNull: false,
    },
    numberOfPages: {
      type: DataTypes.INTEGER,
      field: "number_of_pages",
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
    tableName: "Books",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Validate field before insert to database
const validatorSave = [
  body("title")
    .notEmpty()
    .withMessage("The title is required")
    .isString()
    .withMessage("The title must be string")
    .isLength({ max: 200 })
    .withMessage("The title must have maximun 200 characters"),
  body("description")
    .notEmpty()
    .withMessage("The description is required")
    .isString()
    .withMessage("The description must be string"),
  body("author")
    .notEmpty()
    .withMessage("The author is required")
    .isString()
    .withMessage("The author must be string")
    .isLength({ max: 150 })
    .withMessage("The autor must have maximun 150 characters"),
  body("publicationDate")
    .notEmpty()
    .withMessage("The publicationDate is required"),
  body("numberOfPages")
    .notEmpty()
    .withMessage("The numberOfPages is required")
    .isInt()
    .withMessage("The numberOfPages must be integer"),
];

// Validate fields before update the database
const validatorUpdate = [
  body("title")
    .optional()
    .notEmpty()
    .withMessage("The title is required")
    .isString()
    .withMessage("The title must be string")
    .isLength({ max: 200 })
    .withMessage("The title must have maximun 200 characters"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("The description is required")
    .isString()
    .withMessage("The description must be string"),
  body("author")
    .optional()
    .notEmpty()
    .withMessage("The author is required")
    .isString()
    .withMessage("The author must be string")
    .isLength({ max: 150 })
    .withMessage("The autor must have maximun 150 characters"),
  body("publicationDate")
    .optional()
    .notEmpty()
    .withMessage("The publicationDate is required"),
  body("numberOfPages")
    .optional()
    .notEmpty()
    .withMessage("The numberOfPages is required")
    .isInt()
    .withMessage("The numberOfPages must be integer"),
];

module.exports = {
  BookModel,
  validatorSave,
  validatorUpdate,
};
