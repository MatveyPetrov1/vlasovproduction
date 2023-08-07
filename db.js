const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: process.env.PG_PASS,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
});

module.exports = pool;
