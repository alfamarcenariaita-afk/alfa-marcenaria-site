// lib/mapas.js — links do Google Maps a partir de um texto de busca (endereco ou nome do local).
// O embed `maps?q=...&output=embed` funciona sem chave de API; o texto vem do painel /admin
// (Contato > "Busca do Google Maps"), entao a Lucilene ajusta sozinha se o pin sair errado.

function urlAbrirMapa(busca) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(busca)}`;
}

function urlEmbedMapa(busca) {
  return `https://www.google.com/maps?q=${encodeURIComponent(busca)}&output=embed`;
}

module.exports = { urlAbrirMapa, urlEmbedMapa };
