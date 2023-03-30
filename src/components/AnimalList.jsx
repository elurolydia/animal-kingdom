// import React, { useEffect, useState } from 'react';
// import { Data } from './Data';
// import { nanoid } from 'nanoid';
// import { RiEdit2Fill } from 'react-icons/ri';
// import { AiFillDelete } from 'react-icons/ai';
// // import { LoEnter } from 'react-icons/lo';
// import { BsCheckLg } from 'react-icons/bs';
// import { Fragment } from 'react';

// const AnimalList = () => {
//   const [animalData, setAnimalData] = useState(
//     JSON.parse(localStorage.getItem('animalList')) || []
//   );
//   const [addedAnimal, setAddedAnimal] = useState('');
//   const [selectedDataId, setSelectedDataId] = useState(null);

//   const [editted, setEditted] = useState('');

//   useEffect(() => {
//     localStorage.setItem('animalList', JSON.stringify(animalData));
//   }, [animalData]);

//   const handleAdding = (e) => {
//     const { name, value } = e.target;

//     setAddedAnimal(value);
//   };

//   const add = () => {
//     const newAnimal = {
//       id: nanoid(),
//       animal: addedAnimal,
//     };
//     setAnimalData((prevData) => {
//       return [...prevData, newAnimal];
//     });
//     setAddedAnimal('');
//   };

//   const handleEdit = (id) => {
//     setSelectedDataId(id);
//   };

//   const inputChange = (e, id) => {
//     const { name, value } = e.target;
//     const newInput = {
//       id: id,
//       animal: value,
//     };
//     setEditted(newInput);
//   };

//   const handleEnter = (index) => {
//     const newData = [...animalData];
//     // newData.splice(index, 1, editted);
//     newData[index] = editted;
//     setAnimalData(newData);

//     setSelectedDataId(null);
//   };

//   const handleDelete = (index) => {
//     console.log(index);

//     const newData = [...animalData];
//     newData.splice(index, 1);

//     setAnimalData(newData);
//     setSelectedDataId(null);
//   };

//   return (
//     <div>
//       <h1>Animals</h1>
//       <ol>
//         {animalData.map((animal, index) => {
//           return (
//             <Fragment key={animal.id}>
//               {selectedDataId === animal.id ? (
//                 <li>
//                   <input
//                     type='text'
//                     autoFocus
//                     onChange={(e) => inputChange(e, animal.id)}
//                   />{' '}
//                   <span>
//                     <BsCheckLg onClick={() => handleEnter(index)} />
//                   </span>
//                 </li>
//               ) : (
//                 <li>
//                   {animal.animal}{' '}
//                   <span>
//                     <RiEdit2Fill onClick={() => handleEdit(animal.id)} />
//                     <AiFillDelete onClick={() => handleDelete(index)} />
//                   </span>
//                 </li>
//               )}
//             </Fragment>
//           );
//         })}
//       </ol>

//       <div>
//         <input
//           type='text'
//           placeholder='Add Animal'
//           name='add'
//           onChange={handleAdding}
//           value={addedAnimal}
//         />
//         <button onClick={add}>Add</button>
//       </div>

//       <form action='https://httpbin.org/post' method='post'>
//         <input type='text' id='Get' name='get' />
//         <button>Go</button>
//       </form>
//     </div>
//   );
// };

// export default AnimalList;
