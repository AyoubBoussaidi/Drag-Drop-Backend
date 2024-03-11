'use strict';

const projectCtrls = require('../controllers/project/index.js'); 

module.exports = function(router) {
  router.route('/project')
    .get(projectCtrls.project.list)// list retreive
    .post(projectCtrls.project.create)//create

  router.route('/user/project')
    .get(projectCtrls.project.listForEachUser)
  
  router.route('/project/:id')
  .get(projectCtrls.project.retreive)
  .patch(projectCtrls.project.update)
  .delete(projectCtrls.project.delete)
  
  
};


