//Dependencies:
//SQL:
const mysql = require("mysql2");
//Express:
const express = require("express");

//nodemon:
const nodemon = require("nodemon");

const PORT = process.env.PORT || 3001;
const app = express();

//Express Middleware:
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes:
//Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

//Starts the express server on port 3001:
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// code that will connect the application to the MySQL database:
//Connect to database:
const db = mysql.createConnection(
  {
    host: "localhost",
    //your MySQL username, always is root:
    user: "root",
    //your MySQL password:
    password: "password",
    database: "election",
  },
  console.log("Connected to the election database")
);
//console should now say:
//Connected to the election database
//Server is running on port 3001

//Database calls:
//query the database to test the connection:
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//   console.log(rows);
// });

//Create Query for Read Operation:
//GET a single candidate:
db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
  if (err) {
    console.log(err);
  }

  console.log(row);
});

//DELETE a candidate:
db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

//Query for Create Operation:
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
    VALUES (?,?,?,?)`;
const params = [1, "Ronald", "Firbank", 1];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});
