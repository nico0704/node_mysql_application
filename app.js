const { response } = require("express");
const express = require("express");
var bodyParser = require('body-parser')
const mysql = require("mysql");
const { readFile } = require("fs").promises;

// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// create connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "multimedia_test1",
});

// connect
db.connect((error) => {
    if (error) {
        throw error;
    }
    console.log("MySql connected");
});

// home
app.get("/", async (req, res) => {
    let html = await readFile("./index.html", "utf-8");
    res.send(html);
})

// Create db
app.get("/createdb", (req, res) => {
    let sql = "CREATE DATABASE nodemysql";
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        dbCreated = true;
        res.send("database created");
    })
});

// create table
app.get("/createPersonsTable", (req, res) => {
    let sql =
        "CREATE TABLE persons2 (ID int AUTO_INCREMENT, LastName varchar(255), FirstName varchar(255), Age int, Occupation varchar(255), PRIMARY KEY (ID));";
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send("Persons2 table created");
    });
});

// insert person
app.post("/insertPerson", (req, res) => {
    if (!req.body.FirstName || !req.body.LastName || !req.body.Age || !req.body.Occupation) {
        res.status(400).send("Bad request");
        return;
    }
    let post = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Age: req.body.Age,
        Occupation: req.body.Occupation,
    };
    let sql = "INSERT INTO persons2 SET ?";
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);
    });
});

// select
app.get("/getPersons", async (req, res) => {
    console.log("getpersons called");
    let sql = "SELECT * FROM persons2";
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send("Something went wrong");
            throw err;
        } else {
            console.log(results);
            res.status(200).send(results);
        }
    });
});

// delete entry
app.get("/deletePerson/:id", (req, res) => {
    console.log("deleting entry with ID=" + req.params.id);
    let sql = `DELETE FROM persons2 WHERE ID = ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send("Something went wrong");
            throw err;
        } else {
            console.log("entry successfully deleted");
            res.status(200).send(results);
        }
    });
});

app.listen("3000", () => {
    console.log("Server started on port 3000");
});