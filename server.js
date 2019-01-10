const express = require("express");
const mysql = require('mysql');

const app = express();
//  Serve static files
app.use(express.static('frontend'));


// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'socka'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

app.get("/", (req, res) => {
    res.sendfile('index.html');
});

app.get("/data", (req, res) => {

    var data = [
        { name: 'AngularJS Directives', completed: true, note: 'add notes...' },
        { name: 'Data binding', completed: true, note: 'add notes...' },
        { name: '$scope', completed: true, note: 'add notes...' },
        { name: 'Controllers and Modules', completed: true, note: 'add notes...' },
        { name: 'Templates and routes', completed: true, note: 'add notes...' },
        { name: 'Filters and Services', completed: false, note: 'add notes...' },
        { name: 'Get started with Node/ExpressJS', completed: false, note: 'add notes...' },
        { name: 'Setup MongoDB database', completed: false, note: 'add notes...' },
        { name: 'Be awesome!', completed: false, note: 'add notes...' },
      ];

      res.send(data);
});

app.listen(3000,  function() {
  console.log('listening on 3000')
});