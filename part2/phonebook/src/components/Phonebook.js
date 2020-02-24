import React from 'react';

const Phonebook = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  setFilterName,
  showAll,
  setShowAll,
  people,
  setPeople,
}) => {
  const addName = (event) => {
    event.preventDefault();
    if (_existingContact(newName, people)) alert(`${newName} is already added to phonebook`);
    else setPeople(people.concat({ name: newName, number: newNumber }));
    setNewName('');
    setNewNumber('');
  };

  const _existingContact = (name, data) => {
    const exists = data.find((entry) => entry.name === name);

    if (exists === undefined) return false;
    return true;
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilterName(event.target.value);
    setShowAll(false);
  };

  return (
    <>
      <form onSubmit={addName}>
        <div>
          name:
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:
          <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default Phonebook;
