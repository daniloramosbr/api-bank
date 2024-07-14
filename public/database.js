"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
require("dotenv/config");
const { POSTGRES_URL } = process.env;
const pool = new Pool({
    connectionString: POSTGRES_URL,
});
pool.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.stack);
    }
    else {
        console.log("Connected to the database!");
    }
});
exports.default = pool;
