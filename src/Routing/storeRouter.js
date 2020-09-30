const express = require('express');
const storeRouter = express.Router();
const storeServices = require('../Services/storeServices');
const bodyParser = express.json();

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
  .get((req, res) => {
    const db = req.app.get('db');
    const item_id = req.params.item_id;
    // need an .all earlier for user auth
      
    storeServices.getItemByID(db, item_id)
      .then(item => res.status(200).json(item));
  });
