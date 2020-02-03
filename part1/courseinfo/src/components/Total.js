import React from "react";

const Total = props => {
  const total = props.exercises.reduce(
    (previous, current) => previous + current,
  );

  return <p>Number of exercises {total}</p>;
};

export default Total;
