"use strict";
const mongoose = require("mongoose");
const Project = mongoose.model("Project");
const User = mongoose.model("User");

exports.listForEachUser = (req, res) => {
  const findProjects = () => {
    return Project.find({ userId: req.user._id })
      .populate('templates') 
      .exec();
  };

  const respond = (projects) => {
    res.status(200).json(projects);
  };

  const onError = (error) => {
    console.log("error", error);
    res.status(400).json({ err: error });
  };

  findProjects()
    .then(respond)
    .catch(onError);
};

exports.list = (req, res) => {
  const findProjects = () => {
    return Project.find()
      .populate({
        path: 'userId',
        model: User,
        select: 'firstname lastname', 
      })
      .exec();
  };

  const respond = (projects) => {
    const formattedProjects = projects.map((project) => ({
      _id: project._id,
      userId: project.userId,
      name: project.name,
      description: project.description,
      username: `${project.userId.firstname} ${project.userId.lastname}`,
    }));

    res.status(200).json(formattedProjects);
  };

  const onError = (error) => {
    res.status(404).json({ err: error });
  };

  findProjects()
    .then(respond)
    .catch(onError);
};



exports.create = (req, res) => {
  const { userId, name, description } = req.body;
  const createProject = () => {
    const project = new Project({ userId, name,description });
    return project.save();
  };

  const respond = (project) => {
    res.status(201).json(project);
  };

  const onError = (error) => {
    console.log("error", error);
    res.status(400).json({ err: error });
  };

  createProject()
    .then(respond)
    .catch(onError);
};

exports.retreive = (req, res) => {
  const projectId = req.params.id;
  console.log('Project Id : ',projectId)
  const findProjectWithTemplates = () => {
    return Project.findOne({ _id: projectId })
      .populate('templates')
      .exec();
  };

  const respond = (project) => {
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json(project.templates);
  };

  const onError = (error) => {
    console.error("Error retrieving project with templates:", error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  };

  findProjectWithTemplates()
    .then(respond)
    .catch(onError);
};


exports.delete = async (req, res) => {
  const deleteProject = async (projectId) => {
    console.log("proojectID : ", projectId);
    try {
      const deletedProject = await Project.findByIdAndDelete(projectId);
      console.log("proojectID : ", projectId);
      return deletedProject;
    } catch (err) {
      console.error("erreur : ", err);
      throw err;
    }
  };

  try {
    const projectId = req.params.id;
    const deletedProject = await deleteProject(projectId);
    res.status(200).json({ message: 'Project deleted successfully', deletedProject });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: 'Error deleting project', details: error.message });
  }
};


exports.update = (req, res) => {
  const projectId = req.params.id;
  const  updatedTemplateData = req.body;
  const templatesArray = updatedTemplateData
  console.log("projectId : ", projectId, "Templates : ", templatesArray);

  const updateProject = (projectId, templatesArray) => {
    return Project.findOneAndUpdate(
      { _id: projectId },
      { $addToSet: { templates: templatesArray } },
      { new: false }
    ).exec();
  };

  const respond = (updatedProject) => {
    res.status(200).json(updatedProject);
  };

  const onError = (error) => {
    console.error("Error updating project:", error);
    res.status(500).json({ error: 'Error updating project', details: error.message });
  };

  updateProject(projectId, templatesArray)
    .then(respond)
    .catch(onError);
};



