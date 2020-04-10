const express = require('express');

const projectModel = require('../data/helpers/projectModel');

const router = express.Router();

// ~~~ ENDPOINTS ~~~ //
// GET all projects
router.get('/', (req, res) => {
    projectModel.get(req.query)
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Projects could not be retrieved." })
    })
})

// GET project by id

// GET actions of specified project

// POST/create project

// POST/create action for project

// DELETE project

// EDIT project


// ~~~ MIDDLEWARE ~~~ //
// validate project id
function validatedProjId(req, res, next) {
    projectModel.get(req.params.id)
    .then(project => {
        if (project) {
            req.project = project;
            next();
        } else {
            res.status(400).json({ errorMessage: "Invalid project ID" })
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "There was an error", err })
    })
}

// validate project
function validateProject(req, res, next) {
    if (!req.body.name && !req.body.description) {
        res.status(400).json({ errorMessage: "Missing required project data" })
    } else if (!req.body.name) {
        res.status(400).json({ errorMessage: "Missing required name field" })
    } else if (!req.body.description) {
        res.status(400).json({ errorMessage: "Missing required description field" })
    } else {
        next();
    }
}

// validate action
function validateAction(req, res, next) {
    if (!req.body.description && !req.body.notes) {
        res.status(400).json({ errorMessage: "Missing required action data" })
    } else if (!req.body.description) {
        res.status(400).json({ errorMessage: "Missing required description field" })
    } else if (req.body.description.length > 128) {
        res.status(400).json({ errorMessage: "Description must be less than 128 characters" })
    } else if (!req.body.notes) {
        res.status(400).json({ errorMessage: "Missing required notes field" })
    } else {
        next();
    }
}



module.exports = router;