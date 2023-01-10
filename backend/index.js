const express = require('express');

const PORT = process.env.PORT || 3010;
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

const taskItems = require('./api/task-items.json');
app.get('/api/task-items', (req, res) => {
  res.json({ data: taskItems });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});