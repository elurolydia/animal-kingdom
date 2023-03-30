import React, { useEffect, useState } from 'react';
import { Data } from './Data';
import { nanoid } from 'nanoid';
import { RiEdit2Fill } from 'react-icons/ri';
import { AiFillDelete } from 'react-icons/ai';
// import { LoEnter } from 'react-icons/lo';
import { BsCheckLg } from 'react-icons/bs';
import { Fragment } from 'react';
import apiRequest from './apiRequest';

const AnimalLis = () => {
  const API_URL = 'http://localhost:3500/items';

  const [animalData, setAnimalData] = useState([]);
  const [addedAnimal, setAddedAnimal] = useState('');
  const [selectedDataId, setSelectedDataId] = useState(null);

  const [editted, setEditted] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not receive expected data');
        const animalJson = await response.json();
        setAnimalData(animalJson);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    //This timeout is just to make it look like there is a delay from the server in delivering our request. I just want to use it to set what should display on the page if there is a delay from a real server.Meaning it is not needed in a real life code
    setTimeout(() => {
      fetchItems();
    }, 2000);
  }, []);

  const handleAdding = (e) => {
    const { name, value } = e.target;

    setAddedAnimal(value);
  };

  const add = async () => {
    const newAnimal = {
      id: nanoid(),
      animal: addedAnimal,
    };
    setAnimalData((prevData) => {
      return [...prevData, newAnimal];
    });
    setAddedAnimal('');

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAnimal),
    };

    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  };

  const handleEdit = (id) => {
    setSelectedDataId(id);
  };

  const inputChange = (e, id) => {
    const { name, value } = e.target;
    const newInput = {
      id: id,
      animal: value,
    };
    setEditted(newInput);
  };

  const handleEnter = async (id, index) => {
    const newData = [...animalData];
    // newData.splice(index, 1, editted);
    newData[index] = editted;
    setAnimalData(newData);

    setSelectedDataId(null);

    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ animal: editted.animal }),
    };

    const reqUrl = `${API_URL}/${selectedDataId}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  };

  const handleDelete = async (id, index) => {
    const newData = [...animalData];
    newData.splice(index, 1);

    setAnimalData(newData);
    setSelectedDataId(null);

    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      //   this.btn.click();
      //   console.log(e.keyCode + 'clicked');
      add();
    }
  };

  return (
    <div>
      {isLoading && <p>Loading Animals...</p>}
      {fetchError && <p style={{ color: 'red' }}>{`Error: ${fetchError}`}</p>}
      {!fetchError && !isLoading && (
        <div>
          <h1>Animals</h1>
          <ol>
            {animalData.map((animal, index) => {
              return (
                <Fragment key={animal.id}>
                  {selectedDataId === animal.id ? (
                    <li>
                      <input
                        type='text'
                        autoFocus
                        onChange={(e) => inputChange(e, animal.id)}
                        // onKeyPress = {handleKeypress}
                      />{' '}
                      <span>
                        <BsCheckLg
                          onClick={() => handleEnter(animal.id, index)}
                        />
                      </span>
                    </li>
                  ) : (
                    <li>
                      {animal.animal}{' '}
                      <span>
                        <RiEdit2Fill onClick={() => handleEdit(animal.id)} />
                        <AiFillDelete
                          onClick={() => handleDelete(animal.id, index)}
                        />
                      </span>
                    </li>
                  )}
                </Fragment>
              );
            })}
          </ol>
        </div>
      )}

      <div>
        <input
          type='text'
          placeholder='Add Animal'
          name='add'
          onChange={handleAdding}
          value={addedAnimal}
          onKeyDown={handleKeypress}
        />
        <button onClick={add}>Add</button>
      </div>

      <form action='https://httpbin.org/post' method='post'>
        <input type='text' id='Get' name='get' />
        <button>Go</button>
      </form>
    </div>
  );
};

export default AnimalLis;
