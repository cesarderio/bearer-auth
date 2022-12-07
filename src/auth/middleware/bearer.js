'use strict';

const { users } = require('../models');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) {
    next('Invalid Login');
  } else {
    try {
      let authType = req.headers.authorization.split(' ')[0];
      if(authType === 'Bearer'){
        let token = req.headers.authorization.split(' ').pop();

        let validUser = users.authenticateToken(token);
        if(validUser){
          req.user = validUser;
          // req.token = validUser.token;
          next();
        } else{
          next('send bearer auth string');
        }

      }
    } catch (e) {
      console.error(e);
      next(e);
      // res.status(403).send('Invalid Login');
    }
  }
};
