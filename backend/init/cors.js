const cors = require('cors');

module.exports = function (app) {
  app.use(
    cors({
      origin: [
        `https://localhost:3000`,
        `https://localhost:3000`,
        `localhost:3000`
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true // enable set cookie
    })
  );
};
