module.exports = {
    development: {
      client: 'mysql',
      connection:  {
        host: 'db4free.net',
        port: 3306,
        user: 'cgreet7862',
        password: 'cgreet7862',
        database: 'cgreet7862'
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
