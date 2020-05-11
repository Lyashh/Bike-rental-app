import knex from "knex";
import doenv from "dotenv";

doenv.config();

const database = {
  client: "postgresql",
  connection: `postgres://${process.env.POSTGRES_USER?.trim()}:${process.env.POSTGRES_PASSWORD?.trim()}@localhost:5432/${
    process.env.POSTGRES_DB
  }`,
  migrations: {
    directory: "migrations",
  },
  seeds: {
    directory: "seeds",
  },
  pool: {
    min: 0,
    max: 7,
    afterCreate: (conn, done) => {
      conn.query('SET timezone="UTC";', (err) => {
        if (err) {
          console.error(err);
        }
        done(err, conn);
      });
    },
  },
} as knex.Config;

export = database;
