const pool = require('./pool');

async function createUser(firstname, lastname, email, username, password) {
    await pool.query('INSERT INTO users (firstname, lastname, email, username, password) VALUES ($1, $2, $3, $4, $5)', [firstname, lastname, email, username, password]);
}

async function createMessage(user_id, title, message) {
    await pool.query('INSERT INTO messages (user_id, title, message) VALUES ($1, $2, $3)', [user_id, title, message]);
}

async function getAllMessages() {
    const { rows } = await pool.query('SELECT * FROM messages ORDER BY id DESC');
    return rows;
}

module.exports = {
    createUser,
    createMessage,
    getAllMessages
};