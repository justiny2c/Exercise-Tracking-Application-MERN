import React from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

import Exercise from './Exercise.js';
import Footer from './Footer.js';

import '../App.css';

class ExerciseList extends React.Component {
  state = {
    exercises: [],
  };
  componentDidMount() {
    axios
      .get('http://localhost:5000/exercises')
      .then(res => {
        this.setState({
          exercises: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteExercise = id => {
    axios
      .delete(`http://localhost:5000/exercises/${id}`)
      .then(res => console.log(res.data));

    this.setState({
      exercises: this.state.exercises.filter(exercise => exercise._id !== id),
    });
  };

  exerciseList = () => {
    return this.state.exercises.map(currentExercise => {
      return (
        <Exercise
          exercise={currentExercise}
          deleteExercise={this.deleteExercise}
          key={currentExercise._id}
        />
      );
    });
  };
  render() {
    return (
      <div className='exercise-main'>
        <h3>Exercises</h3>
        <table className='table'>
          <thead className='thead-light'>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
        <Footer />
      </div>
    );
  }
}

export default ExerciseList;
