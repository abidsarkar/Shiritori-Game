import React from "react";
import { useSelector } from "react-redux";

const ScoreBoard = () => {
  const { scores } = useSelector((state) => state.game);
  return (
    <div className="p-4 bg-gray-800 text-white rounded-md">
      <h2 className="text-xl font-bold">Scoreboard</h2>
      <p>Player 1: {scores.player1} points</p>
      <p>Player 2: {scores.player2} points</p>
    </div>
  );
};

export default ScoreBoard;
