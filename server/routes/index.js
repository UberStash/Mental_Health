
const express = require('express');
const { videoToken } = require('./tokens');
const config = require('./config');
const router = express.Router();
const db = require('../db');
const { JobContext } = require('twilio/lib/rest/bulkexports/v1/export/job');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const salt = bcrypt.genSaltSync(saltRounds);

//const db = require('../db/index')
//var router = express.Router();

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
    text: `SELECT * FROM appointments WHERE user_patient_id = $1`,
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

/////////////////////////////Authenticaton Routes///////////////////////////////////
//Register Patients
router.post('/patient/register', (req, res) => {
  console.log('PrintRESPONSEBody', req.body);

  const {
    gender,
    diagnosis,
    health_card,
    email,
    password,
    confirmpassword,
    phone
  } = req.body.state;
  
    const first_name = req.body.state.firstname;
    const last_name = req.body.state.lastname;
    const date_of_birth = req.body.state.dob;
    patient_address = req.body.state.address;
    // const patient_address = req.body.state.patient_address;
    
    //password = bcrypt.hashSync(req.body.password, salt)
    const text = `SELECT * FROM users_patients WHERE email = $1;`;
  
    db.query(text, [email])
      .then(data => {

      //Check if there are users with this email
      if (data.rows.length !== 0 ) {
        res.send("An user with this email already exists, please change email or login");
        // check if password matches
      } else if (password !== confirmpassword) {
        res.send("please confirm the password")
      } else {
        
        //Create a new user
        const text = `INSERT INTO users_patients (first_name, last_name, date_of_birth, gender, diagnosis, health_card, email, password, phone, patient_address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`;

        const values = [first_name,
          last_name, date_of_birth, gender, diagnosis, health_card, email,
        password, phone, patient_address];
        return db.query(text, values)
        .then((savedRows) => {
          res.send(savedRows)
        });
      }
  });
});
//Register Doctors
router.post('/doc/register', (req, res) => {
  console.log("print RESBODY",req.body.state);
  console.log("printFirstName", req.body.state.firstname);
  
  const {
  gender,
  specialization,
  license,
  email,
  password,
  confirmpassword,
  phone,
  clinic_address
} = req.body.state;

  const first_name = req.body.state.firstname;
  const last_name = req.body.state.lastname;
  const date_of_birth = req.body.state.dob;
  const clinic_name = req.body.state.clinicname;
  console.log("print", first_name, last_name);
  //password = bcrypt.hashSync(req.body.password, salt)
  const text = `SELECT * FROM users_doctors WHERE email = $1; `;

  db.query(text, [email])
    .then(data => {
      //Check if there are users with this email
      if (data.rows.length !== 0 ) {
        res.send("An user with this email already exists, please change email or login");
        // check if password matches
      } else if (password !== confirmpassword) {
        res.send("please confirm the password");
      } else {
        //Create a new user
        const text = `INSERT INTO users_doctors (first_name,
          last_name, date_of_birth, gender, specialization, license, email,
        password, phone, clinic_name, clinic_address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;`;

        const values = [first_name,
          last_name, date_of_birth, gender, specialization, license, email,
        password, phone, clinic_name, clinic_address];
        
        return db.query(text, values)
        .then((savedRows) => {
          res.send(savedRows)
        });

      }
    });

});

//Login
router.post('/login', (req, res) => {
  const email = req.body.state.email;
  const queryDoc = `SELECT * FROM users_doctors WHERE email = $1;`;

    db.query(queryDoc, [email])
      .then(data => {
        if (data.rows.length === 0) {
          res.status(400).send("email does not exist");
        }

        console.log(data.rows[0]);
      });

  // const { email,password } = req.body.state;
  // const text = `SELECT * FROM users_doctors WHERE email = $1;`;
  // db.query(text, [email])
  //   .then(data => {
  //     console.log(data)
  //   })
  //   .catch(err => {res.status(500).json({error: err.message})})
});

///////////////////////////////////////////////////////////////////////////////////

module.exports = router;
