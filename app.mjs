import express from 'express';

const app = express();

// basic test route
app.get('/', (req, res) => {
  res.send('Hello Express from PM2 + NGINX');
});

// start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
