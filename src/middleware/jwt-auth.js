const jwt = require('jsonwebtoken');
require('dotenv').config();

async function requireJWT(req, res, next) {
    let authValue = req.get('Authorization');
    if (!authValue) {
        return res.status(401).json({ 
            message: 'Missing bearer token'
        })
    }
    authValue = authValue.toString();
    if (!authValue.toLowerCase().startsWith('bearer ')){
        return res.status(401).json({
            message: 'Missing bearer token'
        })
    }

    const token = authValue.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch(err) {
        if (err.name.includes('JsonWebTokenError')) {
            return res.status(401).json({ error: 'Invalid Token' });
        }
        next(err);
    }
}
// mount to requireAuth places instead
module.exports = {
    requireJWT
};