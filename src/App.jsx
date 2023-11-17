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
  // Estados para el feedback y las estadísticas
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [selected, setSelected] = useState(0); // Nuevo estado para la anécdota seleccionada

  // Cálculos de estadísticas
  const all = good + neutral + bad;
  const average = (good - bad) / all || 0;
  const positive = (good / all) * 100 || 0;

  // Funciones para manejar clics en los botones
  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  // Función para manejar el clic en el botón "Next Anecdote"
  const handleNextClick = () => {
    // Genera un índice aleatorio para seleccionar una anécdota diferente
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  // Renderizado del componente
  return (
    <>
      <h1>Give Feedback</h1>
      {/* Botones para dar feedback */}
      <Button onClick={handleGoodClick} text="Good" />
      <Button onClick={handleNeutralClick} text="Neutral" />
      <Button onClick={handleBadClick} text="Bad" />
      {/* Muestra las estadísticas solo si se ha recopilado al menos un feedback */}
      {all > 0 && (
        <>
          {/* Muestra la tabla de estadísticas */}
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            all={all}
            average={average}
            positive={positive}
          />
          {/* Muestra la anécdota seleccionada */}
          <h2>Anecdote of the Day</h2>
          <div>{anecdotes[selected]}</div>
          {/* Botón para mostrar la próxima anécdota aleatoria */}
          <Button onClick={handleNextClick} text="Next Anecdote" />
        </>
      )}
    </>
  );
};

// Anécdotas disponibles
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

export default App;
