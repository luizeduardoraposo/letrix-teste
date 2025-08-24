const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'words-ptbr-anagramas.txt');

// Ler o arquivo
const lines = fs.readFileSync(FILE_PATH, 'utf-8').split('\n');

// Substituir vírgulas por espaço em cada linha
const newLines = lines.map(line => line.replace(/,/g, ' '));

// Escrever de volta no arquivo
fs.writeFileSync(FILE_PATH, newLines.join('\n'));
console.log('Vírus removidas e substituídas por espaço em words-ptbr-anagramas.txt');
