var express = require('express');
var router = express.Router();

module.exports = ({ getUsers, getQuotesForUser }) => {
  /* GET users listing. */
  router.get('/', function(req, res, next) {
    getUsers().then(result => res.json(result));
  });

  router.get('/:id/quotes', (req, res) => {
    const { id } = req.params;
    getQuotesForUser(id).then(result => res.json(result));
  });

  return router;
};
