// //patient id (logged in) find users docs address join


// const express = require('express');
// const router = express.Router();

// module.exports = (db) => {
//   router.get("/api/directionTo", (req, res) => {
//     db.query(`SELECT users_doctors.id AS Doc_id, clinic_address, users_patients.id AS Patient_id,
//     FROM users_doctors
//     JOIN user_patients ON users_patients.id =  `)
//       .then(data => {
//         console.log("data.rows", data.rows)
//         const address = data.rows;

//         res.render('index', { address: data.rows });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });

//   return router;
// };
