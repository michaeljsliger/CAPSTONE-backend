// const xss = require('xss');

const storeServices = {
  getAllItems(db) {
    return db('items_store')
      .select('*');
  },
  getItemByID(db, id) {
    return db('items_store')
      .select('*')
      .where({ id });
  },
  insertNewItem(db, item) {
    return db('items_store')
      .insert(item);
  },
  updateItemByID(db, id, update) {
    return db('items_store')
      .where({ id })
      .update(update);
  },
  deleteItemByID(db, id) {
    return db('items_store')
      .where({ id })
      .delete();
  }
};

module.exports = storeServices;