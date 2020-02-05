import React from 'react';
import Content from './Content';
import Header from './Header';
import Total from './Total';

const Course = ({ course }) => {
  const name = course.name;
  const parts = course.parts;
  const total = parts.map(part => part.exercises).reduce((sum, curr) => sum + curr);

  return (
    <>
      <Header name={name} />
      <Content parts={parts} />
      <Total total={total} />
    </>
  );
};

export default Course;
