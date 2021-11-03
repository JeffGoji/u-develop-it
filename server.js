//Dependencies:
//SQL:
const mysql = require("mysql2");
//Express:
const express = require("express");
//Checks input:
const inputCheck = require("./utils/inputCheck");

//nodemon:
const nodemon = require("nodemon");

//Port information:
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
// Get all candidates
app.get("/api/candidates", (req, res) => {
  const sql = `SELECT * FROM candidates`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

//Create Query for Read Operation:
//GET a single candidate:
app.get("/api/candidate/:id", (req, res) => {
  const sql = `SELECT * FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

//DELETE a candidate:
app.delete("/api/candidate/:id", (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Candidate not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

//Query for Create Operation:
// Create a candidate/POST routine:
app.post("/api/candidate", ({ body }, res) => {
  const errors = inputCheck(
    body,
    "first_name",
    "last_name",
    "industry_connected"
  );
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
    VALUES (?,?,?)`;
  const params = [body.first_name, body.last_name, body.industry_connected];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
    });
  });
});

//Create the GET routes:

//Starts the express server on port 3001:
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
