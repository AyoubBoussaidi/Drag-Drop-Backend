'use strict';

const ctrls = require('../controllers/users/index.js');
const auth = require('../config/middlewares/authorizations');

module.exports = function(router) {
    if (!router || typeof router.route !== 'function') {
        throw new Error('Invalid router provided to user routes.');
    }

    router.route('/user')//user
        .get(auth.requiresLogin, ctrls.user.getUsers);

    router.route('/user/:userId')
        .get(auth.requiresLogin, ctrls.user.getSingleUser)
        .patch(auth.requiresLogin, ctrls.user.updateUser)
        .delete(auth.requiresLogin, ctrls.user.deleteUser);
};
