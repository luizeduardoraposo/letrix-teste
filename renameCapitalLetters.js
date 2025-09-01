
const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'words-ptbr.txt');

const content = fs.readFileSync(FILE_PATH, 'utf-8');
const upperContent = content.toUpperCase();
fs.writeFileSync(FILE_PATH, upperContent);
console.log('Todas as letras foram convertidas para MAIÚSCULAS em words-ptbr.txt');
