const express = require('express');
const router = express.Router();

const {
   getProducts,
   newProduct,
   getSingleProducts,
   updateProduct,
   deleteProduct
} = require('../controllers/productController');

router.get('/products',getProducts);
router.route('/products/:id').get(getSingleProducts);
router.route('/admin/products/new').post(newProduct);
router.route('/admin/products/:id').put(updateProduct)
                                   .delete(deleteProduct);

module.exports = router;