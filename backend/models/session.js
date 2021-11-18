const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  session: String,
  session_id: String,
  expire: { type: Date, required: true, default: Date.now, expires: '14d' }
});

const session = mongoose.model('session', sessionSchema);

module.exports = session;
