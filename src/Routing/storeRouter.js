const express = require('express');
const storeRouter = express.Router();
const storeServices = require('../Services/storeServices');
const bodyParser = express.json();
const { requireAuth } = require('../middleware/basic-auth');

// .all(requireAuth) in appropriate places
// CRUD OPERATIONS FOR ROUTING

// /store
storeRouter
  .route('/')
  .get((req, res) => {
    const db = req.app.get('db');
    return storeServices.getAllItems(db)
      .then(results => res.json(results));
  });

storeRouter
  .route('/:item_id')
  .all(requireAuth)
  .get((req, res) => {
    const db = req.app.get('db');
    const item_id = req.params.item_id;
    // need an .all earlier for user auth
      
    storeServices.getItemByID(db, item_id)
      .then(item => res.status(200).json(item));
  })
  .delete((req, res) => {
    const db = req.app.get('db');
    const item_id = req.params.item_id;

    storeServices.deleteItemByID(db, item_id)
      .then(() => res.status(204).end());
  });

storeRouter
  .route('/add-item')
  .all(requireAuth)
  .post(bodyParser, (req, res) => {
    // .all(requireauth)
    const db = req.app.get('db');
    const {name, price, image_link, description } = req.body;
    const image = image_link;

    // input valid?

    const toDBObj = {
      name, price, image, description
    };

    return storeServices.insertNewItem(db, toDBObj)
      .then(num => res.status(204).end());
  });

module.exports = storeRouter;
