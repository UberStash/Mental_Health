// const express = require('express');
// const router = express.Router();

// const {getPostsByUsers} = require('../helpers/dataHelpers');

// module.exports = ({ getUsers, getUsersPosts }) => {
//   /* GET users listing. */
//   router.get('/', (req, res) => {
//     getUsers()
//       .then((users) => res.json(users))
//       .catch((err) => res.json({ err }));
//   });

//   router.get('/posts', (req, res) => {
//     getUsersPosts()
//       .then((users) => res.json(getPostsByUsers(users)))
//       .catch((err) => res.json({ err }));
//   });

//   return router;
// };
