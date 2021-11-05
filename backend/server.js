// Import Dependencies & Middleware
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dbConfig = require("./database/db");
const passport = require("passport");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require('body-parser');

// Define the app
const app = express();

// Import REST API routes
const userRoute = require("../backend/routes/auth.route");
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

app.post("/test", (req, res, next) => {
  console.log("ENTER POST");
  res.json({message: "OK"});
});

// ------- Add middleware/plugins to application -------
// Add parser to parse JSON bodies into JS objects
app.use(bodyParser.urlencoded({ extended: true }));

// Add Helmet for better API security
app.use(helmet());

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Enable CORS for all requests
app.use(cors());

// Add morgan to log HTTP requests
app.use(morgan('combined'));

// ------- API ROUTES -------
// Add REST API routes to application
app.use("/api/tasks", taskRoute);
app.use("/api/auth", userRoute);

// Define which port the app will run on
const port = process.env.PORT || 5000;

// Start the server
const server = app.listen(port, () => {
  console.log("Server is running on port " + port);
});

// // Test endpoint to be sure setup is working
// app.get("/", (req, res) => {
//   res.send("Test connection successful!");
// })

// // 404 Error
// app.use((req, res, next, createError) => {
//   next(createError(404));
// });

// // Error
// app.use(function (err, req, res, next) {
//   console.error(err.message);
//   if (!err.statusCode) err.statusCode = 500;
//   res.status(err.statusCode).send(err.message);
// });
