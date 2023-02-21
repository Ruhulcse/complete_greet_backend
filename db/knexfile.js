module.exports = {
    development: {
      client: 'pg',
      connection:  {
        database: "Greet",
        user: "postgres",
        password: "123",
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: 'knex_migrations',
      },
    },
  };