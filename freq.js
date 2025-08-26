document.getElementById('fileInput').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    const freq = calculaFrequenciaLetras(text);
    atualizaTabela(freq);
  };
  reader.readAsText(file);
});

function calculaFrequenciaLetras(texto) {
  const freq = {};
  for (const char of texto.toLowerCase()) {
    if (char >= 'a' && char <= 'z') {
      freq[char] = (freq[char] || 0) + 1;
    }
  }
  return freq;
}

function atualizaTabela(freq) {
  const tbody = document.getElementById('freqTable').querySelector('tbody');
  tbody.innerHTML = '';
  Object.keys(freq).sort().forEach(letra => {
    const tr = document.createElement('tr');
    const tdLetra = document.createElement('td');
    tdLetra.textContent = letra;
    const tdFreq = document.createElement('td');
    tdFreq.textContent = freq[letra];
    tr.appendChild(tdLetra);
    tr.appendChild(tdFreq);
    tbody.appendChild(tr);
  });

  // Atualiza a segunda tabela ordenada por frequência
  const tbodySorted = document.getElementById('freqTableSorted').querySelector('tbody');
  tbodySorted.innerHTML = '';
  Object.entries(freq)
    .sort((a, b) => b[1] - a[1]) // Ordena por frequência decrescente
    .forEach(([letra, quantidade]) => {
      const tr = document.createElement('tr');
      const tdLetra = document.createElement('td');
      tdLetra.textContent = letra;
      const tdFreq = document.createElement('td');
      tdFreq.textContent = quantidade;
      tr.appendChild(tdLetra);
      tr.appendChild(tdFreq);
      tbodySorted.appendChild(tr);
    });
}