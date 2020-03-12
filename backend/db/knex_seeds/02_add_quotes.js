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
