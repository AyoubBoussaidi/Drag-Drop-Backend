
'use strict';

const mongoose = require('mongoose');
const Template = mongoose.model('Template');
const User = require('../../models/user');


exports.create = (req, res) => {
  const { userId, name, widgets } = req.body; 

  const findUserById = () => {
    return User.findById(userId);
  };

  const createTemplate = (user) => {
    if (!user) {
      throw new Error('User not found'); 
    }
    const templateData = {
      userId,
      name,
      widgets,
    };
    return Template.create(templateData);
  };

  const respond = (template) => {
    res.status(200).json(template);
  };

  const onError = (error) => {
    console.log('Error saving template:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  };

  findUserById()
    .then(createTemplate)
    .then(respond)
    .catch(onError);
};


exports.retreive = (req, res) => {
  const templateId = req.params.id;
  console.log('Template Id : ',templateId)
  const findtemplate= () => {
    return Template.findOne({ _id: templateId })
      .populate('widgets') 
      .exec();
  };

  const respond = (template) => {
    if (!template) {
      return res.status(404).json({ error: 'template not found' });
    }

    res.status(200).json(template.widgets);
  };

  const onError = (error) => {
    console.error("Error retrieving template with widgets:", error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  };

  findtemplate()
    .then(respond)
    .catch(onError);
};

exports.render = (req, res) => {
  const id = req.params.id; 

  Template.findById(id)
      .then(template => {
          if (!template) {
              return res.status(404).send('Template not found');
          }

          res.render('template', { widgets: template.widgets,template: template });
      })
      .catch(error => {
          console.error('Error fetching widgets:', error);
          res.status(500).send('Internal Server Error');
      });
};


exports.update = (req, res) => {
  const { userId, name, widgets } = req.body;
  const id = req.params.id;

  let currentUser;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new Error('User not found');
      }

      currentUser = user;

      const templateData = {
        userId,
        name,
        widgets,
      };

      return Template.findByIdAndUpdate(id, templateData, { new: false });
    })
    .then((updatedTemplate) => {
      if (!updatedTemplate) {
        return res.status(404).json({ error: 'Template not found' });
      }

      res.status(200).json(updatedTemplate);
    })
    .catch((error) => {
      console.error('Error updating template:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    });
};