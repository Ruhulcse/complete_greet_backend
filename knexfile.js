module.exports = {
    development: {
      client: 'mysql',
      // connection:  {
      //   database: "Greet",
      //   user: "postgres",
      //   password: "123",
      // },
      // connection:  {
      //   host: 'db4free.net',
      //   port: 3306,
      //   user: 'cgreet7862',
      //   password: 'cgreet7862',
      //   database: 'cgreet7862'
      // },
      connection:  {
        host: 'db4free.net',
        port: 3306,
        user: 'sysadmin23',
        password: 'admin123',
        database: 'nestjsdb_2023'
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