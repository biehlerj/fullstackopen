import React, { useState } from 'react';
import Numbers from './components/Numbers';
import Phonebook from './components/Phonebook';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
  ]);
  const [newName, setNewName] = useState('');

  return (
    <div>
      <Phonebook newName={newName} setNewName={setNewName} persons={persons} setPersons={setPersons} />
      <Numbers persons={persons} />
    </div>
  );
};

export default App;
