import React from "react";
import ReactDOM from "react-dom";

const Header = props => {
  return (
    <header>
      <h1>{props.course}</h1>
    </header>
  );
};

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

const Total = props => {
  const total = props.exercises.reduce(
    (previous, current) => previous + current,
  );

  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        content={[
          [part1, exercises1],
          [part2, exercises2],
          [part3, exercises3],
        ]}
      />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
