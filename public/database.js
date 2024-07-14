"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg = require('pg');
const { Pool } = pg;
const connectdb = () => {
    const pool = new Pool({
        connectionString: process.env.POSTGRES_URL,
    });
    pool.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
        }
        else {
            console.log('Connected to the database!');
        }
    });
};
exports.default = connectdb;
