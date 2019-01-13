const express = require("express");
const mysql = require('mysql');
const bodyParser =  require("body-parser");

const app = express();
//  Serve static files
app.use(express.static(__dirname + '/frontend'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '01117042116vero',
    database: 'wimo'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

app.get("/", (req, res) => {
    res.sendFile('index.html');
});

// get all tasks oredered by delivery date
app.get("/data", (req, res) => {

    let query = "select * from tasks order by deliveryDate";
    let list = {};

    db.query(query, (err, result)=>{
        if(err){
            console.log("error");
        }else{

            list = result;
        }

        res.send(list);
    })

      
});

app.post("/getFilteredData", (req, res) => {

    var reqData = req.body;

    // default filter
    let query = "select * from tasks where courier = ? order by deliveryDate";

    if(reqData.type == 'status'){

        query = "select * from tasks where status = ? order by deliveryDate";

    }else if(reqData.type == 'driver'){

        query = "select * from tasks where driverName = ? order by deliveryDate";

    }
    
    let list = {};
    let params = [reqData.value];

    db.query(query, params, (err, result)=>{

        if(err){
            console.log("error");
        }else{

            list = result;
        }

        res.send(list);
    })
   
});

app.post("/updateTask", (req, res) => {
    
    var reqData = req.body;
    let query = "update tasks set status = ? where id = ?";
    let responseData = "";
    let params = [reqData.status, reqData.id];

    db.query(query, params, (err, result)=>{
        if(err){
            console.log("error");
        }else{
            
            responseData = "success";
        }

        res.send(responseData);
    })
});

app.post("/showMap", (req, res) => {
    res.sendFile(__dirname + "/frontend/test_maps.html");
});


app.listen(3000,  function() {
  console.log('listening on 3000')
});

module.exports = app;