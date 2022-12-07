'use strict';

// Start up DB Server
const { db } = require('./src/auth/models/index.js');
let { start } = require('./src/server');


// db.sync()
//   .then(() => {

//     // Start the web server
//     require('./src/server.js').start(process.env.PORT);
//   });



db.sync()
  .then(() => {
    console.log('Successfully Connected');
    start();
  })
  .catch((e) => console.error(e));
