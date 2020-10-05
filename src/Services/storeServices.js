// const xss = require('xss');

const storeServices = {
  getAllItems(db) {
    return db('store_items')
      .select('*');
  },
  getItemByID(db, id) {
    return db('store_items')
      .select('*')
      .where({ id });
  },
  insertNewItem(db, item) {
    return db('store_items')
      .insert(item);
  },
  updateItemByID(db, id, update) {
    return db('store_items')
      .where({ id })
      .update(update);
  },
  deleteItemByID(db, id) {
    return db('store_items')
      .where({ id })
      .delete();
  },
  getAllUsernames(db) {
    return db('store_users')
      .select('username', 'id');
  }
};

module.exports = storeServices;