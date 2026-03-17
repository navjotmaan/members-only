const pool = require('./pool');

async function createUser(firstname, lastname, email, username, password) {
    await pool.query('INSERT INTO users (firstname, lastname, email, username, password) VALUES ($1, $2, $3, $4, $5)', [firstname, lastname, email, username, password]);
}

module.exports = {
    createUser
}