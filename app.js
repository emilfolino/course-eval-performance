const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const courses = require("./models/courses.js");

const app = express();

app.use(cors());
app.options('*', cors());

app.disable('x-powered-by');

app.set("view engine", "ejs");

const port = 8321;

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(path.join(__dirname, "public")));

app.get("/search/:query", (req, res) => courses.search(req, res));

app.get("/", (req, res) => res.sendFile(path.join(__dirname + '/public/index.html')))

const server = app.listen(port, () => console.log('Order api listening on port ' + port));

module.exports = server;
