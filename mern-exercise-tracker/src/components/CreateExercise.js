import React, { Component } from 'react';

class CreateExercise extends Component {
  state = {
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
    users: [],
  };

  componentDidMount() {
    this.setState({
      users: ['Test user'],
      username: 'Test user',
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
        </form>
      </div>
    );
  }
}

export default CreateExercise;
