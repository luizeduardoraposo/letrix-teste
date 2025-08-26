// MODAL E CONFIGURAÇÕES
function setupModalEvents() {
  const settingsBtn = document.getElementById('settings-btn');
  const settingsModal = document.getElementById('settings-modal');
  const closeModalBtn = settingsModal ? settingsModal.querySelector('.close-modal') : null;
  const positionCards = settingsModal ? settingsModal.querySelectorAll('.position-card') : [];
  const tableSection = document.getElementById('game-section');
  function openModal() {
    settingsModal.classList.remove('hidden');
  }
  function closeModal() {
    settingsModal.classList.add('hidden');
  }
  settingsBtn && settingsBtn.addEventListener('click', openModal);
  closeModalBtn && closeModalBtn.addEventListener('click', closeModal);
  settingsModal && settingsModal.addEventListener('click', function (e) {
    if (e.target === settingsModal) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
  // Seleção de posição da tabela
  positionCards.forEach(card => {
    card.addEventListener('click', function () {
      positionCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const pos = card.getAttribute('data-pos');
      tableSection.classList.remove('table-left', 'table-center', 'table-right');
      tableSection.classList.add('table-' + pos);
      closeModal();
    });
  });
  // Opções do modal (Novo Jogo, Torneio, Ranking, Perfil)
  settingsModal && settingsModal.querySelectorAll('.modal-option').forEach(btn => {
    btn.addEventListener('click', function () {
      alert('Opção: ' + btn.textContent);
      closeModal();
    });
  });
}
setupModalEvents();
const size = 4; // Altere para o tamanho desejado

// Função para gerar a tabela dinamicamente
function gerarTabela(size) {
  const mainTable = document.getElementById('main-table');
  mainTable.innerHTML = '';
  for (let i = 0; i < size; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < size; j++) {
      const td = document.createElement('td');
      const span = document.createElement('span');
      span.className = 'hover-area';
      td.appendChild(span);
      tr.appendChild(td);
    }
    mainTable.appendChild(tr);
  }
  // Preencher letras após criar a tabela
  if (typeof gerarLetrasAleatorias === 'function') {
    const spans = mainTable.querySelectorAll('.hover-area');
    const letras = gerarLetrasAleatorias(spans.length);
    letras.forEach((letra, i) => {
      if (spans[i]) spans[i].textContent = letra;
    });
  }
}

gerarTabela(size);


let isMouseDown = false;
let startCell = null;
let lastCell = null;
let highlightedCells = new Set();
const mainTable = document.getElementById('main-table');

function getCellPosition(cell) {
  const td = cell.parentElement;
  const tr = td.parentElement;
  const row = Array.from(mainTable.rows).indexOf(tr);
  const col = Array.from(tr.cells).indexOf(td);
  return { row, col };
}

function getCellsInDirection(start, end) {
  const cells = [];
  const dr = end.row - start.row;
  const dc = end.col - start.col;
  // Só permite linha reta horizontal, vertical ou diagonal exata
  if (dr === 0 && dc !== 0) { // horizontal
    const step = dc > 0 ? 1 : -1;
    for (let c = start.col; c !== end.col + step; c += step) {
      cells.push(mainTable.rows[start.row].cells[c]);
    }
    return cells;
  } else if (dc === 0 && dr !== 0) { // vertical
    const step = dr > 0 ? 1 : -1;
    for (let r = start.row; r !== end.row + step; r += step) {
      cells.push(mainTable.rows[r].cells[start.col]);
    }
    return cells;
  } else if (Math.abs(dr) === Math.abs(dc) && dr !== 0) { // diagonal exata
    const stepR = dr > 0 ? 1 : -1;
    const stepC = dc > 0 ? 1 : -1;
    for (let i = 0; i <= Math.abs(dr); i++) {
      const r = start.row + i * stepR;
      const c = start.col + i * stepC;
      cells.push(mainTable.rows[r].cells[c]);
    }
    return cells;
  }
  // Se não for linha reta ou diagonal exata, retorna apenas a célula inicial
  return [mainTable.rows[start.row].cells[start.col]];
}

function getAdjacentCells(start, end) {
  // Apenas células adjacentes (ortogonais ou diagonais)
  const cells = [];
  const dr = Math.abs(end.row - start.row);
  const dc = Math.abs(end.col - start.col);
  if ((dr <= 1 && dc <= 1) && !(dr === 0 && dc === 0)) {
    cells.push(mainTable.rows[start.row].cells[start.col]);
    cells.push(mainTable.rows[end.row].cells[end.col]);
    return cells;
  }
  // Se não for adjacente, retorna apenas a célula inicial
  return [mainTable.rows[start.row].cells[start.col]];
}

mainTable.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('hover-area')) {
    e.preventDefault();
    isMouseDown = true;
    startCell = getCellPosition(e.target);
    lastCell = startCell;
    highlightedCells.clear();
    // Destaca apenas a célula inicial
    e.target.parentElement.classList.add('destaque');
    highlightedCells.add(e.target.parentElement);
  }
});

