const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.json());

// parse requests of content-type - application/json
app.use(bodyParser.json())
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Fun Doo Notes application. Take notes quickly. Organize and keep track of all your notes."});
});

// Require Notes routes
require('./app/routes/user.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});