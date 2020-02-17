import React, { useState } from 'react';
import Numbers from './components/Numbers';
import Phonebook from './components/Phonebook';

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

  return (
    <div>
      <Phonebook
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setFilterName={setFilterName}
        showAll={showAll}
        setShowAll={setShowAll}
        persons={persons}
        setPersons={setPersons}
      />
      <Numbers persons={entriesToShow} />
    </div>
  );
};

export default App;
