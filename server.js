const express = require('express');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main.html'));
});

app.use(express.static(__dirname));

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, HOST, () => {
  console.log(`Christian Wijaya server listening on http://${HOST}:${PORT}`);
});
