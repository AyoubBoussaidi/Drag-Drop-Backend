const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  interfaceId: { type: String, required: false },
  widgets: [
    {
      id: { type: String, required: false },
      type: { type: String, required: false },
      label: { type: String, required: false },
      value: { type: String, default: ''},
      max: { type: String, default: ''},
      min: { type: String, default: ''},
      size: { type: String, default: '' },
      checked: { type: String, default: '' },
      textContent: { type: String, default: '' },
      attributes: { type: Object },
    },
  ],
});

module.exports = mongoose.model('Template', templateSchema);
