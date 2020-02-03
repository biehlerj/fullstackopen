import React from "react";

export const Total = props => {
  const total = props.parts
    .map(part => part.exercises)
    .reduce((prev, curr) => prev + curr);

  return <p>Number of exercises {total}</p>;
};
