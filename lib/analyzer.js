const readline = require('readline');
const WordCounter = require('wordcounter');

const handleLine = (data, middlewares, wordcounter) => (line) => {
  const reduced = middlewares.reduce((v, m) => m(v), line);
  data.push(wordcounter.count(reduced));
};

const aggregateData = (data) => {
  // [
  //  [{ word: 'hi', count: 1 }, { word: 'there', count: 1 }],
  //  [{ word: 'oh', count: 1 }, { word: 'hi', count: 1 }],
  // ]

  // { hi: 2, there: 1, oh: 1 }
  const words = {};

  const addWords = (object) => {
    words[object.word] =
      object.count + (words[object.word] ? words[object.word] : 0);
  };

  data.forEach(message => message.forEach(addWords));

  // [
  //   { word: 'hi', count: 2 },
  //   { word: 'there', count: 1 },
  //   { word: 'oh', count: 1 },
  // ]
  const object =
    Object.entries(words).map(pair => ({ word: pair[0], count: pair[1] }));

  return object;
};

/**
 * @param {Function[]} middleware
 */
module.exports = (...middlewares) => ({
  /**
   * Analyzes the given text supplied by the passed readable stream
   *
   * @param {Readable} input                 Stream
   * @param {object}   options
   * @param {boolean}  [options.sorted=true] Sort result by count
   * @param {object}   options.wc            WordCounter options
   * @return {array}
   */
  analyze: (input, { sorted = true, wc } = {}) => new Promise((resolve) => {
    const rl = readline.createInterface({ input });
    const data = [];

    const wordcounter = new WordCounter(Object.assign({
      ignorecase: true,
      ignore: ['_'],
      report: false,
    }, wc));

    rl.on('line', handleLine(data, middlewares, wordcounter));
    rl.on('close', () => {
      const aggregated = aggregateData(data);
      if (sorted) aggregated.sort((a, b) => b.count - a.count);
      return resolve(aggregated);
    });
  }),
});
