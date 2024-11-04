import React, { useEffect, useState } from 'react';


function Prueba() {
  const LOCAL_STORAGE_KEY = 'todoApp.todos'

  const [people, setPeople] = useState([{ firstName: '', lastName: '' }]);

  useEffect(() => {
    const storedPeople = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedPeople) setPeople(storedPeople)
  }, [])
  
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(people))
  }, [people])


  

  const handleAddInput = () => {
    setPeople([...people, { firstName: '', lastName: '' }]);
  };

  const handleNameChange = (index, field, value) => {
    const newPeople = [...people];
    newPeople[index][field] = value;
    setPeople(newPeople);
  };

  const handleDeleteInput = (index) => {
    const newPeople = [...people];
    newPeople.splice(index, 1);
    setPeople(newPeople);
  };

  return (
    <div>
      {people.map((person, index) => (
  <div key={index}>
    <input
      type="text"
      value={person.firstName}
      onChange={(e) => handleNameChange(index, 'firstName', e.target.value)}
      placeholder="First Name"
    />
    <input
      type="text"
      value={person.lastName}
      onChange={(e) => handleNameChange(index, 'lastName', e.target.value)}
      placeholder="Last Name"
    />
    <button onClick={() => handleDeleteInput(index)}>Eliminar</button>
  </div>
))}

      <button onClick={handleAddInput}>Add Another Person</button>

      <pre>{JSON.stringify(people, null, 2)}</pre>
    </div>
  );
}

export default Prueba;
