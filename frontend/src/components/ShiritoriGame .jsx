import React, { useState } from 'react';
import axios from 'axios';

const ShiritoriGame = () => {
  
  const [word, setWord] = useState('');
  const [lastWord, setLastWord] = useState('');
  const [playerTurn, setPlayerTurn] = useState(1); 
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [wordHistory, setWordHistory] = useState([]);
  const [error, setError] = useState('');

  const handleWordSubmit = async (e) => {
    e.preventDefault();

    if (word === '') return;

    
    if (lastWord && word[0].toLowerCase() !== lastWord.slice(-1).toLowerCase()) {
      setError('Word must start with the last letter of the previous word!');
      return;
    }

    
    if (word.length < 4) {
      setError('Word must be at least 4 letters long!');
      return;
    }

    
    if (wordHistory.includes(word.toLowerCase())) {
      setError('Word has already been used!');
      return;
    }

    try {
      
      const response = await axios.get(`http://localhost:5000/api/${word.toLowerCase()}`);
      
      if (response.data.source === 'MONGODB') {
        console.log('Word retrieved from MongoDB');
      } else if (response.data.source === 'API') {
        console.log('Word retrieved from API');
      }

      
      setWordHistory((prevHistory) => [...prevHistory, word]);
      setLastWord(word);
      setScore((prevScore) => {
        const newScore = { ...prevScore };
        if (playerTurn === 1) {
          newScore.player1 += 1;
        } else {
          newScore.player2 += 1;
        }
        return newScore;
      });

      
      setPlayerTurn(playerTurn === 1 ? 2 : 1);
      setWord('');
      setError('');
    } catch (error) {
      setError('Error occurred while fetching the word.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-blue-100 rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Shiritori Game</h1>

      <div className="text-center mb-6">
        <h2 className="text-2xl text-gray-700">Player {playerTurn}'s Turn</h2>
        <form onSubmit={handleWordSubmit} className="mt-4">
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter a word"
            className="px-4 py-2 border border-gray-400 rounded-md w-full max-w-xs mb-4 text-xl"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Word History:</h3>
        <ul className="list-disc pl-6 text-lg text-gray-600">
          {wordHistory.map((word, index) => (
            <li key={index} className="text-gray-700">{word}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Score:</h3>
        <div className="flex justify-between text-lg text-gray-700">
          <p>Player 1: <span className="font-bold">{score.player1}</span></p>
          <p>Player 2: <span className="font-bold">{score.player2}</span></p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-500 text-sm">Created with 💖 by You!</p>
      </div>
    </div>
  );
};

export default ShiritoriGame;
