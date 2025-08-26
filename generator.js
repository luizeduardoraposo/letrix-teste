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

// Preenche automaticamente a tabela com letras aleatórias ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
  const spans = document.querySelectorAll('#main-table td .hover-area');
  const letras = gerarLetrasAleatorias(spans.length);
  letras.forEach((letra, i) => {
    if (spans[i]) spans[i].textContent = letra;
  });
});
