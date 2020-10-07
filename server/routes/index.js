
const express = require('express');
const { videoToken } = require('./tokens');
const config = require('./config');
const router = express.Router();
const db = require('../db');
const { JobContext } = require('twilio/lib/rest/bulkexports/v1/export/job');
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
require("./passportConfig")(passport);
//const session = require("express-session");
//const bodyParser = require("body-parser");

///???????????????
// const app = express();
// app.use(cookieParser("secretcode"));
// app.use(passport.initialize());
// app.use(passport.session());

// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const salt = bcrypt.genSaltSync(saltRounds);

//const db = require('../db/index')
//var router = express.Router();

// APPOINTMENT HELPERS////////////////////////////
  const getAppointments = (id) => {
    console.log('id', id)
    const query = {
      text: `SELECT * FROM appointments WHERE user_doctor_id = $1`,
      values: [id],
    };

  return db
    .query(query)
    .then((result) => result.rows)
    .catch((err) => err);
};

const addAppointment = ({ user_patient_id, user_doctor_id, appt_start, appt_end, title, appt_password }) => {
  const query = {
    text: `INSERT INTO appointments (user_patient_id, user_doctor_id, appt_start, appt_end, title, appt_password)       
    VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING id`,
    values: [user_patient_id, user_doctor_id, appt_start, appt_end, title, appt_password],
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
    WHERE user_patient_id = $1
    Order BY appt_start asc`,
    values: [id],
  };

  return db
    .query(query)
    .then((result) => result.rows)
    .catch((err) => err);
};


const getAppointmentsList = (id) => {
  console.log('id', id)
  const query = {
    text: `SELECT * FROM appointments 
    WHERE user_doctor_id = $1
    ORDER BY appt_start asc`,
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
  let authUser = req.session.passport
  res.json(authUser);
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
router.get('/api/appointments/:id', (req, res) => {
  getAppointments(req.params.id)
    .then(data => {
      console.log('appts: ', data.data);
      return res.json(data)
    })
    .catch((err) => res.json({ err }));
});

router.get('/api/doctor/appointments/:id', (req, res) => {
  console.log('its me your looking for', req.params.id)
  getAppointmentsList(req.params.id)
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

router.post('/api/appointments/', (req, res) => {
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
const getAddress = (id) => {
  console.log('in select')

  const query = {
    text: `SELECT clinic_address, users_patients.id AS p_id, users_doctors.id AS doc_id
    FROM users_patients
    JOIN users_doctors ON users_doctors.id = user_doctor_id    
    WHERE users_patients.id = $1`
  };

  return db
    .query(query, [id])
    .then((result) => result.rows)
    .catch((err) => err);
};

router.get("/api/directionTo/:id", (req, res) => {
  getAddress(req.params.id)//req.sessions.id))
    .then(data => {
      // console.log("data", data)
      return res.json(data)
    })
    .catch((err) => res.json({ err }));
});

/////////////////////////////Authenticaton Routes///////////////////////////////////
//Register Patients
router.post('/patient/register', (req, res) => {
  


    
    const email = req.body.state.email;
    const text = `SELECT * FROM users_patients WHERE email = $1;`;
  
    db.query(text, [email])
      .then(data => {
      //Check if there are users with this email
      if (data.rows.length !== 0 ) {
        res.send("User Already Exists");
        
      } else {

        const {
          gender,
          diagnosis,
          health_card,
          email,
          
          phone
        } = req.body.state;
  
        const password =  bcrypt.hashSync(req.body.state.password, salt);
        const first_name = req.body.state.firstname;
        const last_name = req.body.state.lastname;
        const date_of_birth = req.body.state.dob;
        const patient_address = req.body.state.address;
        const doctor_id = req.body.state.doctor_id;
  
  
        //Create a new user
        const text = `INSERT INTO users_patients (first_name,last_name, date_of_birth, gender, diagnosis, health_card,email, password, phone, patient_address, user_doctor_id) VALUES ($1, $2, $3,$4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;`;
        const values = [first_name, last_name, date_of_birth, gender,diagnosis, health_card, email, password, phone, patient_address, doctor_id];
        
        return db.query(text, values)
        .then(() => {
          res.status(200).send("User Created");
        });
      }        
  }).catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});


//Register Doctors
router.post('/doc/register', (req, res) => {


  const email = req.body.state.email;
  const text = `SELECT * FROM users_doctors WHERE email = $1; `;
  db.query(text, [email])
    .then(data => {
      console.log("256")
      //Check if there are users with this email
      if (data.rows.length !== 0 ) {
        res.send("User Already Exists");
      } else {

        const {
          gender,
          specialization,
          license,
          phone,
          clinic_address
        } = req.body.state;
      
        const password =  bcrypt.hashSync(req.body.state.password, salt);
        const first_name = req.body.state.firstname;
        const last_name = req.body.state.lastname;
        const date_of_birth = req.body.state.dob;
        const clinic_name = req.body.state.clinicname;
        
        //Create a new user
        const text = `INSERT INTO users_doctors
        (first_name, last_name, date_of_birth, gender, specialization, license, email, password, phone, clinic_name, clinic_address)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;`;
      
        const values = [first_name, last_name, date_of_birth, gender, specialization, license, email, password, phone, clinic_name, clinic_address];
        
        return db.query(text, values)
        .then(() => {
          res.status(200).send("User Created");
        });

      };


  }).catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

//Login

//working Login
  router.post("/login", (req, res, next) => {
    
    passport.authenticate("local", (err, user, info) => {
    
      if (err) {
        res.send(err);
        
      } 
      if (!user) {
        res.send("No User Exists");
      }
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          
          res.json({user: user})
      
        });
      }
    })(req, res, next);
  });

  router.get('/logout', function(req, res) {
    req.logout();
    res.json("user loged out")
  });


///////////////////////////////////////////////////////////////////////////////////

module.exports = router;
