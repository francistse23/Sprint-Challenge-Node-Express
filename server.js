const express = require('express');
const server = express();
const cors = require('cors');

server.use(express.json());
server.use(cors());

// //MIDDLEWARE
// function validateProjectId ( req, res, next ) {
//     const { projectId } = req.params;
//     console.log(projectId);
//     if ( !projectId ) {
//         res.status(400).json({
//             message: "Specified ProjectID does not exist. Failed to create action on project."
//         })
//     }
//     else {
//         next();
//     }
// }

const projectRoutes = require("./routes/projectRoutes");
const actionRoutes = require("./routes/actionRoutes");

server.use("/projects", projectRoutes);
server.use("/actions", actionRoutes);

server.listen(9000, () => console.log("====API on Port 9000===="))
