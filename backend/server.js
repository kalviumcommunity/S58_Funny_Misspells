
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PUBLIC_PORT || 3000;
const { connection } = require('./config/db'); // Assuming `connection` is a promise
const misspellsData = require('./config/database');
const { misspellsModel } = require('./model/Misspells');
const mongoose = require('mongoose');
const CRUD_routes = require('./Routes/routes');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.status(200).send(`<h1>Database Connected Successfully</h1><p>Status Code: 200</p>`);
});

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.post('/postdata', (req, res) => {
  misspellsModel.insertMany(misspellsData)
    .then((result) => {
      console.log('Inserted', result.length, 'documents into the collection');
      res.status(200).send('Data inserted successfully');
    })
    .catch((error) => {
      console.error('Error inserting documents:', error);
      res.status(500).send('Failed to insert data');
    });
});

app.use("/routes", CRUD_routes);

app.listen(port, async () => {
  try {
    console.log(connection)
    await connection; // Wait for the database connection to be established
    console.log("Connected to DB");
    if (mongoose.connection.readyState === 1) {
      console.log('Connected to MongoDB');
    } else {
      console.log('Not connected to MongoDB');
    }
  } catch (error) {
    console.log("Error connecting to DB");
    console.error(error);
  }
  console.log(`Server is listening on port ${port}`);
});
