import React, { useState } from 'react';
import './App.css';

// Componente de botón reutilizable
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);

// Componente para representar una línea de estadística en la tabla
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

// Componente para mostrar la tabla de estadísticas
const Statistics = ({ good, neutral, bad, all, average, positive }) => (
  <table>
    <thead>
      <tr>
        <th>Statistic</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <StatisticLine text="Good" value={good} />
      <StatisticLine text="Neutral" value={neutral} />
      <StatisticLine text="Bad" value={bad} />
      <StatisticLine text="All" value={all} />
      <StatisticLine text="Average" value={average} />
      <StatisticLine text="Positive" value={`${positive}%`} />
    </tbody>
  </table>
);

// Componente principal de la aplicación
const App = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [voteType, setVoteType] = useState(null);
  const [voting, setVoting] = useState(false);

  const handleVoteClick = () => {
    setVoting(true);
  };

  const handleTypeClick = (type) => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
    setVoteType(type);
  };

  const handleNextClick = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
    setVoteType(null);
    setVoting(false);
  };

  const allVotes = votes.reduce((sum, vote) => sum + vote, 0);

  // Encuentra el índice de la anécdota con más votos
  const mostVotedIndex = votes.indexOf(Math.max(...votes));

  return (
    <>
      <h1>Anecdote of the Day</h1>
      <div>{anecdotes[selected]}</div>
      <div>Votes: {votes[selected]}</div>

      {!voting && <Button onClick={handleVoteClick} text="Vote" />}

      {voting && (
        <>
          <Button onClick={() => handleTypeClick('good')} text="Good" />
          <Button onClick={() => handleTypeClick('neutral')} text="Neutral" />
          <Button onClick={() => handleTypeClick('bad')} text="Bad" />
        </>
      )}

      <Button onClick={handleNextClick} text="Next Anecdote" />

      <h2>Statistics</h2>
      {allVotes > 0 ? (
        <Statistics
          good={votes[0]}
          neutral={votes[1]}
          bad={votes[2]}
          all={allVotes}
          average={(votes[0] - votes[2]) / allVotes || 0}
          positive={(votes[0] / allVotes) * 100 || 0}
        />
      ) : (
        <p>No votes yet</p>
      )}

      {voteType && <p>You voted: {voteType}</p>}

      {/* Muestra la anécdota con más votos */}
      <h2>Most Voted Anecdote</h2>
      <div>{anecdotes[mostVotedIndex]}</div>
      <div>Votes: {votes[mostVotedIndex]}</div>
    </>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

export default App;
