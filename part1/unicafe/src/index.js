import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const goodWeight = good * 1
  const badWeight = bad * -1
  const average = all > 0 ? (goodWeight + badWeight) / all : 'N/A'
  const positive = all > 0 ? `${good / all * 100}%` : 'N/A'

  if (all > 0) {
    return (
      <div>
        <div>{`good ${good}`}</div>
        <div>{`neutral ${neutral}`}</div>
        <div>{`bad ${bad}`}</div>
        <div>{`all ${all}`}</div>
        <div>{`average ${average}`}</div>
        <div>{`positive ${positive}`}</div>
      </div>
    )

  } else {
    return <div>{'No feedback given'}</div>
  }
}

const Title = ({ title }) => (
  <h1>{title}</h1>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Title title="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Title title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
