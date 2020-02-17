import React, { useState } from 'react';
import Numbers from './components/Numbers';
import Phonebook from './components/Phonebook';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  return (
    <div>
      <Phonebook newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} persons={persons} setPersons={setPersons} />
      <Numbers persons={persons} />
    </div>
  );
};

export default App;
