
var express = require('express');
const { videoToken } = require('./tokens');
const config = require('./config')
const db = require('../db/index')
var router = express.Router();

// APPOINTMENT HELPERS////////////////////////////
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

const addAppointment = ({ user_patient_id, user_doctor_id, appt_start, appt_end, title }) => {
  const query = {
    text: `INSERT INTO appointments (user_patient_id, user_doctor_id, appt_start, appt_end, title) 
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id`,
    values: [user_patient_id, user_doctor_id, appt_start, appt_end, title],
  };

  return db
    .query(query)
    .then((result) => result.rows)
    .catch((err) => err);
};

const deleteAppointment = (id) => {
  console.log('id', id)
  const query = {
    text: `DELETE FROM appointments WHERE id = $1`,
    values: [id],
  };

  return db
    .query(query)
    .then((result) => result.rows)
    .catch((err) => err);
};

const getAppointmentsPatientId = (id) => {
  console.log('id', id)
  const query = {
    text: `SELECT * FROM appointments 
    JOIN users_doctors ON users_doctors.id = user_doctor_id
    WHERE user_patient_id = $1`,
    values: [id],
  };

  return db
    .query(query)
    .then((result) => result.rows)
    .catch((err) => err);
};


const getPatients = (id) => {
  console.log('id', id)
  const query = {
    text: `SELECT * FROM users_patients WHERE user_doctor_id = $1`,
    values: [id],
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
// APPOINTMENT ROUTES
router.get('/api/appointments', (req, res) => {
  getAppointments()
    .then(data => {
      console.log('appts: ', data.data);
      return res.json(data)
    })
    .catch((err) => res.json({ err }));
});

router.get('/api/patients/appointments/:id', (req, res) => {
  getAppointmentsPatientId(req.params.id)
    .then(data => {
      console.log('appts: ', data.data);
      return res.json(data)
    })
    .catch((err) => res.json({ err }));
});

router.post('/api/appointments', (req, res) => {
  addAppointment(req.body)
    .then(data => {
      console.log('appts: ', data);
      return res.json(data)
    })
    .catch((err) => res.json({ err }));
});

router.delete('/api/appointments/:id', (req, res) => {
  console.log('req', req.params)
  deleteAppointment(req.params.id)
    .then(data => {
      console.log('deleted')
    })
    .catch((err) => res.json({ err }));
});

// NEED TO BUILD PUT ROUTE TO CHANGE APPT DATA


//////////////////////////////////////////////////////////////////////////////////


router.get('/api/patients/:id', (req, res) => {
  getPatients(req.params.id)
    .then(data => {
      console.log('appts: ', data.data);
      return res.json(data)
    })
    .catch((err) => res.json({ err }));
});






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
