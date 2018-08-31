import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Projects from "./components/Projects";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Link to="/projects">Projects</Link>
        <Route exact path="/projects" component={Projects} />
      </div>
    );
  }
}

export default App;
