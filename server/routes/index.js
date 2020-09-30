
var express = require('express');
const { videoToken } = require('./tokens');
const config = require('./config')
const db = require('../db/index');
// const {getAppointments} = require('../helpers/dataHelpers');

var router = express.Router();


const getAppointments = () => {
  console.log('in select')
  const query = {
    text: `SELECT * FROM appointments`,
  };

  return db
    .query(query)
    .then((result) => result.rows)
    .catch((err) => err);
};

const addAppointment = (firstName, lastName, email, password) => {
  const query = {
    text: `INSERT INTO users (first_name, last_name, email, password) 
           VALUES ($1, $2, $3, $4)
           RETURNING *`,
    values: [firstName, lastName, email, password],
  };

  return db
    .query(query)
    .then((result) => result.rows)
    .catch((err) => err);
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/////////////////////////////Video Chat Routes///////////////////////////////////////
const sendTokenResponse = (token, res) => {
  res.set('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      token: token.toJwt()
    })
  );
};




router.get('/video/token',function (req, res) {
  const identity = req.query.identity;
  const room = req.query.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);

});
router.post('/video/token',function (req, res) {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

////////////////////////////////////////////////////////////////////////////////////

router.get('/api/appointments', (req, res) => {
  getAppointments()
    .then(data => {
      console.log('appts: ', data);
      return data.rows})
    .catch((err) => res.json({ err }));
});

router.post('/api/appointments', (req, res) => {
  addAppointment()
    .then(data => {
      console.log('appts: ', data);
      return data.rows})
    .catch((err) => res.json({ err }));
});

module.exports = router;
