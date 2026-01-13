const Product = require('../models/productModel');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.getAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addProduct = async (req, res) => {
    try {
        const { title, price, description, image_url, category_id } = req.body;
        
        // Eğer authMiddleware yoksa user_id'yi 1 kabul et (Test için)
        const user_id = req.user ? req.user.id : 1; 
        
        const newProduct = await Product.create(
            title, 
            price, 
            description, 
            image_url || 'https://via.placeholder.com/150', 
            user_id, 
            category_id || 1
        );
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.id;
        const deleted = await Product.delete(id, user_id);
        if (!deleted) return res.status(404).json({ message: "İlan bulunamadı" });
        res.json({ message: "İlan silindi" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};