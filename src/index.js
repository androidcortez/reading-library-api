"use strict";

const express = require("express");
const app = express();
const cors = require("cors");

//Init all configuration
require("dotenv").config();
const config = require("./config/config");
const PORT = config.port || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send('Welcome to Reading Library 📚!');
});


//Routes to the endpoints
app.use(require('./routes/auth.routes'));
app.use(require('./routes/book.routes'));
app.use(require('./routes/user.routes'));
app.use(require('./routes/userType.routes'));
app.use(require('./routes/userBook.routes'));
app.use(require('./routes/userFeedback.routes'));
app.use(require('./routes/category.routes'));
app.use(require('./routes/categoryBook.routes'));

//Middleware - After
app.use(require('./middlewares/handleErrors'));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});
