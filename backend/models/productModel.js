const pool = require('../config/db');

const Product = {
    getAll: async () => {
        const query = 'SELECT * FROM Products ORDER BY id DESC';
        const result = await pool.query(query);
        return result.rows;
    },
    create: async (title, price, description, image_url, user_id, category_id) => {
        const query = 'INSERT INTO Products (title, price, description, image_url, user_id, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const values = [title, price, description, image_url, user_id, category_id];
        const result = await pool.query(query, values);
        return result.rows[0];
    },
    delete: async (id, user_id) => {
        const query = 'DELETE FROM Products WHERE id = $1 AND user_id = $2 RETURNING *';
        const result = await pool.query(query, [id, user_id]);
        return result.rows[0];
    }
};

module.exports = Product;