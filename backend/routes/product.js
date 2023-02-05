const express = require('express');
const router = express.Router();

const {
   getProducts,
   newProduct,
   getSingleProducts,
   updateProduct,
   deleteProduct
} = require('../controllers/productController');
const {isAuthenticatedUser} = require('../middleware/auth');
router.route('/products').get(getProducts);
router.route('/products/:id').get(getSingleProducts);
router.route('/admin/products/new').post(isAuthenticatedUser,newProduct);
router.route('/admin/products/:id').put(isAuthenticatedUser,updateProduct)
                                   .delete(isAuthenticatedUser,deleteProduct);

module.exports = router;