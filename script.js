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
}

gerarTabela(size);

let isMouseDown = false;
const mainTable = document.getElementById('main-table');

mainTable.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('hover-area')) {
    e.preventDefault();
    isMouseDown = true;
    e.target.parentElement.classList.add('destaque');
  }
});

mainTable.addEventListener('mousemove', (e) => {
  if (isMouseDown && e.target.classList.contains('hover-area')) {
    e.target.parentElement.classList.add('destaque');
  }
});

document.addEventListener('mouseup', () => {
  isMouseDown = false;
  const tds = document.querySelectorAll('#main-table td');
  tds.forEach(td => td.classList.remove('destaque'));
});

// Eventos de toque para dispositivos móveis
let isTouchActive = false;

mainTable.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  const target = document.elementFromPoint(touch.clientX, touch.clientY);
  if (target && target.classList.contains('hover-area')) {
    e.preventDefault();
    isTouchActive = true;
    target.parentElement.classList.add('destaque');
  }
}, { passive: false });

mainTable.addEventListener('touchmove', (e) => {
  if (!isTouchActive) return;
  const touch = e.touches[0];
  const target = document.elementFromPoint(touch.clientX, touch.clientY);
  if (target && target.classList.contains('hover-area')) {
    target.parentElement.classList.add('destaque');
  }
}, { passive: false });

mainTable.addEventListener('touchend', () => {
  isTouchActive = false;
  const tds = document.querySelectorAll('#main-table td');
  tds.forEach(td => td.classList.remove('destaque'));
});
