import { useState } from 'react';
import './App.css';

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad, all, average, positive }) => (
  <>
    <h2>Statistics</h2>
    <p>Good {good}</p>
    <p>Neutral {neutral}</p>
    <p>Bad {bad}</p>
    <p>All {all}</p>
    <p>Average {average}</p>
    <p>Positive {positive}%</p>
  </>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = (good - bad) / all || 0;
  const positive = (good / all) * 100 || 0;

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <>
      <h1>Give Feedback</h1>
      <Button onClick={handleGoodClick} text="Good" />
      <Button onClick={handleNeutralClick} text="Neutral" />
      <Button onClick={handleBadClick} text="Bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </>
  );
};

export default App;
