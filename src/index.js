var express = require('express');
var app = express();

require('dotenv').config();
var PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to Reading Library!');
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`)
})

