"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
const ConnectDb = () => {
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
exports.default = ConnectDb;
