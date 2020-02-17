import React from 'react';

const Phonebook = ({ newName, setNewName, newNumber, setNewNumber, persons, setPersons }) => {

  const addName = (event) => {
    event.preventDefault();
    if (_existingContact(newName, persons))
      alert(`${newName} is already added to phonebook`);
    else
      setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName('');
    setNewNumber('');
  };

  const _existingContact = (name, data) => {
    let exists = data.find(entry => entry.name === name);

    if (exists === undefined)
      return false;
    else
      return true;
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNewNumber} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default Phonebook;
