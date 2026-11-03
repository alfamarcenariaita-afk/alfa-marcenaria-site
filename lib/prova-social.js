// lib/prova-social.js — decide se a pagina/menu "Clientes" existe: so quando ha depoimento
// autorizado OU avaliacoes do Google carregadas (pagina vazia seria conteudo fraco e link morto).
const { depoimentosAutorizados } = require("./depoimentos");
const { buscarAvaliacoesGoogle } = require("./avaliacoesGoogle");

async function temProvaSocial() {
  if (depoimentosAutorizados().length > 0) return true;
  return (await buscarAvaliacoesGoogle()) !== null;
}

module.exports = { temProvaSocial };
