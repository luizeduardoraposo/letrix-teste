const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'words-ptbr.txt');

const content = fs.readFileSync(FILE_PATH, 'utf-8');
const lowerContent = content.toLowerCase();
fs.writeFileSync(FILE_PATH, lowerContent);
console.log('Todas as letras maiúsculas foram convertidas para minúsculas em words-ptbr.txt');
