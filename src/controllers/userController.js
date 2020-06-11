const usersModel = require("../models/users");

function index(req, res) {
  res.json(usersModel.getAll());
}

function show(req, res) {
    res.json(usersModel.getById());
}

function create(req, res) {
    res.json(usersModel.create());
}

function update(req, res) {
    res.json(usersModel.update());
}

function remove(res, res) {
    res.json(usersModel.remove());
}

module.exports = {
  index,
  show,
  create,
  update,
  remove,
};
