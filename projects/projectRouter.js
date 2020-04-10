const express = require('express');

const projectModel = require('../data/helpers/projectModel');
const actionModel = require('../data/helpers/actionModel');

const router = express.Router();

// ~~~ ENDPOINTS ~~~ //
// GET all projects
router.get('/', (req, res) => {
    projectModel.get()
    .then(projects => {
        res.json(projects)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Projects could not be retrieved." })
    })
})

// GET project by id
router.get('/:id', validateProjId, (req, res) => {
    projectModel.get(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Specified project could not be retrieved." })
    })
})

// GET actions of specified project
router.get('/:id/actions', validateProjId, (req, res) => {
    projectModel.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Could not retrieve actions for the specified project" })
    })
})

// POST/create project
router.post('/', validateProject, (req, res) => {
    projectModel.insert(req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Project could not be created" })
    })
})

// POST/create action for project
router.post('/:id/actions', validateAction, validateProjId, (req, res) => {
    const newAction = { project_id: req.params.id, ...req.body};
    actionModel.insert(newAction)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Action could not be created" })
    })
})

// DELETE project
router.delete('/:id', validateProjId, (req, res) => {
    projectModel.remove(req.params.id)
    .then(count => {
        res.status(200).json({ message: `${count} project(s) has/have been deleted`})
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Specified project could not be deleted" })
    })
})

// PUT/edit project
router.put('/:id', validateProjId, validateProject, (req, res) => {
    projectModel.update(req.params.id, req.body)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Project could not be updated" })
    })
})

// ~~~ MIDDLEWARE ~~~ //
// validate project id
function validateProjId(req, res, next) {
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