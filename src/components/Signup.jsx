import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import AnimalLis from './AnimalLis';
// import AnimalList from './AnimalList';

const Signup = ({ toggleForm }) => {
  const [formInput, setFormInput] = useState({
    username: '',
    password: '',
    email: '',
  });

  const [data, setData] = useState([]);
  const [showAnimalList, setShowAnimalList] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevItems) => ({ ...prevItems, [name]: value }));
    console.log(formInput);
  };

  // useEffect(() => {
  //   Axios.get('https://jsonplaceholder.typicode.com/posts')
  //     .then((res) => {
  //       console.log(res.data);
  //       setData(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('https://jsonplaceholder.typicode.com/posts', {
      title: formInput.username,
      body: formInput.password,
    })
      .then((res) => console.log('Posting data', res))
      .catch((err) => console.log(err));

    setShowAnimalList(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder='Enter email'
          onChange={handleChange}
          value={formInput.email}
        />
        <input
          type='text'
          name='username'
          placeholder='Enter username'
          onChange={handleChange}
          value={formInput.username}
        />
        <input
          type='password'
          name='password'
          placeholder='Enter password'
          onChange={handleChange}
          value={formInput.password}
        />

        <button type='submit'>Sign up</button>
      </form>
      <p>
        Already have an account?{' '}
        <span style={{ cursor: 'pointer' }} onClick={() => toggleForm('login')}>
          Login
        </span>
      </p>

      {showAnimalList && <AnimalLis />}
    </div>
  );
};

export default Signup;
