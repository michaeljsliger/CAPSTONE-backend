const jwt = require('jsonwebtoken');
const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcryptjs');
const authService = require('../Services/authService');
/*
accept username password
return signed jwt
if invalid, return 401

modify requireauth to validate jwt
non bearer auth 400
malformed, wrong, expired jwt 401

modify loginform to call /login;
if 200 store token, ---- no longer storing on login
if error, display token
send in Authorization header serviceToken.getAuthHeader();
*/ 

authRouter
    .route('/')
    .post(express.json(), async (req, res, next) => {
        const requiredFields = ['username', 'password'];
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(401).json({ message: 'Username and password required'})
        }

        const unBcrypted = Buffer.from(`${username}:${password}`).toString('base64')
       
        try {
            const user = await authService.getUserWUserName(
                req.app.get('db'),
                username                
            )
            
            if (!user) {
                return res.status(401).json({ message: 'Username or Password is incorrect' })
            }

            const isMatch = await bcrypt.compare(unBcrypted, user[0].password)
            if (!isMatch) {
                return res.status(401).json({ message: 'Username or Password is incorrect' })
            }

            const token = authService.createJWT(user);
            res.json(token);

        } catch(err) {
            next(err)
        }
    }) 

module.exports = authRouter;
    