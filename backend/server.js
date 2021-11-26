// Import dependencies
const bodyParser = require('body-parser');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
require("dotenv").config();

// Import REST API routes
const authRoute = require("../backend/routes/auth.route");
const taskRoute = require("../backend/routes/task.route");
const chronicleRoute = require('../backend/routes/chronicle.route');
const userRoute = require("../backend/routes/user.route");


// Set up app and port
const port = process.env.PORT || 5000;
const app = express();

// Import initialization tools
require('./init/passportConfig')();
require('./init/validation')();
// require('./init/cors')(app);
require('./init/db')();
require('./init/prod')(app);

// Create user session
app.use(
  session({
    // Get hash for session
    secret: '123456789',
    resave: false,
    saveUninitialized: false,
    // Save session
    store: MongoStore.create({
      mongoUrl:
        process.env.MONGODB_CONNECTION_STRING
    })
  })
);

// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/api/tasks', taskRoute);
app.use('/api/auth', authRoute);
app.use('/api/chronicles', chronicleRoute);
app.use('/api/user', userRoute);

const server = app.listen(port, () => {
  console.log("Server is running on port " + port);
});