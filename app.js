const express = require('express');
const app = express();

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/sim.html');
});

app.listen(8080, () => {
  console.log('Server listening on http://localhost:8080');
});