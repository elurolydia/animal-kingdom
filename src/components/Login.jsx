import { useState } from 'react';
import AnimalLis from './AnimalLis';
// import AnimalList from './AnimalList';

const Login = ({ toggleForm }) => {
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });

  const [showAnimalList, setShowAnimalList] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowAnimalList(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginDetails((prevItems) => ({ ...prevItems, [name]: value }));
    console.log(loginDetails);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder='Enter email'
          onChange={handleChange}
          value={loginDetails.email}
        />
        <input
          type='password'
          name='password'
          placeholder='Enter password'
          onChange={handleChange}
          value={loginDetails.password}
        />
        <button type='submit'>Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => toggleForm('sign u[')}
        >
          Sign up
        </span>
      </p>

      {showAnimalList && <AnimalLis />}
    </div>
  );
};

export default Login;
