'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');



module.exports = async (req, res, next) => {
  // console.log('----------HELLO____---------------');

  try {
    if (!req.headers.authorization) {
      res.status(401).send('Not Authorized!');
    }
    console.log('----------HELLO___________---------------');
    let basic = req.headers.authorization;
    console.log('HELLLOOOOOOOO', basic);
    let authString = basic.split(' ').pop();

    let [username, pass] = base64.decode(authString).split(':');
    console.log(username, pass);
    let user = await users.authenticateBasic(username, pass);
    console.log(user);
    req.user = user;
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

};
