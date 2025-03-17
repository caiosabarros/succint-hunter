const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllPlatforms = async (req, res) => {
    const result = await mongodb.getDatabase().db("hunter").collection('platforms').find();
    result.toArray().then((platforms) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(platforms);
    });
};

const getSinglePlatform = async (req, res) => {
    const platformId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db("hunter").collection('platforms').find({ _id: platformId });
    result.toArray().then((platforms) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(platforms[0]);
    });
};

const createPlatform = async (req, res) => {
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
        res.status(500).json(response.error || "Error creating platform");
    }
}

const updatePlatform = async (req, res) => {
    const platformId = new ObjectId(req.params.id);

    const platform = {
        assets: req.body.assets,
        language: req.body.language,
        slug: req.body.slug,
        githubUrl: req.body.githubUrl,
        description: req.body.description,
        maxBounty: req.body.maxBounty,
    };
    const response = await mongodb.getDatabase().db("hunter").collection('platforms').replaceOne({ _id: platformId }, platform);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Error updating platform");
    }
}

const deletePlatform = async (req, res) => {
    const platformId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db("hunter").collection('platforms').deleteOne({ _id: platformId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Error deleting platform");
    }
}


module.exports = {
    getSinglePlatform, getAllPlatforms, updatePlatform, createPlatform, deletePlatform
};