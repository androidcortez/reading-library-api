"use strict";

const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Book = db.define(
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
      validate: {
        notNull: {
          msg: "The title cannot be null",
        },
        notEmpty: {
          msg: "The title is required",
        },
        len: {
          args: [0, 200],
          msg: "The title must be maximun 200 characters",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      field: "description",
      allowNull: false,
      validate: {
        notNull: {
          msg: "The description cannot be null",
        },
        notEmpty: {
          msg: "The description is required",
        },
      },
    },
    author: {
      type: DataTypes.STRING(150),
      field: "author",
      allowNull: false,
      validate: {
        notNull: {
          msg: "The author cannot be null",
        },
        notEmpty: {
          msg: "The author is required",
        },
        len: {
          args: [0, 150],
          msg: "The author must be maximun 150 characters",
        },
      },
    },
    publicationDate: {
      type: DataTypes.DATEONLY,
      field: "publication_date",
      allowNull: false,
      validate: {
        notNull: {
          msg: "The publicationDate cannot be null",
        },
        notEmpty: {
          msg: "The publicationDate is required",
        },
        isDate: {
          msg:
            "The publicationData is not valid, the format must be YYYY-MM-DD",
        },
      },
    },
    numberOfPages: {
      type: DataTypes.INTEGER,
      field: "number_of_pages",
      allowNull: false,
      validate: {
        notNull: {
          msg: "The numberOfPages cannot be null",
        },
        notEmpty: {
          msg: "The numberOfPages is required",
        },
        isInt: {
          msg: "The numberOfPages must be integer",
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
    tableName: "Books",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = {
  Book,
};
