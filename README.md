# ChatBot Application

## Overview

The ChatBot Application is a web-based tool that allows users to interact with a chatbot modeled after various famous personalities. Users can select a character, send messages, and receive responses from an AI acting as the chosen character. The frontend is built using React, while the backend is developed with Node.js and Express.

## Features

- **Character Selection**: Users can choose from a list of famous personalities to chat with.
- **Chat Interface**: A user-friendly interface for sending and receiving messages.
- **AI Responses**: Utilizes OpenAI's GPT-3.5-turbo model to generate responses based on the selected character.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- OpenAI API Key

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/chatbot-application.git
    cd chatbot-application
    ```

2. **Install the required dependencies:**

    ```bash
    npm install
    ```

3. **Create a `.env` file in the root directory and add your OpenAI API key:**

    ```env
    OPENAI_API_KEY=your_openai_api_key
    ```

4. **Start the server:**

    ```bash
    npm start
    ```

5. **Open your browser and navigate to `http://localhost:5000` to view the application.**

## Usage

1. **Select a character** by clicking on one of the available options.
2. **Enter your message** in the input field.
3. **Submit your message** by clicking the "Submit" button.
4. **View the conversation** as the AI responds to your messages.

## Project Structure

- **Backend**: The server is built using Express.js. It handles incoming requests and communicates with the OpenAI API to generate responses.
- **Frontend**: The client is built with React.js. It provides a user-friendly interface for selecting characters and chatting with the AI.

## Server Code

The server code is responsible for handling incoming requests, interacting with the OpenAI API, and serving the frontend files. Below is a snippet of the server code:

```javascript
const express = require("express");
const dotenv = require("dotenv");
const app = express();

app.use(express.json()); // Accept JSON data in requests

// Load environment variables
dotenv.config();
if (!process.env.OPENAI_API_KEY) {
  console.error("OpenAI API key is not set");
  process.exit(1);
}

// OpenAIApi Configuration
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function runCompletion(messages) {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-16k",
    messages,
    temperature: 1,
    max_tokens: 200,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response;
}

app.post("/api/chatBot", async (req, res) => {
  try {
    const { messages } = req.body;

    const completion = await runCompletion(messages);

    res.json({ data: completion.data });
  } catch (error) {
    console.error("An error occurred", error);
    res.status(500).json({
      error: {
        message: "An error occurred during your request.",
      },
    });
  }
});

const PORT = process.env.PORT || 500;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
