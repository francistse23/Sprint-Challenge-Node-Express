const express = require('express');
const dbProjects = require('../data/helpers/projectModel');
const router = express.Router();

router.use(express.json());

//PROJECTS
router.get("/", async (req, res) => {
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

router.get("/:projectId", async (req, res) => {
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

router.get("/:projectId", async (req, res) => {
    const { projectId } = req.params;
    try { 
        const projectActions = await dbProjects.getProjectActions(projectId);
        res.status(200).json(projectActions);
    }
    catch(err) {
        res.status(500).json({
            message: "Failed to retrieve specific project."
        })
    };
});

router.post("/", async (req, res) => {
    const project = req.body;
    if ( !project.name ) {
        return res.status(400).json({
            message: "Please enter a project name."
        });
    } else if ( project.name.length > 128 ) {
        return res.status(400).json({
            message: "Project name cannot be more than 128 characters. Please revise."
        })
    } else if ( !project.description ) {
        return res.status(400).json({
            message: "Please enter project description."
        })
    } else {
        try {
            const newProject = await dbProjects.insert(project);
            res.status(200).json(newProject);
        }
        catch(err) {
            res.status(500).json({
                message: "Failed to create new project."
            })
        };
    };
});

router.put("/:projectId", async (req, res) => {
    const { projectId } = req.params;
    const updated = req.body;
    if ( !projectId ) {
        return null;
    } else if ( !updated.name || updated.name.length > 128) {
        return res.status(400).json({
            message: "Project name is required. Project name cannot be more than 128 characters."
        })
    } else if ( !updated.description ) {
        return res.status(400).json({
            message: "Please enter project description."
        })
    } else {
        try {
            const updatedProject = await dbProjects.update(projectId, updated);
            res.status(200).json(updatedProject);
        }
        catch(err) {
            res.status(500).json({
                message: "Updated failed."
            })
        };
    };
});

router.delete("/:projectId", async (req, res) => {
    const { projectId } = req.params;
    try {
        const deleteProject = await dbProjects.remove(projectId);
        res.status(200).json({
            message: "Project deleted."
        })
    }
    catch(err) {
        res.status(500).json({
            message: "Failed to delete project."
        });
    };
});

module.exports = router;