import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import People from './components/People';
import PersonForm from './components/PersonForm';
import peopleService from './services/people';

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    peopleService.getAll()
      .then((initialPeople) => setPeople(initialPeople));
  }, []);

  const entriesToShow = showAll ? people : people.filter((person) => {
    const toFilter = person.name.toLocaleLowerCase();
    const toSearch = filterName.toLowerCase();

    return toFilter.includes(toSearch);
  });

  const isAdded = (name, data) => {
    const checkIsAdded = data.find((el) => el.name === name);
    if (checkIsAdded === undefined) {
      return false;
    }
    return true;
  };

  const addContact = (event) => {
    event.preventDefault();
    // Check if the contact already exists
    const toUpdate = people.filter((p) => p.name.includes(newName));
    if (toUpdate.length === 1) {
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (confirm) {
        peopleService
          .update(toUpdate[0].id, {
            ...toUpdate[0],
            number: newNumber,
          })
          .then((updatedPerson) => {
            let updatedState = people.filter((p) => p.id !== updatedPerson.id);
            updatedState = [...updatedState, updatedPerson];
            setPeople(updatedState);
            setNewName('');
            setNewNumber('');
            setNotificationMessage(`Added ${updatedPerson.name}`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 2000);
          })
          .catch((err) => {
            setErrorMessage(`Information of ${newName} has already been removed from server`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    } else {
      // if not, save the person
      const personObject = {
        name: newName,
        number: newNumber,
        id: people[people.length - 1].id + 1,
      };

      peopleService
        .create(personObject)
        .then((returnedNote) => {
          if (isAdded(newName, people)) {
            alert(`${newName} is already added to phonebook`);
          } else {
            setPeople([...people, { name: newName, number: newNumber }]);
          }
          setNotificationMessage(`Added ${newName}`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 2000);
          setNewName('');
          setNewNumber('');
        })
        .catch((err) => {
          setErrorMessage(`Information of ${newName} has already been removed from server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
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

      <Notification message={notificationMessage} />
      <Notification type="error" message={errorMessage} />

      <Filter onChangeHandler={handleFilter} />

      <h2>add a new</h2>

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
