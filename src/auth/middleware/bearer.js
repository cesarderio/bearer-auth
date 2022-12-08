'use strict';
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(403).send('Invalid Login');
    }
    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateWithToken(token);
    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
};

// module.exports = async (req, res, next) => {
//   try {
//     if (!req.headers.authorization) {
//       next('Invalid Login');
//     }
//     let authType = req.headers.authorization.split(' ')[0];
//     if(authType === 'Bearer'){
//       let token = req.headers.authorization.split(' ').pop();
//       let validUser = await users.authenticateWithToken(token);
//       if(validUser){
//         req.user = validUser;
//         req.token = validUser.token;
//         next();
//       } else{
//         next('send bearer auth string');
//       }
//     }
//   } catch (e) {
//     console.error(e);
//     next(e);
//     res.status(403).send('Invalid Login');
//   }

// };
