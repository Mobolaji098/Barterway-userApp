const express = require('express');
const {check} = require('express-validator');
const multer = require('multer');

// const User = require('../controllers/user');
const Product = require('../controllers/product');
const validate = require('../../src/middlewares/validate');

const router = express.Router();

const storage = multer.memoryStorage();

const maxSize = 6 * 1024 * 1024;
const upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
})


//INDEX
router.get('/', Product.index);

// UPLOAD PRODUCT
router.post('/store' ,upload.array('images'), Product.store);

// UPLOAD PRODUCT IMAGES
//router.post('/storeImg',upload.array('images'),Product.storeImg);

//SHOW USER PRODUCT
router.get('/:userId', Product.show);

//UPDATE USER PRODUCT
router.put('/:userId/:productId',upload.array('images'), Product.update);

// SHOW PRODUCT BY CATEGORIES
router.get('/:userId/:category', Product.category);

// UPDATE PRODUCT LOCATION FROM FRONTEND
router.put('/:productId', Product.updateloc);

// DELETE PRODUCT BY OWNER
router.delete('/:productId', Product.destroy);

 
module.exports = router;