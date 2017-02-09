const fs = require('fs');
const counter = require('.');
const whatsapp = require('./middlewares/whatsapp');

const stream = fs.createReadStream('chat.txt');

const c = counter(whatsapp);

c.count(stream, { wordCounterOptions: { ignorecase: true } })
  .then(console.log);
