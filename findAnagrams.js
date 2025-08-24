const fs = require('fs');
const inputFile = 'words-ptbr.txt';
const outputFile = 'words-ptbr-anagramas.txt';

const words = fs.readFileSync(inputFile, 'utf-8').split(/\r?\n/).filter(Boolean);
const map = {};

for (const word of words) {
  const key = word.toLowerCase().split('').sort().join('');
  if (!map[key]) map[key] = [];
  map[key].push(word);
}

const anagrams = Object.values(map).filter(group => group.length > 1);
const result = anagrams.map(group => group.join(',')).join('\n');

fs.writeFileSync(outputFile, result);
