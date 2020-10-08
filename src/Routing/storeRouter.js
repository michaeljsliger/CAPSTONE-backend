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
  .get(async (req, res) => {
    const db = req.app.get('db');
    const item_id = req.params.item_id;
    // need an .all earlier for user auth
    const users = await storeServices.getAllUsernames(db)
    
    storeServices.getItemByID(db, item_id)
    .then(item => {
      if (!item.length) {
        return res.status(404).end();
      }
        const obj = users.find(el => el.id == item[0].user_id)
        console.log(obj);
        item[0].userNickname = obj.username;
      
        res.status(200).json(item);
      });
  })
  .delete(async (req, res) => {
    const db = req.app.get('db');
    const item_id = req.params.item_id;
    // payload matches 
    console.log(req.payload);
    const { user_id }  = req.payload;
    const itemToDelete = await storeServices.getItemByID(db, item_id);
    console.log(itemToDelete)
    if (!itemToDelete) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (user_id == itemToDelete[0].user_id) {
      return storeServices.deleteItemByID(db, item_id)
      .then(() => res.status(204).end());
    } else {
      return res.status(401).json({ message: 'Unauthorized action' })
    }
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
