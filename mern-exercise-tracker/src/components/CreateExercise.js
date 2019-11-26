import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

class CreateExercise extends Component {
  state = {
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
    users: [],
  };

  componentDidMount() {
    axios.get('http://localhost:5000/users/').then(res => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map(user => user.username),
          username: res.data[0].username,
        });
      }
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangeDate = date => {
    this.setState({
      date: date,
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    console.log(exercise);

    axios
      .post('http://localhost:5000/exercises/add', exercise)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    window.location = '/';
  };

  render() {
    return (
      <div>
        <p>Create a new Exercise Log</p>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Username: </label>
            <select
              ref='userInput'
              required
              className='form-control'
              name='username'
              onChange={this.handleChange}>
              {this.state.users.map(user => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='form-group'>
            <label>Description: </label>
            <input
              type='text'
              //   placeholder='...Description'
              name='description'
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <div className='form-group'>
            <label>Duration (in minutes): </label>
            <input
              type='text'
              //   placeholder='...Duration'
              name='duration'
              value={this.state.duration}
              onChange={this.handleChange}
            />
          </div>
          <div className='form-group'>
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className='form-group'>
            <input
              type='submit'
              value='Create Exercise Log'
              className='btn btn-primary'
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateExercise;
