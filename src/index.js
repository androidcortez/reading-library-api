var express = require("express");
var app = express();
var cors = require("cors");

require("dotenv").config();
var PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Reading Library!");
});


//Routes to the endpoints
app.use(require('./routes/userRoutes'));
app.use(require('./routes/authRoutes'));
app.use(require("./routes/bookRoutes"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});
