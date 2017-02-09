const fs = require('fs');
const analyzer = require('.');
const whatsapp = require('./middlewares/whatsapp');

const stream = fs.createReadStream('chat.txt');

const a = analyzer(whatsapp);

a.analyze(stream, { wordCounterOptions: { ignorecase: true } })
  .then(console.log);
