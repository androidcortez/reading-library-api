const usersModel = require("../models/users");

function index(req, res) {
  usersModel
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
  usersModel
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
  var validator = usersModel.validator_save(req.body);
  if (validator.error) {
    res.status(400);
    res.json({ error: true, type: "BAD_REQUEST", data: validator.message });
  }

  usersModel
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
  res.json(usersModel.update());
}

function remove(req, res) {
  usersModel
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
};
