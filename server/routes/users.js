const express = require('express');
const router = express.Router();

const {getAppointments} = require('../helpers/dbHelpers');

module.exports = ({ getAppointments }) => {
  /* GET users listing. */
  
  router.get('/api/appointments', (req, res) => {
    getAppointments()
      .then((users) => res.json(getAppointments(users)))
      .catch((err) => res.json({ err }));
  });

  return router;
};
