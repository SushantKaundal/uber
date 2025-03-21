const http = require('http');
const app = require('./app');
const connectToDb = require('./db/db');

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);


connectToDb();

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});