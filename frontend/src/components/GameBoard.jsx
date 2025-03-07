import React from "react";
import PlayerInput from "./PlayerInput";
import ScoreBoard from "./ScoreBoard";
import WordHistory from "./WordHistory";

const GameBoard = () => {
  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Shiritori Game</h1>
      <PlayerInput />
      <div className="mt-4 flex gap-4">
        <ScoreBoard />
        <WordHistory />
      </div>
    </div>
  );
};

export default GameBoard;
