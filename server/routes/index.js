
const express = require('express');
const { videoToken } = require('./tokens');
const config = require('./config');
const router = express.Router();
const db = require('../db');
const { JobContext } = require('twilio/lib/rest/bulkexports/v1/export/job');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const salt = bcrypt.genSaltSync(saltRounds);

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
