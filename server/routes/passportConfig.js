
const db = require('../db');
const bcrypt = require('bcrypt');
const LocalStrategy = require("passport-local").Strategy;
//const passport = require('passport');

module.exports = function (passport) {

  passport.use(
    new LocalStrategy({usernameField: "email" },(email, password, done) => {
      console.log("calling passport")
      const queryDocByEmail = `SELECT * FROM users_doctors WHERE email = $1;`;
      const queryDocById = `SELECT * FROM users_doctors WHERE id = $1;`;
      db.query(queryDocByEmail, [email])
      .then(data => {
        if (data.rows.length === 0) {
         
          return done(null, false);
        }
        
        const user = data.rows[0];
        console.log("PRINT USER: ", user);
        if(bcrypt.compareSync(password, user.password)) {

          done(null, user);
        } else {
          
          done(null, false)
        };

      });
     
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {

    db.query(queryDocById, [id])
      .then((res) => {
        if (data.rows.length === 0) {
          return cb(null, user);
        }
      })
  })
};