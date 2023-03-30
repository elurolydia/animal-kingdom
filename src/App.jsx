import { useEffect, useState } from 'react';
import './App.css';
// import AnimalList from './components/AnimalList';
import Login from './components/Login';
import Signup from './components/Signup';
import axios from 'axios';

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const res = await axios.get(
  //       ' https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users '
  //     );
  //     setUsers(res.data);
  //   };

  //   fetchUsers();
  // }, []);

  const [newData, setNewData] = useState([]);
  const [visible, setVisible] = useState('users');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/${visible}`
        );
        if (!response.ok) throw Error('Did not receive expected data');
        const result = await response.json();
        // console.log(result);
        setNewData(result);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      fetchItems();
    }, 2000);
  }, [visible]);

  // console.log(newData);
  return (
    <div>
      {currentForm === 'login' ? (
        <Login toggleForm={toggleForm} />
      ) : (
        <Signup toggleForm={toggleForm} />
      )}

      <div>
        <div style={{ width: '100%' }}>
          <button
            onClick={() => setVisible('users')}
            style={{
              width: '33.33%',
              height: '40px',
              backgroundColor: visible === 'users' && 'black',
              color: visible === 'users' && 'white',
            }}
          >
            users
          </button>
          <button
            onClick={() => setVisible('posts')}
            style={{
              width: '33.33%',
              height: '40px',
              backgroundColor: visible === 'posts' && 'black',
              color: visible === 'posts' && 'white',
            }}
          >
            posts
          </button>
          <button
            onClick={() => setVisible('comments')}
            style={{
              width: '33.33%',
              height: '40px',
              backgroundColor: visible === 'comments' && 'black',
              color: visible === 'comments' && 'white',
            }}
          >
            comments
          </button>
        </div>
        <div>
          {isLoading && <p>Loading...</p>}
          {fetchError && (
            <p style={{ color: 'red' }}>{`Error: ${fetchError}`}</p>
          )}

          {!fetchError && !isLoading && visible === 'users' && (
            <table>
              <tbody>
                {newData.map((data) => (
                  <tr>
                    <td>
                      {Object.entries(data).map(([key, value]) => {
                        return <td>{JSON.stringify(value)}</td>;
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!fetchError && !isLoading && visible === 'posts' && (
            <div>
              <ul>
                {newData.map((data) => (
                  <li key={data.id} style={{ marginBottom: '20px' }}>
                    {JSON.stringify(data)}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!fetchError && !isLoading && visible === 'comments' && (
            <div>
              <ul>
                {newData.map((data) => (
                  <li key={data.id} style={{ marginBottom: '20px' }}>
                    {JSON.stringify(data)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
