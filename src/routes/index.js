const auth = require('../../app1_auth/routes/auth');
const user = require('../../app2_user/routes/user');
const product = require('../../app3_product/routes/product')

const authenticate = require('../middlewares/authenticate');

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(200).send({ message: "Welcome to the API ENDPOINT of barterway."});
    });

    app.use('/api/auth', auth);
    app.use('/api/user', authenticate, user);
    app.use('/api/product', authenticate, product);
};