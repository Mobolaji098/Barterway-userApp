const express = require('express');
const {check} = require('express-validator');
// const multer = require('multer');

// const User = require('../controllers/user');
const Product = require('../controllers/product');
const validate = require('../middlewares/validate');

const router = express.Router();

// const upload = multer().single('profileImage');

//INDEX
router.get('/', Product.index);

// UPLOAD PRODUCT
router.post('/store', [
    check('name').not().isEmpty().withMessage('Name of product is required'),
   // check('weight').not().isEmpty().withMessage('Product weight required'),
    check('description').not().isEmpty().withMessage('Product description is required'),
    check('categories').not().isEmpty().withMessage('Product categories required'),
    check('itemInReturn').not().isEmpty().withMessage('Your itemInReturn required'),
    check('bartercoin').not().isEmpty().withMessage('Bartercoin equivalent required'),
], validate, Product.store);

//SHOW USER PRODUCT
router.get('/:userId', Product.show);

//UPDATE USER PRODUCT
router.put('/:userId/:productId', Product.update);

// SHOW PRODUCT BY CATEGORIES
router.get('/:userId/:category', Product.category);

// UPDATE PRODUCT LOCATION FROM FRONTEND
router.put('/:productId', Product.updateloc);

// DELETE PRODUCT BY OWNER
router.delete('/:productId', Product.destroy);

 
module.exports = router;