import React from 'react';

class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
        }
    }
    componentDidMount() {
        this.getProjects("http://localhost:9000/projects");
    }
    getProjects = URL => {
        fetch(URL)
        .then ( res => {
            return res.json();
        })
        .then ( data => {
            this.setState({
                projects: data,
            })
        })
        .catch ( err => console.log(err));
    };
    render() {
        return (
            <div>
                {this.state.projects.map( project => {
                    return (
                        <div key={project.id}>
                            <p>Project Name: {project.name}</p>
                            <p>Project Description: {project.description}</p>
                        </div>
                    )
                })}
            </div>
        );
    };
};

export default Projects;