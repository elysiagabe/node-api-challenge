import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
// components
import Header from './components/Header';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route path="/projects/:id" component={ProjectDetails} />
        <Route path="/" component={Projects} />
      </Switch>
    </div>
  );
}

export default App;
