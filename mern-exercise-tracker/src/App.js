import React from 'react';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ExerciseList from './components/ExerciseList.js';
import EditExercise from './components/EditExercise.js';
import CreateExercise from './components/CreateExercise.js';
import CreateUser from './components/CreateUser.js';

function App() {
  return (
    <div className='container'>
      <Router />
      <NavBar />
      <br />
      <Route path='/' exact component={ExerciseList} />
      <Route path='/edit/:id' component={EditExercise} />
      <Route path='/create' component={CreateExercise} />
      <Route path='/user' component={CreateUser} />
      <Footer />
      <Router />
    </div>
  );
}

export default App;
