"use strict";

const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Reading Library 😊!");
});


//Routes to the endpoints
app.use(require('./routes/auth.routes'));
app.use(require('./routes/users.routes'));
app.use(require("./routes/books.routes"));
app.use(require("./routes/categories.routes"));
app.use(require("./routes/categoriesBooks.routes"));

//Middleware - After
app.use(require("./middlewares/handleErrors"));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});
