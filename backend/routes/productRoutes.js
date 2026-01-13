const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');


router.get('/', productController.getProducts);

router.post('/', productController.addProduct);

router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;