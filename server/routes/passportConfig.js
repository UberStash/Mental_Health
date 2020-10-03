const { LocalInstance } = require("twilio/lib/rest/api/v2010/account/availablePhoneNumber/local")

const LocalStrategy = require("passport-local").Strategy;
const db = require('../db');
const bcrypt = require('bcrypt');


function initialize (passport) {

  cosnt authenticateUser = (email, password, done) => {
    
    //queryPat = `SELECT * FROM users_patients WHERE email = $1;`;
    queryDoc = `SELECT * FROM users_doctors WHERE email = $1;`;

    db.query(queryDoc, [email])
      .then(data => {
        if (data.rows.length === 0) {
          res.status(400).send("email does not exist");
        }

        const user = data.rows[0];

        if (bcrypt.compare(password, user.password)) {
          return user;
        } else {
          res.status(400).send("Email / password combination do not match");
        }

      });
  }


  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );
}