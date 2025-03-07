require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const wordSchema = new mongoose.Schema({
  word: String,
});
const Word = mongoose.model("word", wordSchema);
app.get("/api/:word", async (req, res) => {
  const word = req.params.word.toLowerCase();
  try {
    const cachedWord = await Word.findOne({ word });
    if (cachedWord) {
      return res.json({
        source: "MONGODB",
        data: cachedWord.data,
      });
    }
    const response = await axios.get(`${process.env.DICTIONARY}/${word}`);
    if (response.data.title === "No Definitions Found") {
      return res.status(404).json({
        error: "word not found",
      });
    }
    const newWord = new Word({ word });
    await newWord.save();
    res.json({
        source:"API",
        data:response.data,
    });
  } catch (error) {
    res.status(500).json({
      error: "something went wrong",
    });
  }
});
app.listen(PORT, () => console.log(`server run on port ${PORT}`));
