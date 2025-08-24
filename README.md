# Projeto Letríx Teste

Este projeto é uma aplicação web para análise e visualização de anagramas e palíndromos em português, utilizando Node.js e D3.js.

## Funcionalidades

- **Busca de Anagramas:**
  - O script `findAnagrams.js` lê o arquivo `words-ptbr.txt` e identifica grupos de palavras que são anagramas entre si, salvando o resultado em `words-ptbr-anagramas.txt`.

- **Geração de Dados para Gráficos:**
  - O script `graph.js` lê `words-ptbr-anagramas.txt` e gera o arquivo `graph-data.json` com estatísticas para visualização:
    - Número de anagramas por palavra
    - Palavras com mais anagramas
    - Distribuição por tamanho da palavra
    - Frequência de letras em anagramas

- **Visualização Gráfica:**
  - A página `graph.html` utiliza D3.js para exibir gráficos de barras interativos e responsivos, mostrando as estatísticas geradas.
  - O layout e estilos dos gráficos são definidos em `graph.css` para garantir responsividade e centralização.

- **Palíndromos:**
  - O arquivo `palindromo.js` pode ser usado para identificar palíndromos, dependendo da implementação.

## Estrutura dos Arquivos

- `words-ptbr.txt`: Lista de palavras em português.
- `words-ptbr-anagramas.txt`: Grupos de anagramas gerados pelo script.
- `graph-data.json`: Dados estatísticos para os gráficos.
- `findAnagrams.js`: Script Node.js para busca de anagramas.
- `graph.js`: Script Node.js/browser para geração e visualização dos gráficos.
- `graph.html`: Página web para visualização dos gráficos.
- `graph.css`: Estilos para os gráficos.
- `palindromo.js`: (Opcional) Script para análise de palíndromos.
- `index.html`, `script.js`, `style.css`: Página principal e scripts/estilos gerais do projeto.

## Como Usar

1. **Gerar anagramas:**
   ```
   node findAnagrams.js
   ```
   Isso cria o arquivo `words-ptbr-anagramas.txt`.

2. **Gerar dados para gráficos:**
   ```
   node graph.js
   ```
   Isso cria o arquivo `graph-data.json`.

3. **Visualizar gráficos:**
   - Abra `graph.html` em um navegador. Os gráficos serão renderizados automaticamente usando os dados gerados.

## Tecnologias Utilizadas

- Node.js
- D3.js
- HTML, CSS, JavaScript

## Observações

- O projeto pode ser expandido para incluir outras análises linguísticas, como palíndromos ou estatísticas de palavras.
- Os arquivos de palavras podem ser substituídos por listas maiores ou diferentes conforme necessário.
- O layout dos gráficos é responsivo e adaptável a diferentes resoluções de tela.

## Autor

Desenvolvido por Luiz Eduardo Raposo.
