// lib/seo.js — ajudantes de SEO/AEO: texto puro, resumo pra meta description, FAQ extraido do
// corpo dos posts e ligacao servico <-> post do blog (links internos).
const { obterColecao, obterItemColecao } = require("./content");

const ENTIDADES = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&nbsp;": " " };

function textoPuro(html = "") {
  return String(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (m) => ENTIDADES[m])
    .replace(/\s+/g, " ")
    .trim();
}

// resumo pra <meta name="description"> (Google corta perto de 155-160 caracteres)
function resumir(html, max = 155) {
  const t = textoPuro(html);
  if (t.length <= max) return t;
  const corte = t.slice(0, max);
  const i = corte.lastIndexOf(" ");
  return corte.slice(0, i > 80 ? i : max).replace(/[,;:\-–—\s]+$/, "") + "…";
}

// Os posts terminam com "## Perguntas frequentes" + "**Pergunta?**\nResposta" por paragrafo.
// Vira FAQPage (schema.org) — o formato que buscadores e IAs mais citam como resposta direta.
function extrairFaq(html = "") {
  const bloco = /<h2[^>]*>\s*Perguntas frequentes\s*<\/h2>([\s\S]*?)(?=<hr|<h2|$)/i.exec(html);
  if (!bloco) return [];
  const itens = [];
  const re = /<p><strong>([\s\S]*?)<\/strong>\s*([\s\S]*?)<\/p>/g;
  let m;
  while ((m = re.exec(bloco[1]))) {
    const pergunta = textoPuro(m[1]);
    const resposta = textoPuro(m[2]);
    if (pergunta && resposta) itens.push({ pergunta, resposta });
  }
  return itens;
}

// slug do servico -> slug do post quando os nomes diferem (nos demais, o slug e igual)
const POST_DO_SERVICO = {
  "porta-almofada-vitro": "porta-almofada-com-vitro",
  "marco-de-janela": "marco-de-janela-em-madeira",
  "marco-de-porta": "marco-de-porta-em-madeira",
  corrimao: "corrimao-de-madeira",
  "peca-personalizada": "peca-personalizada-em-madeira",
};

function postRelacionado(slugServico) {
  return obterItemColecao("blog", POST_DO_SERVICO[slugServico] || slugServico);
}

function servicoDoPost(slugPost) {
  return obterColecao("servicos").find((s) => (POST_DO_SERVICO[s.slug] || s.slug) === slugPost) || null;
}

function dataISO(d) {
  return d ? new Date(d).toISOString().slice(0, 10) : undefined;
}

function dataBR(d) {
  return new Date(d).toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

module.exports = { textoPuro, resumir, extrairFaq, postRelacionado, servicoDoPost, dataISO, dataBR };
