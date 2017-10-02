
const express = require('express');
const http = require('http');
const graphQLHTTP = require('express-graphql');
const schema = require('./schema');
const app = express();

app.use(
  '/',
  graphQLHTTP({
    schema,
    graphiql: true,
  }));

app.set('port', 3000);

const server = http.createServer(app);

server.listen(3000);

server.on('listening', () => {
  console.log('Listening at http://localhost:3000');
});

