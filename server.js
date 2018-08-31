const express = require('express');
const server = express();
const cors = require('cors');

server.use(express.json());
server.use(cors());

//db
const dbProjects = require('./data/helpers/projectModel');
const dbActions = require('./data/helpers/actionModel');

//PROJECTS
server.get("/projects", async (req, res) => {
    try {
        const projects = await dbProjects.get();
        res.status(200).json(projects);
    }
    catch(err) {
        res.status(500).json({ 
            message: "Failed to retrieve projects."
        })
    }
})

server.get("/projects/:projectId", async (req, res) => {
    const { projectId } = req.params;
    try { 
        const project = await dbProjects.get(projectId);
        res.status(200).json(project);
    }
    catch(err) {
        res.status(500).json({
            message: "Failed to retrieve specific project."
        })
    };
});

//ACTIONS
server.get("/actions", async (req, res) => {
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

server.get("/actions/:actionId", async (req, res) => {
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


server.listen(9000, () => console.log("====API on Port 9000===="))
