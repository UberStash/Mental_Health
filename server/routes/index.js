
var express = require('express');
const { videoToken } = require('./tokens');
const config = require('./config')
const db = require('../db/index')
var router = express.Router();

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




router.get('/video/token', function(req, res) {
  const identity = req.query.identity;
  const room = req.query.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);

});
router.post('/video/token', function(req, res) {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

////////////////////////////////////////////////////////////////////////////////////


















//<------------------- map route --------------------->
const getAddress = (loggedPatient) => {
  console.log('in select')

  const query = {
    text: `SELECT clinic_address, users_patients.id AS p_id, users_doctors.id AS doc_id
    FROM users_patients
    JOIN users_doctors ON users_doctors.id = user_doctor_id    
    WHERE users_patients.id = $1`
  };

  return db
    .query(query, [loggedPatient])
    .then((result) => result.rows)
    .catch((err) => err);
};

router.get("/api/directionTo", (req, res) => {
  getAddress(2)//req.sessions.id))
    .then(data => {
      // console.log("data", data)
      return res.json(data)
    })
    .catch((err) => res.json({ err }));
});

module.exports = router;
