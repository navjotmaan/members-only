require('dotenv').config();
const { Pool } = require('pg');

const isProduction = process.env.DATABASE_URL;

const pool = new Pool(
    isProduction 
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    }
    : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    }
);

pool.on('connect', () => {
    console.log('Connected to the database');
});

pool.on('error', (err) => {
    console.log('Unexpected error:', err);
    process.exit(-1);
});

module.exports = pool;