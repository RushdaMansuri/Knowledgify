require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection(process.env.DATABASE_URL)

connection.connect(error => {
  if (error) {
    console.error('Error connecting: ' + error.stack);
    return;
  }

  console.log('Connected to PlanetScale as id ' + connection.threadId);
});

// Use the connection for queries, etc.

// Close the connection when done
connection.end();

