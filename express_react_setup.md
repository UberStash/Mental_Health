# Express Back-End with React Front-End

## Install generator

`npm install -g express-generator`

## Install The Back-End

- `express --view=ejs final-project-name`
- cd final-project-name && npm install
- edit bin/www and change the port to 3001
- add console.log to onListening and add a start script
- create .gitignore
- git init
- install nodemon:

`npm install nodemon --save-dev`

- add 'dev' script to start nodemon with `npm run dev`

## Additonal useful middleware

- dotenv

## Create the database

`createdb final_project_name -O labber`

## configure Knex

- npm install knex -g
- npm install knex --save
- knex init
- configure development to use postgresql
- add your credentials in .env files and configure knexfile.js

```js
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
```

in dotenv

```s
DB_HOST = localhost
DB_USER = labber
DB_PASS = labber
DB_NAME = final_project
DB_PORT = 5432
```

- make sure migrations and seeds are added to './db' folder in knexfile.js

```js
  migrations: {
    directory: './db/knex_migrations',
  },
  seeds: {
    directory: './db/knex_seeds',
  },
```

- add dotenv (\* add to gitignore) npm install dotenv --save
- require knex and dotenv in app.js

```js
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig['development']);
require('dotenv').config();
```

- install pg

`npm install pg --save`

- Create the database with owner

  `createdb final_project -O labber`

## Migrations

- create migrations

  `knex migrate:make migration_name`

```js
exports.up = function(knex) {
  return knex.schema.createTable('users', t => {
    t.increments('id')
      .primary()
      .unsigned();
    t.string('first_name');
    t.string('last_name');
    t.string('email');
    t.string('password');
    t.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};

exports.up = function(knex) {
  return knex.schema.createTable('quotes', table => {
    table
      .increments('id')
      .primary()
      .unsigned();
    table.string('content');
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .notNull()
      .onDelete('cascade');
  });
};

exports.down = function(knex) {};
```

## Seeds

- Create seed files for populating the database
- Create seed file with `knex seed:make fileName`
- Seeds are executed in alphabetical order, so you might want to precede filenames with a letter (ex.: a_addUsers.js, b_addPolls.js)
- To restart auto increments at 1 each time the seed file runs, use Promise.all and ALTER SEQUENCE query:

```js
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('users').del(),
    knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1'),
    knex('users').then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          first_name: 'SpongeBob',
          last_name: 'Squarepants',
          email: 'bob@sq.com',
          password: 'test',
        },
      ]);
    }),
  ]);
};
```

```js
const faker = require('faker');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('quotes').del(),
    knex.raw('ALTER SEQUENCE quotes_id_seq RESTART WITH 1'),
    knex('quotes').then(function() {
      // Inserts seed entries
      return knex('quotes').insert([
        {
          content: faker.hacker.phrase(),
          user_id: 1,
        },
        {
          content: faker.hacker.phrase(),
          user_id: 1,
        },
        {
          content: faker.hacker.phrase(),
          user_id: 1,
        },
        {
          content: faker.hacker.phrase(),
          user_id: 1,
        },
        {
          content: faker.hacker.phrase(),
          user_id: 1,
        },
      ]);
    }),
  ]);
};
```

- `npm install --save-dev faker` and require faker if fake data is needed.

## configure routing and helpers

### db Helpers

- Create `dbHelpers.js` in a `helpers` folder

- Create a module in dbHelpers.js

```js
module.exports = knex => {
  const getUsers = () => {
    return knex.select('*').from('users');
  };

  return {
    getUsers,
  };
};
```

- Add the require at the top of the server

`const dbHelpers = require('./helpers/dbHelpers')(knex);`

### Change The Router

- use the following in the users router

```js
const express = require('express');
const router = express.Router();

module.exports = ({ getUsers }) => {
  router.get('/', function(req, res) {
    getUsers()
      .then(result => {
        res.json(result);
      })
      .catch(err => console.log(`Error retrieving data: ${err.message}`));
  });

  return router;
};
```

## Creating a Join with Knex

- in dbHelpers, add the following function

```js
const getQuotesForUser = id => {
  return knex
    .select('*')
    .from('users')
    .innerJoin('quotes', 'users.id', 'quotes.user_id')
    .where('users.id', '=', id);
};
```

- add the route in users

- add the proper app.use for the users router in server

`app.use('/api/users', usersRouter(dbHelpers));`

## Install the Front-End

Make sure create-react-app is installed globally:

`npm i -g create-react-app`

At the root of the project folder, type the following:

`create-react-app client`

(make sure you have node 8.12.0 or above)

Install Axios

`npm install axios`

Create a `useEffect` hook to load the users

```js
import { useEffect, useReducer } from 'react';
import dataReducer, { SET_USERS } from '../reducer/data_reducer';
import axios from 'axios';

const useApplicationData = () => {
  const [state, dispatch] = useReducer(dataReducer, {
    users: [],
    loading: true,
  });
  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/users',
    })
      .then(({ data }) => {
        console.log(data);
        dispatch({ type: SET_USERS, users: data });
      })
      .catch(err => console.log(err));
  }, []);

  return {
    state,
    dispatch,
  };
};

export default useApplicationData;
```

Create a `Reducer` fct to update the state

```js
export const SET_USERS = 'SET_USERS';

const dataReducer = (state, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users,
        loading: false,
      };
    default:
      return state;
  }
};

export default dataReducer;
```

Display the list of users in App

```js
const App = () => {
  const { state, dispatch } = useApplicationData();
  const userList = state.users.map(user => (
    <li key={user.id}>
      {user.first_name} {user.last_name} {user.email}
    </li>
  ));
  return (
    <div className='App'>
      <h1>Users</h1>

      <ul>{userList}</ul>
    </div>
  );
};
```

To use Sass, install node-sass

`npm i node-sass`

## Ports

- React front-end is running on port 3000
- Rails back-end is running on port 3001 (or any other)

## Cors

**Cross-Origin Resource Sharing**

- A web application makes a cross-origin HTTP request when it requests a resource that has a different domain (i.e. different ports)
- Web application using APIs can only request HTTP resources from the same origin the application was loaded from, unless the response from the other origin includes the right CORS headers.

## Proxy API Calls on The Client

Add a proxy to package.json:

```js
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "proxy": "http://localhost:3001",
...
```

## References

[Create React App with an Express Backend](https://daveceddia.com/create-react-app-express-backend/)

[Access-Control-Allow-Origin: Dealing with CORS Errors in React and Express](https://daveceddia.com/access-control-allow-origin-cors-errors-in-react-express/)

[Deploy React and Express to Heroku](https://daveceddia.com/deploy-react-express-app-heroku/)
