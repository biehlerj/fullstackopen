import React from "react";
import { Part } from "./Part";

const Content = props => {
  return (
    <>
      {props.content.map(exercise => (
        <p key={exercise[0]}>
          {exercise[0]} {exercise[1]}
        </p>
      ))}
    </>
  );
};

export default Content;
