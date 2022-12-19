const express = require("express");
const mysql = require("mysql");

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

const app = express();

// Create db
/*
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
*/

// create table
app.get("/createPersonsTable", (req, res) => {
    let sql =
        "CREATE TABLE PERSONS2 (ID int AUTO_INCREMENT, LastName varchar(255), FirstName varchar(255), Age int, Occupation varchar(255), PRIMARY KEY (ID));";
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send("Persons2 table created");
    });
});

// insert person
app.get("/insertPerson", (req, res) => {
    let post = {
        LastName: "Rompf",
        FirstName: "Johanna",
        Age: 20,
        Occupation: "Studentin",
    };
    let sql = "INSERT INTO persons2 SET ?";
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("inserted jojo");
    });
});

// select
app.get("/getPersons", (req, res) => {
    let sql = "SELECT * FROM persons2";
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send("persons fetched");
    });
});

// change entry
app.get("/changePerson/:id", (req, res) => {
    let newName = "Jojo";
    let sql = `UPDATE persons2 SET FirstName = "${newName}" WHERE ID = ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send("person updated");
    });
});

// delete entry
app.get("/deletePerson/:id", (req, res) => {
    let sql = `DELETE FROM persons WHERE ID = ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send("person deleted");
    });
});

app.listen("3000", () => {
    console.log("Server started on port 3000");
});
