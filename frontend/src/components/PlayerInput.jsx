import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validWord } from "../app/redux/gameSlice";

const PlayerInput = () => {
  const [word, setWord] = useState("");
  const dispatch = useDispatch();
  const { currentPlayer, error, loading } = useSelector((state) => state.game);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (word.length >= 4) {
      dispatch(validWord(word));
      setWord("");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">
        Player {currentPlayer}, enter a word:
      </h2>
      <form onSubmit={handleSubmit} className="mt-2">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="p-2 border rounded-md"
          required
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-600 text-white rounded-md"
          disabled={loading}
        >
          {loading ? "Checking..." : "Submit"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default PlayerInput;
