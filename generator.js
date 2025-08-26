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


// Função gerarLetrasAleatorias permanece global, sem preenchimento automático
