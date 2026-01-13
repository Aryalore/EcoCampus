const pool = require('../config/db');

const User = {
    create: async (username, email, password) => {
        const query = 'INSERT INTO Users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
        const values = [username, email, password];
        const result = await pool.query(query, values);
        return result.rows[0];
    },
    findByEmail: async (email) => {
        const query = 'SELECT * FROM Users WHERE email = $1';
        const result = await pool.query(query, [email]);
        return result.rows[0];
    }
};

module.exports = User;