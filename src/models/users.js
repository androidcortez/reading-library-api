function getAll() {
  return [
    { name: "Juan Hernandez", email: "juan@gmail.com", username: "juan" },
    { name: "Pedro Juarez", email: "pedro@gmail.com", username: "pedro" },
    { name: "Carlos Marquez", email: "carlos@gmail.com", username: "carlos" },
  ];
}

function getById() {
  return {
    name: "Carlos Marquez",
    email: "carlos@gmail.com",
    username: "carlos",
  };
}

function create() {
  return {
    name: "Carlos Marquez",
    email: "carlos@gmail.com",
    username: "carlos",
  };
}

function update() {
  return {
    name: "Carlos Marquez",
    email: "carlos@gmail.com",
    username: "carlos",
  };
}

function remove() {
    return {
        'message': 'User Removed'
    }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
