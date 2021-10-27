let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
let dbConfig = require("./database/db");
const passport = require("passport");

// Express Route
const userRoute = require("../backend/routes/user.route");
const taskRoute = require("../backend/routes/task.route");

// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

// Test database connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

app.use(cors());
app.use("/tasks", taskRoute);
app.use("/users", userRoute);

// PORT
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log("Server is running on port " + port);
});

// 404 Error
app.use((req, res, next, createError) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
