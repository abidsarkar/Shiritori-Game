import React from "react";
import { useSelector } from "react-redux";

const WordHistory = () => {
  const { words } = useSelector((state) => state.game);
  return (
    <div className="p-4 bg-gray-700 text-white rounded-md">
      <h2 className="text-xl font-bold">Word History</h2>
      <ul>
        {words.map((word, index) => (
          <li key={index} className="text-lg">{word}</li>
        ))}
      </ul>
    </div>
  );
};

export default WordHistory;
