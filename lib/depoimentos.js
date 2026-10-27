// lib/depoimentos.js — conteudo gerado por clientes (UGC): depoimentos e fotos de obras entregues,
// cadastrados no painel /admin. LGPD: so aparece quem tem `autorizado: true` (o cliente deu o
// OK pra publicar nome, texto e foto); sem esse campo marcado, o depoimento fica escondido.
const { obterColecao } = require("./content");

function depoimentosAutorizados(slugServico) {
  return obterColecao("depoimentos")
    .filter((d) => d.autorizado === true && d.nome && d.corpoHtml && d.corpoHtml.trim())
    .filter((d) => !slugServico || d.produto === slugServico)
    .map((d) => {
      const nota = Number(d.nota);
      return { ...d, nota: nota >= 1 && nota <= 5 ? Math.round(nota) : null };
    });
}

module.exports = { depoimentosAutorizados };
