import React from 'react';

const Total = ({ exercises }) => {
  const total = exercises.reduce((prev, curr) => prev + curr);

  return <h2>Number of exercises {total}</h2>;
};

export default Total;
