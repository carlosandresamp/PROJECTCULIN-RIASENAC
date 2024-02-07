const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb://localhost:27017/recipe-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use('/', routes);

app.listen(3333, () => {
  console.log('Server is running on port 3333');
});