const express = require("express");
const path = require("path");
const logger = require("morgan");
const app = express();
const passport = require('passport');
const authMiddleware = require("./middleware/Auth");
app.use(logger("dev"));
app.use(express.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
app.use(passport.initialize())
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

var usersRouter = require("./routes/user");

app.use("/user", usersRouter);

module.exports = app;
