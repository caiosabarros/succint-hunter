const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db("hunter").collection('projects').find();
    result.toArray().then((projects) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(projects);
    });
};

const getSingle = async (req, res) => {
    const projectId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db("hunter").collection('projects').find({ _id: projectId });
    result.toArray().then((projects) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(projects[0]);
    });
};

const createProject = async (req, res) => {
    const project = {
        assets: req.body.assets,
        language: req.body.language,
        slug: req.body.slug,
        githubUrl: req.body.githubUrl,
        description: req.body.description,
        maxBounty: req.body.maxBounty,
    };
    const response = await mongodb.getDatabase().db("hunter").collection('projects').insertOne(project);
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Error creating project");
    }
}

const updateProject = async (req, res) => {
    const projectId = new ObjectId(req.params.id);

    const project = {
        assets: req.body.assets,
        language: req.body.language,
        slug: req.body.slug,
        githubUrl: req.body.githubUrl,
        description: req.body.description,
        maxBounty: req.body.maxBounty,
    };
    const response = await mongodb.getDatabase().db("hunter").collection('projects').replaceOne({ _id: projectId }, project);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Error updating project");
    }
}

const deleteProject = async (req, res) => {
    const projectId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db("hunter").collection('projects').deleteOne({ _id: projectId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Error deleting project");
    }
}


module.exports = {
    getSingle, getAll, updateProject, createProject, deleteProject
};