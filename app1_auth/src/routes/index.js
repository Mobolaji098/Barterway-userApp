const express = require('express');
const {check} = require('express-validator');

const Auth = require('../controllers/auth');
const Password = require('../controllers/password');
const validate = require('../middlewares/validate');

const router = express.Router();

module.exports = app => {
 
app.get('/', (req, res) => {
    res.status(200).json({message: "You are in the Auth Endpoint. Register or Login to test Authentication."});
});

app.post('/register', [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').not().isEmpty().isLength({min: 8}).withMessage('Must be at least 8 chars long'),
    check('userName').not().isEmpty().withMessage('Your username is required'),
    check('confirmPassword').not().isEmpty().withMessage('Your confirmPassword is required'),
], validate, Auth.register);


app.post("/login", [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').not().isEmpty(),
], validate, Auth.login);


//EMAIL Verification
app.get('/verify/:token', Auth.verify);
app.post('/resend', Auth.resendToken);

//Password RESET
app.post('/recover', [
    check('email').isEmail().withMessage('Enter a valid email address'),
], validate, Password.recover);

app.get('/reset/:token', Password.reset);

app.post('/reset/:token', [
    check('password').not().isEmpty().isLength({min: 8}).withMessage('Must be at least 8 chars long'),
    check('confirmPassword', 'Passwords do not match').custom((value, {req}) => (value === req.body.password)),
], validate, Password.resetPassword);

};