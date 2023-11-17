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
  const [voteType, setVoteType] = useState(null); // Nuevo estado para el tipo de voto
  const [voting, setVoting] = useState(false); // Nuevo estado para indicar si está votando

  const handleVoteClick = () => {
    setVoting(true); // Cambia el estado para mostrar los botones de voto
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
    setVoting(false); // Reinicia el estado de votación al cambiar de anécdota
  };

  const allVotes = votes.reduce((sum, vote) => sum + vote, 0);

  return (
    <>
      <h1>Anecdote of the Day</h1>
      {/* Muestra la anécdota seleccionada */}
      <div>{anecdotes[selected]}</div>
      <div>Votes: {votes[selected]}</div>

      {/* Botón "Vote" */}
      {!voting && <Button onClick={handleVoteClick} text="Vote" />}

      {/* Muestra los botones de voto solo si se ha hecho clic en el botón "Vote" */}
      {voting && (
        <>
          <Button onClick={() => handleTypeClick('good')} text="Good" />
          <Button onClick={() => handleTypeClick('neutral')} text="Neutral" />
          <Button onClick={() => handleTypeClick('bad')} text="Bad" />
        </>
      )}

      {/* Botones para mostrar la próxima anécdota */}
      <Button onClick={handleNextClick} text="Next Anecdote" />

      {/* Muestra la tabla de estadísticas solo si hay al menos un voto */}
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

      {/* Muestra el tipo de voto actual */}
      {voteType && <p>You voted: {voteType}</p>}
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
