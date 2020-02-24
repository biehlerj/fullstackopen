import React from 'react';

const People = ({ people, onDelete }) => {
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) onDelete(id);
  };

  return (
    <>
      {people.map((person) => (
        <p key={person.name}>
          {person.name}
          {' '}
          {person.number}
          <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
        </p>
      ))}
    </>
  );
};

export default People;
