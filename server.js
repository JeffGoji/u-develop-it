//Dependencies:
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
