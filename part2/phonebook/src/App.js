import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    axios.get('http://localhost:3001/persons').then(response => setPersons(response.data));
  };

  useEffect(hook, []);

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
