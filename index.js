require('dotenv').config();

const mysql = require('mysql2');

// Assuming DATABASE_URL is in the format: mysql://user:password@host:port/database
const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect(error => {
  if (error) {
    console.error('Error connecting: ' + error.stack);
    return;
  }

  console.log('Connected to PlanetScale as id ' + connection.threadId);

  // Example database query
  connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);

    // Close the connection after the query
    connection.end();
  });
});

const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function askChatGPT(question) {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003", // Or any other model
      prompt: question,
      temperature: 0.7,
      max_tokens: 150,
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return null;
  }
}

// Example usage of ChatGPT
askChatGPT("Explain Newton's laws of motion").then(response => {
  console.log('ChatGPT says:', response);
});
