// forrás az index.js

var express = require('express');
var router = express.Router();
const DB = require('../module/db');

/* GET home page. */
// ha az /api-ra jön kérés, ezt a választ adja vissza
router.get('/', function(req, res, next) {
  res.send('This the API Page');
});

// pl: /users/5 = a szerver visszaadja a users array-ból az id 5 elemet
router.get('/:entity/:id', async(req, res, next) => {
  const db = new DB(req.params.entity);
  // keresse meg a listából az összes elemet, addig nem megy tovább, amíg meg nem kapja a listát
  let list = await db.find(req.params.id);
  // visszadja a listát
  res.json(list);
  });

// pl: /users/ = a szerver visszaadja a users array-ból az összes elemet
router.get('/:entity', async(req, res, next) => {
  //átadja az /:entity értékét a db-nek)
    const db = new DB(req.params.entity);
    // keresse meg a listából az összes elemet, addig nem megy tovább, amíg meg nem kapja a listát
    let list = await db.find();
    // visszadja a listát
    res.json(list);
  });

// user létrehozás
router.post('/:entity', async(req, res, next) => {
  //átadja az /:entity értékét a db-nek)
  const db = new DB(req.params.entity);
  let newData = await db.create(req.body);
  // visszadja a listát
  res.json(newData);
});

// user adatfrissítés
router.put('/:entity/:id', async(req, res, next) => {
  //átadja az /:entity értékét a db-nek)
  const db = new DB(req.params.entity);
  let newData = await db.update(id, req.body);
  // visszadja a listát
  res.json(newData);
});

// user delete
router.delete('/:entity/:id', async(req, res, next) => {
  //átadja az /:entity értékét a db-nek)
  const db = new DB(req.params.entity);
  let deleted = await db.delete(req.params.id);
  // visszadja az id-t
  res.json(this.deleted);
});

module.exports = router;
