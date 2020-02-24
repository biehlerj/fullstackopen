import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import People from './components/People';
import PersonForm from './components/PersonForm';
import peopleService from './services/people';

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    peopleService.getAll()
      .then((initialPeople) => setPeople(initialPeople));
  }, []);

  const entriesToShow = showAll ? people : people.filter((person) => {
    const toFilter = person.name.toLocaleLowerCase();
    const toSearch = filterName.toLowerCase();

    return toFilter.includes(toSearch);
  });

  const addContact = (event) => {
    event.preventDefault();
    const shouldUpdate = people.filter((person) => person.name.includes(newName));

    if (shouldUpdate.length === 1) {
      const confirm = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`);

      if (confirm) {
        const updatedPeople = people.filter((person) => person.id !== shouldUpdate[0].id);
        setPeople(updatedPeople);
        peopleService
          .update(shouldUpdate[0].id, {
            ...shouldUpdate[0],
            number: newNumber,
          })
          .then((updatedPerson) => {
            let updatedState = people.filter((person) => person.id !== updatedPerson.id);
            updatedState = [...updatedState, updatedPerson];
            setPeople(updatedState);
            setNewName('');
            setNewNumber('');
          });
      } else {
        const peopleObject = {
          name: newName,
          number: newNumber,
        };
        peopleService
          .create(peopleObject)
          .then((returnedPerson) => {
            if (_existingContact(newName, people)) alert(`${newName} is already added to phonebook`);
            else setPeople([...people, { name: newName, number: newNumber }]);
            setNewName('');
            setNewNumber('');
          });
      }
    }
  };

  const removePerson = (id) => {
    peopleService
      .remove(id)
      .then(() => {
        const updatedPeople = people.filter((person) => person.id !== id);
        setPeople(updatedPeople);
      });
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
    <div>
      <h2>Phonebook</h2>

      <Filter onChangeHandler={handleFilter} />

      <PersonForm
        onSubmitHandler={addContact}
        newName={newName}
        onChangeNameHandler={handleNameChange}
        newNumber={newNumber}
        onChangeNumberHandler={handleNewNumber}
      />

      <h3>Numbers</h3>

      <People people={entriesToShow} onDelete={removePerson} />
    </div>
  );
};

export default App;
