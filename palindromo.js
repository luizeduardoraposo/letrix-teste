const fs = require('fs');

function isPalindrome(word) {
  word = word.toLowerCase();
  return word === word.split('').reverse().join('');
}

function extractPalindromes(inputFile, dictFile, outputFile) {
  const dict = new Set(
    fs.readFileSync(dictFile, 'utf8')
      .split(/\r?\n/)
      .map(w => w.trim().toLowerCase())
      .filter(Boolean)
  );

  const words = fs.readFileSync(inputFile, 'utf8')
    .split(/\r?\n/)
    .map(w => w.trim().toLowerCase())
    .filter(Boolean);

  const palindromes = words.filter(word => dict.has(word) && isPalindrome(word));

  fs.writeFileSync(outputFile, palindromes.join('\n'), 'utf8');
  console.log(`Arquivo ${outputFile} criado com ${palindromes.length} palíndromos.`);
}

// Exemplo de uso:
extractPalindromes('words-ptbr.txt', 'words-ptbr.txt', 'words-ptbr-palindromos.txt');
// Para usar outro arquivo de entrada:
// extractPalindromes('entrada.txt', 'words-ptbr.txt', 'words-ptbr-palindromos.txt');

module.exports = { extractPalindromes };
