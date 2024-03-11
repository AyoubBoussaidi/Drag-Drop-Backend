'use strict';

const templateCtrls = require('../controllers/template/index.js'); 

module.exports = function(router) {
  router.route('/interface')
    .post(templateCtrls.template.create)
  
  router.route('/interface/:id/get')//interface/id/render  get
    .get(templateCtrls.template.render);
  

  router.route('/interface/:id')
    .get(templateCtrls.template.retreive)
    .patch(templateCtrls.template.update)
  
};


