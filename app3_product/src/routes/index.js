const product = require('./product')

const authenticate = require('../middlewares/authenticate');

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(200).send({ message: "Welcome to the PRODUCTS API of barterway."});
    });

    app.use('/product', authenticate, product);
};