/** Attribution: 
 * This code is partially referenced from the official MongoDB getting started documentation, 
 * found here: (https://www.mongodb.com/languages/mern-stack-tutorial) 
 */

// Dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./config.env" });

// App
const app = express();

// Port for server to run on
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

// Get driver connection
const dbo = require("./db/conn");
// Connect to database
app.listen(port, () => {
  // Perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
