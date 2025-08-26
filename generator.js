/**
 * Gera um array de 16 letras minúsculas aleatórias (de 'a' a 'z'), permitindo repetições.
 * @returns {string[]} Array com 16 letras sorteadas.
 */
function gerarLetrasAleatorias() {
  const letras = [];
  const alfabeto = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < 16; i++) {
    const indice = Math.floor(Math.random() * alfabeto.length);
    letras.push(alfabeto[indice]);
  }
  return letras;
}

// Preenche automaticamente a tabela 4x4 com letras aleatórias ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
  const letras = gerarLetrasAleatorias();
  const spans = document.querySelectorAll('#main-table td .hover-area');
  letras.forEach((letra, i) => {
    if (spans[i]) spans[i].textContent = letra;
  });
});
