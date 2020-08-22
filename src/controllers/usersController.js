const users = require("../models/users");
const { validationResult } = require("express-validator");

function index(req, res) {
  users
    .getAll()
    .then((users) => {
      res.json({
        error: false,
        type: null,
        data: users,
      });
    })
    .catch((err) => {
      res.status(500);
      res.json({ error: true, type: err.code, data: err.sqlMessage });
    });
}

function show(req, res) {
  users
    .getById(req.params.id)
    .then((user) => {
      res.json({
        error: false,
        type: null,
        data: user ? user : [],
      });
    })
    .catch((err) => {
      res.status(500);
      res.json({ error: true, type: err.code, data: err.sqlMessage });
    });
}

function create(req, res) {
  //validate fields from request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: true,
      type: "UNPROCESSABLE_ENTITY",
      data: errors.array(),
    });
  }

  users
    .create(req.body)
    .then((user) => {
      res.json({
        error: false,
        type: null,
        data: user ? user : [],
      });
    })
    .catch((err) => {
      res.status(500);
      res.json({ error: true, type: err.code, data: err.sqlMessage });
    });
}

function update(req, res) {
  //validate fields from request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: true,
      type: "UNPROCESSABLE_ENTITY",
      data: errors.array(),
    });
  }

  users
    .update(req.params.id, req.body)
    .then((user) => {
      res.json({
        error: false,
        type: null,
        data: user ? user : [],
      });
    })
    .catch((err) => {
      res.status(500);
      res.json({ error: true, type: err.code, data: err.sqlMessage });
    });
}

function remove(req, res) {
  users
    .remove(req.params.id)
    .then((user) => {
      res.json({
        error: false,
        type: null,
        data: user ? user : [],
      });
    })
    .catch((err) => {
      res.status(500);
      res.json({ error: true, type: err.code, data: err.sqlMessage });
    });
}

module.exports = {
  index,
  show,
  create,
  update,
  remove,
  validatorSave: users.validatorSave,
  validatorUpdate: users.validatorUpdate,
};
