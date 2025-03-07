# Shiritori Game Backend

This is the backend for the Shiritori game, built using **Node.js**, **Express**, and **MongoDB** for storing previously used words. The backend provides an API that validates the words and fetches their definitions from an external dictionary API. It also stores the words used in the game to avoid repetition.

## Setup Instructions

### 1. Clone the repository:

```bash
git clone https://github.com/abidsarkar/Shiritori-Game
cd backend
```
### 2. Install dependencies:
```bash
npm install
```
### 3.  Configure environment variables:
```bash
MONGO_URL=<your-mongodb-connection-string>
DICTIONARY=https://api.dictionaryapi.dev/api/v2/entries/en
PORT=5000
```
### 4.   Start the server:
```bash
npm run dev
```
API Endpoints
GET /api/:word

This endpoint checks whether a word has been used before and if it's valid by fetching its definition from the dictionary API. If the word exists in the database, it returns it from MongoDB.
```bash
Response:

    If the word is found in the database:

{
  "source": "MONGODB",
  "data": "<word_data>"
}

    If the word is not found in the database, it fetches the word from the dictionary API and stores it in the database.

{
  "source": "API",
  "data": "<word_data>"
}
```
5. Testing

You can test the API using Postman or Insomnia. For example:

GET http://localhost:5000/api/hello