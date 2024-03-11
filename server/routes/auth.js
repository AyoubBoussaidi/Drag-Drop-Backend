
'use strict';

const ctrls = require('../controllers/auth/index.js');
const auth = require('../config/middlewares/authorizations');


module.exports = function(router) {

    router.route('/login')
            .post(ctrls.auth.login);

    router.route('/register')
        .post(ctrls.auth.register);
        
      
}
