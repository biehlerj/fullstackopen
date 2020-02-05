import React from 'react';
import Content from './Content';
import Header from './Header';
import Total from './Total';

const Course = ({ course }) => {
  const name = course.name;
  const parts = course.parts;

  return (
    <>
      <Header name={name} />
      <Content parts={parts} />
      <Total exercises={parts.map(part => part.exercises)} />
    </>
  );
};

export default Course;
