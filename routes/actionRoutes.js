const express = require('express');
const dbActions = require('../data/helpers/actionModel');
const router = express.Router();

router.use(express.json());

//
router.get("/", async (req, res) => {
    try {
        const actions = await dbActions.get();
        res.status(200).json(actions);
    }
    catch(err) {
        res.status(200).json({
            message: "Failed to retrieve actions."
        })
    };
});

router.get("/:actionId", async (req, res) => {
    const { actionId } = req.params;
    try {
        const action = await dbActions.get(actionId);
        res.status(200).json(action);
    }
    catch(err) {
        res.status(500).json({
            message: "Failed to retrieve specific action."
        })
    }
})

router.post("/", async (req, res) => {
    const action = req.body;
    if ( !action.project_id ) {
        return res.status(400).json({
            message: "Project ID is required."
        })
    } else if ( !action.description ) {
        return res.status(400).json({
            message: "Action description is required."
        })
    } else if ( action.description.length > 128 ) {
        return res.status(400).json({
            message: "Description cannot be more than 128 characters. Please revise."
        })
    } else if ( !action.notes ) {
        return res.status(400).json({
            message: "Action notes are required."
        })
    } else {
        try {
            const newAction = await dbActions.insert(action);
            res.status(200).json(newAction);
        } 
        catch(err) {
            res.status(500).json({
                message: "Failed to create new action."
            })
        };
    };
});

module.exports = router;