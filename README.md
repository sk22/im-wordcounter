# WhatsApp Word Counter

## Installation

```
yarn add sk22/im-wordcounter.js
```

## Usage

```javascript
const fs = require('fs');
const analyzer = require('im-wordcounter');
const whatsapp = require('im-wordcounter/middlewares/whatsapp');

const stream = fs.createReadStream('chat.txt');
const a = analyzer(whatsapp);

a.analyze(stream).then(console.log);
```

`analyze` returns a Promise that resolves to an array of objects, like this:

```javascript
[ { word: 'foo', count: 2 },
  { word: 'bar', count: 1 } ]
```

## Options

An Analyzer's `analyze` function takes an options object as its second parameter.

The `wc` object is what is passed to the `wordcounter` constructor.
For information about its parameters, see [Word Counter by Fengyuan Chen on GitHub](https://github.com/fengyuanchen/wordcounter)

Here's an example on how to alter these options.

```javascript
a.analyze(stream, { sorted: true, wc: { ignorecase: true } })
```

These are the default values:

```javascript
{
  sorted: true,
  wc: {
    ignorecase: true,
    ignore: ['_'],
    report: false,
  },
}
```

## Middleware

Middlewares are functions that convert a line to a string that only contains
the actual message sent by the user.

Therefore, a middleware's signature looks like this:

```javascript
(line: string) => string
```

### WhatsApp

At the moment, this is the only middleware available.

To make use of it, use the `Email chat` feature on your phone's WhatsApp
app to get the chat history. The middleware will filter out the actual messages
from the file.

Since line breaks by multi-line messages are represented as normal line breaks,
lines that do not have the prefix (date, sender) are treated as messages as a
whole.

## Example

WhatsApp chat:

```
2/2/17, 09:46 - John Doe: Hello!
2/2/17, 09:48 - Samuel Kaiser: Hello!
2/2/17, 09:48 - Samuel Kaiser: How are you?
```

Result:

```javascript
[ { word: 'hello', count: 2 },
  { word: 'are', count: 1 },
  { word: 'how', count: 1 },
  { word: 'you', count: 1 } ]
```

