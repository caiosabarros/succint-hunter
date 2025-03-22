const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const createHttpError = require("http-errors");


const getAll = async (req, res, next) => {
    try {
        const projects = await mongodb.getDatabase().db("hunter").collection('projects').find();
        if (!projects) throw createHttpError(500, "We're unable to check the database");
        projects.toArray().then((projects) => {
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(projects);
        });
    } catch (err) {
        next(err);
    }
};

const getSingle = async (req, res, next) => {
    const projectId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().db("hunter").collection('projects').findOne({ _id: projectId });
        if (!result) throw createHttpError(500, "We're unable to find this document");
        result.then((projects) => {
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(projects[0]);
        });
    } catch (err) {
        next(err);
    }
};

const createProject = async (req, res, next) => {
    try {
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
            throw createHttpError(500, "Unable to create a project in the database");
            // res.status(500).json(response.error || "Error creating project");
        }
    } catch (err) {
        next(err);
    }
}

const updateProject = async (req, res, next) => {
    try {
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
            throw createHttpError(500, "Error updating project");
            // res.status(500).json(response.error || "Error updating project");
        }
    } catch (err) {
        next(err);
    }
}

const deleteProject = async (req, res, next) => {
    const projectId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDatabase().db("hunter").collection('projects').deleteOne({ _id: projectId });
        console.log(response);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            throw createHttpError(404, "Error deleting project");
            // res.status(500).json(response.error || "Error deleting project");
        }
    } catch (err) {
        next(err);
    }
}


module.exports = {
    getSingle, getAll, updateProject, createProject, deleteProject
};