module.exports = {
    development: {
      client: 'pg',
      connection:  {
        host: "mahmud.db.elephantsql.com",
        database: "dyccrzdr",
        user: "dyccrzdr",
        password: "rihhes34BSXjgYImtFDRX--s5QIvstsy",
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