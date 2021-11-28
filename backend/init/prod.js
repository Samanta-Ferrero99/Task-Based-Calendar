const helmet = require('helmet');
const compression = require('compression');
const path = require('path');

module.exports = function (app) {
  if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
    app.use(compression());
    // Serve static files
    app.use(express.static(path.join(__dirname, '../../frontend/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
    });
  }
};
