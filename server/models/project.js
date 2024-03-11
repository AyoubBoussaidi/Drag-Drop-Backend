const mongoose =require('mongoose');


const projectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  templates: [{ 
    type: mongoose.Schema.Types.Mixed, 
    required: false 
  }],
});

module.exports = mongoose.model('Project', projectSchema);
