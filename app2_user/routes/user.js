const express = require('express');
const {check} = require('express-validator');
const multer = require('multer');

const User = require('../controllers/user');
// const validate = require('../middlewares/validate');

const router = express.Router();

const storage = multer.memoryStorage();

const maxSize = 6 * 1024 * 1024;
const upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
})

//INDEX
router.get('/', User.index);

//STORES
// router.post('/', [
//     check('email').isEmail().withMessage('Enter a valid email address'), 
//     check('userName').not().isEmpty().withMessage('Your username is required'),
//     check('phoneNumber').not().isEmpty().withMessage('Your phone number required'),
// ], validate, User.store);

//SHOW
router.get('/:id',  User.show);

//UPDATE
router.put('/:id', upload.single('profileImage'), User.update);

//UPDATE USER LOCATION
router.put('/loc/:id', User.updateloc);

//DELETE
router.delete('/:id', User.destroy);

module.exports = router;