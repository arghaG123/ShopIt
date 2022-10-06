const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/errors');
app.use(express.json());

// All routes
const products = require('./routes/product');
app.use('/api/v1',products);

// Middleware to handle errors 

app.use(errorMiddleware);

module.exports = app;