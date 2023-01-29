var mysql = require("mysql2");
var express = require("express");
var app = express();

// Middleware
var bodyparser = require("body-parser"); // Parsing HTML Data
app.use(bodyparser.json()); // JSON Parsing
app.use(bodyparser.urlencoded({ extended: true })); // UrlEncoded Data Parsing             // req.body object will contain value of any type insted of just string.

app.use("/public", express.static("public"));

// Router
const router = require("../Task-3/Routes/dataRoute.js");
app.use("/", router);

app.listen(5000, () => {
  console.log(`Server running at http://localhost:5000/`);
});
