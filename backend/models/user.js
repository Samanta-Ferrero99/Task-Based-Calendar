const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
  }
);

const user = mongoose.model("user", userSchema)

module.exports = user;
