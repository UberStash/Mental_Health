exports.up = function(knex) {
  return knex.schema.createTable('quotes', t => {
    t.increments('id')
      .primary()
      .unsigned();
    t.string('content');

    t.integer('user_id')
      .references('id')
      .inTable('users')
      .notNull()
      .onDelete('cascade');
    t.timestamps(true, true);
  });
};

exports.down = function(knex) {};
