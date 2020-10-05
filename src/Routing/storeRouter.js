const express = require('express');
const storeRouter = express.Router();
const storeServices = require('../Services/storeServices');
const bodyParser = express.json();
const { requireJWT } = require('../middleware/jwt-auth');
const { DATABASE_URL } = require('../config');

// .all(requireAuth) in appropriate places
// CRUD OPERATIONS FOR ROUTING

// /store
storeRouter
  .route('/')
  .get(async (req, res) => {
    const db = req.app.get('db');
    const users = await storeServices.getAllUsernames(db)
    
    return storeServices.getAllItems(db)
    .then(results => {
      for (let i = 0; i < results.length; i++) {
        const obj = users.find(el => el.id === results[i].user_id)
        results[i].userNickname = obj.username
      }
      return res.json(results)
      });
  });

storeRouter
  .route('/:item_id')
  .all(requireJWT)
  .get((req, res) => {
    const db = req.app.get('db');
    const item_id = req.params.item_id;
    // need an .all earlier for user auth
      
    storeServices.getItemByID(db, item_id)
      .then(item => {
        if (!item.length) {
          return res.status(404).end();
        }

        res.status(200).json(item);
      });
  })
  .delete((req, res) => {
    const db = req.app.get('db');
    const item_id = req.params.item_id;

    storeServices.deleteItemByID(db, item_id)
      .then(() => res.status(204).end());
  });

storeRouter
  .route('/add-item')
  .all(requireJWT)
  .post(bodyParser, (req, res) => {
    const db = req.app.get('db');
    const {name, price, image_link, description, id } = req.body;
    const image = image_link;
    const { user_id }  = req.payload;

    if (!name || !price || !image_link || !user_id) {
      return res.status(401).json({
        message: 'Input invalid: Name, price, and image link are required'
      });
    }

    const toDBObj = {
      name, price, image, description, user_id, id
    };

    return storeServices.insertNewItem(db, toDBObj)
      .then(num => res.status(204).end());
  });

module.exports = storeRouter;
