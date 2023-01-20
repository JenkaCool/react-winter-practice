const express = require('express');

const PORT = process.env.PORT || 3010;
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

const groupsList = require('./api/all-tasks.json');
app.get('/api/all-tasks', (req, res) => {
  res.json({ data: groupsList });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});