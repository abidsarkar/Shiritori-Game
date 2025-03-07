import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { build } from "vite";
const Backend_Url = "http://localhost:5000/api";
export const validWord = createAsyncThunk(
  "game/validWord",
  async (word, { rejectedWithValue }) => {
    try {
      const response = await axios.get(`${Backend_Url}/${word}`);
      return response.data;
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  }
);

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    word: [],
    currentPlayer: 1,
    score: { player1: 0, player2: 0 },
    error: null,
    loading: false,
  },
  reducers: {
    restGame: (state) => {
      state.word = [];
      state.currentPlayer = 1;
      state.score = { player1: 0, player2: 0 };
      state.error = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(validWord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validWord.fulfilled, (state, action) => {
        state.loading = false;
        state.word.push(action.payload.word);
        state.score[`player${state.currentPlayer}`] += 1;
        state.currentPlayer = state.currentPlayer === 1 ? 2 : 1;
      })
      .addCase(validWord.rejected, (state, action) => {
        state.loading = false;

        state.score[`player${state.currentPlayer}`] -= 1;
        state.error = action.payload.error;
      });
  },
});

// Action creators are generated for each case reducer function
export const { restGame } = gameSlice.actions;

export default gameSlice.reducer;
