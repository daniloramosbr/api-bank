import pg from "pg";

const { Pool } = pg;

import 'dotenv/config' 

const { POSTGRES_URL } = process.env

const pool = new Pool({
  connectionString: POSTGRES_URL,
});

pool.connect((err: any) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
  } else {
    console.log("Connected to the database!");
  }
});

export default pool;