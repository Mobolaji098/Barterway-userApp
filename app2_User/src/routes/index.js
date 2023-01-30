const user = require('./user');

const authenticate = require('../middlewares/authenticate');

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(200).send({ message: "Welcome to the AUTHENTICATION API of barterway. Register or Login to test Authentication."});
    });
    app.use('/user', authenticate, user);
};