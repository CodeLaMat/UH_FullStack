import { useState } from "react";

const Header = () => {
  return (
    <div>
      <h1>Give feedback</h1>
    </div>
  );
};

const Button = (props) => (
  <button onClick={props.handleclick}>{props.text}</button>
);

const StatisticLine = (props) => {
  return (
    <p>
      {props.text}: {props.value}
    </p>
  );
};

const Statistics = (props) => {
  let good = props.good * 1;
  let neutral = props.neutral * 0;
  let bad = props.bad * -1;

  if (props.good === 0 && props.neutral === 0 && props.bad === 0)
    return (
      <div>
        <h4>No feedback given yet</h4>
      </div>
    );
  return (
    <div>
      <h2>Statistics</h2> <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine
        text="all"
        value={props.good + props.neutral + props.bad}
      />
      <StatisticLine
        text="average"
        value={
          (good + neutral + bad) / (props.good + props.neutral + props.bad)
        }
      />
      <StatisticLine
        text="positive"
        value={
          (props.good / (props.good + props.neutral + props.bad)) * 100 + "%"
        }
      />
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header />
      <Button handleclick={() => setGood(good + 1)} text="good" />
      <Button handleclick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleclick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
