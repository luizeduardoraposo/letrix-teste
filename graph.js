

const fs = require('fs');
const path = require('path');

const WORDS_FILE = path.join(__dirname, 'words-ptbr-anagramas.txt');
const OUTPUT_FILE = path.join(__dirname, 'graph-data.json');

// Função para carregar palavras do arquivo
function loadWords(filePath) {
  return fs.readFileSync(filePath, 'utf-8')
    .split('\n')
    .map(w => w.trim())
    .filter(Boolean);
}

// Função para agrupar anagramas
function groupAnagrams(words) {
  const groups = {};
  words.forEach(word => {
    const key = word.split('').sort().join('');
    if (!groups[key]) groups[key] = [];
    groups[key].push(word);
  });
  return groups;
}

// Função para calcular frequência de letras (com repetições)
function getLetterFreq(groups) {
  const freq = {};
  Object.values(groups).forEach(group => {
    group.forEach(word => {
      word.split('').forEach(l => {
        if (l !== ',' && l !== ' ') {
          freq[l] = (freq[l] || 0) + 1;
        }
      });
    });
  });
  // Ordena do maior para o menor
  return Object.fromEntries(
    Object.entries(freq).sort((a, b) => b[1] - a[1])
  );
}

// Função para calcular frequência de letras (sem repetições por palavra)
function getLetterFreqUnique(groups) {
  const freq = {};
  Object.values(groups).forEach(group => {
    group.forEach(word => {
      [...new Set(word.split(''))].forEach(l => {
        if (l !== ',' && l !== ' ') {
          freq[l] = (freq[l] || 0) + 1;
        }
      });
    });
  });
  // Ordena do maior para o menor
  return Object.fromEntries(
    Object.entries(freq).sort((a, b) => b[1] - a[1])
  );
}

// Função para gerar array de grupos de anagramas
function getAnagramGroupsArray(groups) {
  return Object.values(groups).map(group => {
    // Garante que cada palavra é separada corretamente
    const wordsArray = Array.isArray(group) ? group : String(group).split(' ');
    // Pega a primeira palavra e calcula seu tamanho
    const firstWord = wordsArray[0].split(' ')[0];
    // Conta o número de palavras separadas por espaço
    const countwords = wordsArray.join(' ').split(' ').filter(Boolean).length;
    return {
      words: wordsArray.join(' '),
      letterscount: firstWord.length,
      countwords
    };
  });
}

// Execução principal
function main() {
  const words = loadWords(WORDS_FILE);
  const anagramGroups = groupAnagrams(words);
  const letterFreq = getLetterFreq(anagramGroups);
  const letterFreqUnique = getLetterFreqUnique(anagramGroups);
  const anagramGroupsArray = getAnagramGroupsArray(anagramGroups);

  const result = {
    letterFreq,
    letterFreqUnique,
    wordLengthCount: anagramGroupsArray
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));
  console.log('Analysis complete. Results saved to graph-data.json.');
}

main();
