const jwt = require('jsonwebtoken');
require('dotenv').config();

const authService = {
  getUserWUserName(db, user_name) {
    return db('store_users')
      .select('*')
      .where({ username: user_name });
  },
  parseBasicToken(token) {
    return Buffer
      .from(token, 'base64')
      .toString()
      .split(':');
  },
  createJWT(user, options = {}) {
    options.expiresIn = options.expiresIn || '7d';

    return jwt.sign({
      user_id: user[0].id
    }, process.env.JWT_SECRET, {
      subject: user[0].username,
      expiresIn: options.expiresIn
    });
  },
  decodeDWT(token) {
    return jwt.decode(token, process.env.JWT_SECRET);
  }

};

module.exports = authService;