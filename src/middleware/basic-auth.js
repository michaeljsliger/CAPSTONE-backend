const bcrypt = require('bcryptjs');

function requireAuth(req, res, next) {
  const authToken = req.get('Authorization');
  if (!authToken) {
    return res.status(401).json({ message: 'Missing basic token' });
  }

  if (!authToken.toLowerCase().startsWith('basic ')) {
    return res.status(401).json({ message: 'Missing basic token' });
  }

  const [ tokenUserName, tokenPassword ] = Buffer
    .from(authToken.split(' ')[1], 'base64')
    .toString()
    .split(':');

  if (!tokenUserName || !tokenPassword) {
    return res.status(401).json({ message: 'Must enter both username and password' });
  }

  
  req.app.get('db')('store_users')
    .where({ username: tokenUserName})
    .first()
    .then(user => {
      if (!user || user.password !== tokenPassword) {
        return res.status(401).json({ message: 'Username or Password is incorrect' });
      }

      bcrypt.compare(tokenPassword, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return res.status(401).json({ message: 'Username or Password is incorrect' });
          }

          req.user = user;
          next();
        });
    });
}



module.exports = {
  requireAuth
};