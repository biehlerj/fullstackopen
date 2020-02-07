import React from 'react';

const Phonebook = ({ newName, setNewName, persons, setPersons }) => {

  const addName = (event) => {
    event.preventDefault();
    setPersons(persons.concat({ name: newName }));
    setNewName('');
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default Phonebook;
