const express = require('express');

const actionModel = require('../data/helpers/actionModel');
const projectModel = require('../data/helpers/projectModel');

const router = express.Router();

// ~~~ ENDPOINTS ~~~ //
// GET all actions
router.get('/', (req, res) => {
    actionModel.get()
    .then(actions => {
        res.json(actions)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Actions could not be retrieved." })
    })
})

// GET action by id
router.get('/:id', validateActionId, (req, res) => {
    actionModel.get(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Specified action could not be retrieved." })
    })
})

// Should I include POST/create action? probably
router.post('/', validateAction, validateProjId, (req, res) => {
    const newAction = { ...req.body };
    actionModel.insert(newAction)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Action could not be created" })
    })
})

// DELETE action
router.delete('/:id', validateActionId, (req, res) => {
    actionModel.remove(req.params.id)
    .then(count => {
        res.status(200).json({ message: `${count} action(s) has/have been deleted`})
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Specified action could not be deleted" })
    })
})

// PUT/edit action
router.put('/:id', validateActionId, validateAction, (req, res) => {
    actionModel.update(req.params.id, req.body)
    .then(a => {
        res.status(200).json(a)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Action could not be updated" })
    })
})


// ~~~ MIDDLEWARE ~~~ //
// validate action id
function validateActionId(req, res, next) {
    actionModel.get(req.params.id)
    .then(action => {
        if (action) {
            req.action = action;
            next();
        } else {
            res.status(400).json({ errorMessage: "Invalid action ID" })
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "There was an error", err })
    })
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

// validate project id
function validateProjId(req, res, next) {
    projectModel.get(req.body.project_id)
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


module.exports = router;