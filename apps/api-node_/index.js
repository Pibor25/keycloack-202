const express = require('express');
const { authenticateToken, requireRole } = require('./auth.middleware');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});


app.listen(port, () => {
    console.log('API Node initialized on port ' + port);
});


app.get('/protected',authenticateToken,requireRole('admin'), (req, res) => {
  res.json({
    message: 'This is a protected resource (no validation yet)',
    timestamp: new Date().toISOString()
  });
});