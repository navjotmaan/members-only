require('dotenv').config();
const { Client } = require('pg');

const SQL = `

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255),
    password VARCHAR(255),
    membership BOOLEAN
);

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title TEXT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT
);
`;

const connectionString = process.env.DATABASE_URL;

const client = new Client(
    connectionString
    ? {
        connectionString,
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

async function main() {
    try {
        await client.connect();
        await client.query(SQL);
        console.log("Table created successfully!");
    } catch (err) {
        console.log("Error creating database:", err);
    } finally {
        await client.end();
    }
}

main();