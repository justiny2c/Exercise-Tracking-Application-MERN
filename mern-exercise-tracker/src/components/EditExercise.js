import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

class EditExercise extends Component {
  state = {
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
    users: [],
  };

  componentDidMount() {
    axios
      .get('http://localhost:5000/exercises/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: new Date(res.data.date),
        });
      })
      .catch(err => {
        console.log(err);
      });

    axios.get('http://localhost:5000/users/').then(res => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map(user => user.username),
        });
      }
    });
  }

  handleChange = e => {
    console.log(e.target.value);
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
      .post(
        'http://localhost:5000/exercises/update/' + this.props.match.params.id,
        exercise,
      )
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
        <p>Edit Exercise Log</p>
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
              value='Edit Exercise Log'
              className='btn btn-primary'
            />
          </div>
        </form>
      </div>
    );
  }
}

export default EditExercise;
