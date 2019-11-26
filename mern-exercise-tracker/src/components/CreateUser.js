import React, { Component } from 'react';
import axios from 'axios';

class CreateUser extends Component {
  state = {
    username: '',
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const user = {
      username: this.state.username,
    };

    console.log(user);

    axios
      .post('http://localhost:5000/users/add', user)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({
      username: '',
    });
  };

  render() {
    return (
      <div>
        <h3> Create new User</h3>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Username: </label>
            <input
              type='text'
              required
              name='username'
              className='form-control'
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='submit'
              value='Create New User'
              className='btn btn-primary'
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateUser;
