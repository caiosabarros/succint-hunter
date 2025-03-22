const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllPlatforms = async (req, res, next) => {
    try {
        const result = await mongodb.getDatabase().db("hunter").collection('platforms').find();
        if (!result) throw createHttpError(500, "We're unable to check the database");
        result.toArray().then((platforms) => {
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(platforms);
        });
    } catch (err) {
        next(err);
    }
};

const getSinglePlatform = async (req, res, next) => {
    try {
        const platformId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db("hunter").collection('platforms').findOne({ _id: platformId });
        if (!result) throw createHttpError(500, "We're unable to check the database");
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const createPlatform = async (req, res, next) => {
    try {
        const platform = {
            name: req.body.name,
            web3: req.body.web3,
            url: req.body.url,
            description: req.body.description,
        };
        const response = await mongodb.getDatabase().db("hunter").collection('platforms').insertOne(platform);
        if (response.acknowledged > 0) {
            res.status(204).send();
        } else {
            throw createHttpError(500, "Error creating platform");
            // res.status(500).json(response.error || "Error creating platform");
        }
    } catch (err) {
        next(err);
    }
}

const updatePlatform = async (req, res, next) => {
    const platformId = new ObjectId(req.params.id);
    try {
        const platform = {
            name: req.body.name,
            web3: req.body.web3,
            url: req.body.url,
            description: req.body.description,
        };
        const response = await mongodb.getDatabase().db("hunter").collection('platforms').replaceOne({ _id: platformId }, platform);
        if (!response) throw createHttpError(500, "We're unable to update the database");
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            throw createHttpError(500, "Error updating platform");
            // res.status(500).json(response.error || "Error updating platform");
        }
    } catch (err) {
        next(err);
    }
}

const deletePlatform = async (req, res, next) => {
    try {
        const platformId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db("hunter").collection('platforms').deleteOne({ _id: platformId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            // res.status(500).json(response.error || "Error deleting platform");
            if (!response) throw createHttpError(500, "Error deleting platform");
        }
    } catch (err) {
        next(err);
    }
}


module.exports = {
    getSinglePlatform, getAllPlatforms, updatePlatform, createPlatform, deletePlatform
};