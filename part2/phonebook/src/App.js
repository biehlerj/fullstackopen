import React, { useState } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [showAll, setShowAll] = useState(true);

  const entriesToShow = showAll ? persons : persons.filter(person => {
    const toFilter = person.name.toLocaleLowerCase();
    const toSearch = filterName.toLowerCase();

    return toFilter.includes(toSearch);
  });

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

  const handleFilter = (event) => {
    setFilterName(event.target.value);
    setShowAll(false);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter onChangeHandler={handleFilter} />

      <PersonForm
        onSubmitHandler={addName}
        newName={newName}
        onChangeNameHandler={handleNameChange}
        newNumber={newNumber}
        onChangeNumberHandler={handleNewNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={entriesToShow} />
    </div>
  );
};

export default App;
