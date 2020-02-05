import React from 'react';
import Note from './components/Note';

const App = ({ notes }) => {
  // Is the same as doing this: {notes.map(note => <li>{note.content}</li>)} in line
  const rows = () => notes.map(note => <Note key={note.id} note={note} />);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {rows()}
      </ul>
    </div>
  );
};

export default App;
