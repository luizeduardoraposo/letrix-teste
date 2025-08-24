
const size = 4; // Altere para o tamanho desejado

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