mainTable.addEventListener('mousemove', (e) => {
  if (isMouseDown && e.target.classList.contains('hover-area')) {
    const currCell = getCellPosition(e.target);
    // Verifica se é adjacente à última célula destacada
    if (lastCell && Math.abs(currCell.row - lastCell.row) <= 1 && Math.abs(currCell.col - lastCell.col) <= 1 && !(currCell.row === lastCell.row && currCell.col === lastCell.col)) {
      const td = e.target.parentElement;
      if (!highlightedCells.has(td)) {
        td.classList.add('destaque');
        highlightedCells.add(td);
        lastCell = currCell;
      }
    }
  }
});

document.addEventListener('mouseup', () => {
  isMouseDown = false;
  highlightedCells.clear();
  const tds = document.querySelectorAll('#main-table td');
  tds.forEach(td => td.classList.remove('destaque'));
});

// Eventos de toque para dispositivos móveis
let isTouchActive = false;
let lastTouchCell = null;

mainTable.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  const target = document.elementFromPoint(touch.clientX, touch.clientY);
  if (target && target.classList.contains('hover-area')) {
    e.preventDefault();
    isTouchActive = true;
    const cellPos = getCellPosition(target);
    lastTouchCell = cellPos;
    highlightedCells.clear();
    target.parentElement.classList.add('destaque');
    highlightedCells.add(target.parentElement);
  }
}, { passive: false });

mainTable.addEventListener('touchmove', (e) => {
  if (!isTouchActive) return;
  const touch = e.touches[0];
  const target = document.elementFromPoint(touch.clientX, touch.clientY);
  if (target && target.classList.contains('hover-area')) {
    const currCell = getCellPosition(target);
    // Só permite avançar para células adjacentes não destacadas
    if (lastTouchCell && Math.abs(currCell.row - lastTouchCell.row) <= 1 && Math.abs(currCell.col - lastTouchCell.col) <= 1 && !(currCell.row === lastTouchCell.row && currCell.col === lastTouchCell.col)) {
      const td = target.parentElement;
      if (!highlightedCells.has(td)) {
        td.classList.add('destaque');
        highlightedCells.add(td);
        lastTouchCell = currCell;
      }
    }
  }
}, { passive: false });

mainTable.addEventListener('touchend', () => {
  isTouchActive = false;
  lastTouchCell = null;
  highlightedCells.clear();
  const tds = document.querySelectorAll('#main-table td');
  tds.forEach(td => td.classList.remove('destaque'));
});

/**
 * Gera um array de letras minúsculas aleatórias (de 'a' a 'z'), permitindo repetições.
 * @param {number} quantidade Quantidade de letras a serem geradas.
 * @returns {string[]} Array com letras sorteadas.
 */
function gerarLetrasAleatorias(quantidade) {
  const letras = [];
  const alfabeto = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < quantidade; i++) {
    const indice = Math.floor(Math.random() * alfabeto.length);
    letras.push(alfabeto[indice]);
  }
  return letras;
}
