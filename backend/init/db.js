const mongoose = require('mongoose');

// Connect to DB from env variable url, create instance
module.exports = function () {
  const dbConfig =
    process.env.MONGO_URI ||
    'mongodb+srv://wizard:hello@csc342-10.iyhnw.mongodb.net/chronicle?retryWrites=true&w=majority';
  
    const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  };

  mongoose.connect(dbConfig, options);

  // Test database connection
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error: '));
  db.once('open', function () {
    console.log('Connected successfully');
  });
};
