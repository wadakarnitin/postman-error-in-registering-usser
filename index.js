const express = require("express");
const app = express();
const bodyparser = require("body-parser");

//bring all routes
const auth = require("./routes/api/auth");
const questions = require("./routes/api/questions");
const profile = require("./routes/api/profile");

//middleware for express -body-parser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const mongoose = require("mongoose");
//mongoDB configuration
const db = require("./setup/myurl").mongoURL;

//attaempt to connect to mongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("mongoDB connected successfully.."))
  .catch(err => console.log(err));

//just for testing route
app.get("/", (req, res) => {
  res.send("Welcome to node world...");
});

//actual routes
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/questions", questions);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server started at ${port}...`));
