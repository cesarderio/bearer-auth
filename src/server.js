'use strict';

require('dotenv').config();
// 3rd Party Resources
const express = require('express');
const cors = require('cors');
// const morgan = require('morgan');
const PORT = process.env.PORT || 3002;

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRouter = require('./auth/router/index.js');
// const bearerAuth = require('./auth/middleware/bearer');
// const { UserModel } = require('./auth/models');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
// app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRouter);

// Catchalls
app.use(notFound);
app.use(errorHandler);

// module.exports = {
//   server: app,
//   start: (port) => {
//     app.listen(port, () => {
//       console.log(`Server Up on ${port}`);
//     });
//   },
// };


module.exports = {
  server: app,
  start: () => app.listen(PORT, console.log('server running on port', PORT)),
};
