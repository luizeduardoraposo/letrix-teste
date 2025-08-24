// ...existing code...
// Funções de renderização dos gráficos para uso no browser
function createBarChart({ data, xDomain, yDomain, xLabel, yLabel, title, container, color1, color2 }) {
  const containerEl = document.querySelector(container);
  const width = containerEl ? containerEl.offsetWidth : 600;
  const height = 0.6 * width;
  const margin = Math.max(40, Math.round(width * 0.08));
  const svg = d3.select(container).append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .attr('class', 'graph-svg');
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', margin / 2)
    .attr('text-anchor', 'middle')
    .attr('class', 'graph-title')
    .text(title);
  const x = d3.scaleBand().domain(xDomain).range([margin, width - margin]).padding(0.15);
  const y = d3.scaleLinear().domain([0, yDomain]).range([height - margin, margin]);
  svg.append('g').attr('transform', `translate(0,${height - margin})`).call(d3.axisBottom(x)).selectAll('text').attr('class', 'graph-axis-label');
  svg.append('g').attr('transform', `translate(${margin},0)`).call(d3.axisLeft(y)).selectAll('text').attr('class', 'graph-axis-label');
  svg.append('text').attr('x', width / 2).attr('y', height - 10).attr('text-anchor', 'middle').attr('class', 'graph-xlabel').text(xLabel);
  svg.append('text').attr('transform', 'rotate(-90)').attr('x', -height / 2).attr('y', 15).attr('text-anchor', 'middle').attr('class', 'graph-ylabel').text(yLabel);
  const defs = svg.append('defs');
  const gradientId = 'barGradient' + Math.random().toString(36).slice(2, 8);
  const grad = defs.append('linearGradient').attr('id', gradientId).attr('x1', '0%').attr('y1', '0%').attr('x2', '0%').attr('y2', '100%');
  grad.append('stop').attr('offset', '0%').attr('stop-color', color1);
  grad.append('stop').attr('offset', '100%').attr('stop-color', color2);
  const tooltip = d3.select(container).append('div').attr('class', 'graph-tooltip').style('opacity', 0);
  svg.selectAll('rect').data(data).enter().append('rect')
    .attr('x', d => x(d.x))
    .attr('y', height - margin)
    .attr('width', x.bandwidth())
    .attr('height', 0)
    .attr('fill', `url(#${gradientId})`)
    .on('mousemove', function (event, d) {
      tooltip.style('opacity', 1)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 20) + 'px')
        .html(`<b>${d.x}</b>: ${d.y}`);
    })
    .on('mouseleave', function () { tooltip.style('opacity', 0); })
    .transition().duration(900)
    .attr('y', d => y(d.y))
    .attr('height', d => height - margin - y(d.y));
}

function renderGraphs(data) {
  // Número de anagramas por palavra
  const anagramsData = Object.entries(data.anagramsPerWord).map(([num, count]) => ({ x: num, y: count }));
  createBarChart({
    data: anagramsData,
    xDomain: anagramsData.map(d => d.x),
    yDomain: d3.max(anagramsData, d => d.y),
    xLabel: 'Quantidade de Anagramas',
    yLabel: 'Número de Palavras',
    title: 'Número de Anagramas por Palavra',
    container: '#graph-container',
    color1: '#69b3a2',
    color2: '#b3e6ff'
  });

  // Distribuição por tamanho da palavra
  const lengthData = Object.entries(data.wordLengthDistribution).map(([len, count]) => ({ x: len, y: count }));
  createBarChart({
    data: lengthData,
    xDomain: lengthData.map(d => d.x),
    yDomain: d3.max(lengthData, d => d.y),
    xLabel: 'Tamanho da Palavra',
    yLabel: 'Número de Palavras',
    title: 'Distribuição por Tamanho da Palavra',
    container: '#graph-container',
    color1: '#ffb347',
    color2: '#ffe6b3'
  });

  // Frequência de letras em anagramas
  const freqData = Object.entries(data.letterFrequency).map(([letter, count]) => ({ x: letter, y: count })).sort((a, b) => b.y - a.y);
  createBarChart({
    data: freqData,
    xDomain: freqData.map(d => d.x),
    yDomain: d3.max(freqData, d => d.y),
    xLabel: 'Letra',
    yLabel: 'Frequência',
    title: 'Frequência de Letras em Anagramas',
    container: '#graph-container',
    color1: '#a347ff',
    color2: '#e6b3ff'
  });
}

if (typeof window !== 'undefined') {
  window.renderGraphs = renderGraphs;
}
const fs = require('fs');
const inputFile = 'words-ptbr-anagramas.txt';
const outputFile = 'graph-data.json';

const lines = fs.readFileSync(inputFile, 'utf-8').split(/\r?\n/).filter(Boolean);

const anagramGroups = lines.map(line => line.split(','));

const anagramsPerWord = {};
const wordsWithMostAnagrams = [];
const wordLengthDistribution = {};
const letterFrequency = {};
let maxAnagrams = 0;

for (const group of anagramGroups) {
  for (const word of group) {
    const count = group.length - 1;
    anagramsPerWord[count] = (anagramsPerWord[count] || 0) + 1;
    if (count > maxAnagrams) {
      maxAnagrams = count;
      wordsWithMostAnagrams.length = 0;
      wordsWithMostAnagrams.push(word);
    } else if (count === maxAnagrams) {
      wordsWithMostAnagrams.push(word);
    }
    const len = word.length;
    wordLengthDistribution[len] = (wordLengthDistribution[len] || 0) + 1;
    for (const letter of word.toLowerCase()) {
      if (letter.match(/[a-záéíóúãõâêôç]/i)) {
        letterFrequency[letter] = (letterFrequency[letter] || 0) + 1;
      }
    }
  }
}

const data = {
  anagramsPerWord,
  wordsWithMostAnagrams,
  wordLengthDistribution,
  letterFrequency,
  maxAnagrams
};

fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
