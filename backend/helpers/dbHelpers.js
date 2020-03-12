module.exports = knex => {
  const getUsers = () => {
    return knex.select('*').from('users');
  };

  const getQuotesForUser = id => {
    return knex
      .select('*')
      .from('users')
      .innerJoin('quotes', 'users.id', 'quotes.user_id')
      .where('users.id', '=', id);
  };

  return {
    getUsers,
    getQuotesForUser,
  };
};
