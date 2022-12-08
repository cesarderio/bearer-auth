'use strict';

const jwt = require('jsonwebtoken');
// const SECRET = process.env.SECRET || 'ThisIsMySecret';
const bcrypt = require('bcrypt');
const SECRET = process.env.SECRET || 'ThisIsMySecret';


const usersSchema = (sequelizeDatabase, DataTypes) => {
  let user = sequelizeDatabase.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET);
      },
    },
  });

  user.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });

  // Basic AUTH: Validating strings (username, password)
  user.authenticateBasic = async function (username, password) {
    const user = await this.findOne({where: {username} });
    // console.log('HELLLLLOOOOOOOOOOOOO', user.password);
    const valid = await bcrypt.compare(password, user.password);
    // console.log('HELLOOOOOO WORLD', valid);
    if (valid) { return user; }
    throw new Error('Invalid User');
  };

  // Bearer AUTH: Validating a token
  user.authenticateWithToken = async function(token) {
    try {
      let parsedToken = jwt.verify(token, SECRET);
      let user = await this.findOne({where: { username: parsedToken.username }});
      if(user){
        return user;
      }
      throw new Error('User Not Found');
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return user;
};

module.exports = usersSchema;
