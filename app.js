const express = require('express');
const app = express();

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/sim.html');
});

app.get('/asy', function (req, res) {
  res.sendFile(__dirname + '/asyncTest.html');
});

app.listen(8080, () => {
  console.log('Server listening on http://localhost:8080');
});