// lib/config.js — configuracoes globais do site (cores, logo, banner, textos fixos) editaveis
// pelo painel /admin (content/paginas/config.md). Todo campo tem valor padrao: se a Lucilene
// apagar algo sem querer, o site continua igual ao original em vez de quebrar.
const { obterPagina } = require("./content");

const PADRAO = {
  nomeSite: "Alfa Marcenaria",
  logo: "/logo.png",
  corEscura: "#251A11",
  corDestaque: "#B0824A",
  corFundo: "#F8F3EC",
  bannerImagem: "/images/uploads/fachada-porta-pivotante.jpg",
  bannerEscurecer: 70,
  selos: [
    { titulo: "20+ anos de experiência", texto: "know-how do sócio André no setor de marcenaria" },
    { titulo: "Acompanhamento até o fim", texto: "da medição à instalação, sem sumir no meio da obra" },
    { titulo: "Pós-venda incluso", texto: "suporte depois da entrega, não só até o pagamento" },
  ],
  tituloServicosHome: "Nossos serviços",
  tituloServicos: "Nossos serviços",
  textoLinkServicos: "Ver todos os serviços →",
  textoBotaoContato: "Falar no WhatsApp",
  textoOrcamento:
    "Orçamento sem compromisso. Atendimento direto com quem faz a peça, do orçamento à entrega.",
};

function vazio(v) {
  return v === undefined || v === null || v === "";
}

function obterConfig(baseDir) {
  let lido = {};
  try {
    lido = obterPagina("config", baseDir);
  } catch {
    lido = {};
  }
  const cfg = { ...PADRAO };
  for (const chave of Object.keys(PADRAO)) {
    if (!vazio(lido[chave])) cfg[chave] = lido[chave];
  }
  if (!Array.isArray(lido.selos) || lido.selos.length === 0) cfg.selos = PADRAO.selos;
  const esc = Number(cfg.bannerEscurecer);
  cfg.bannerEscurecer = Number.isFinite(esc) ? Math.min(90, Math.max(0, esc)) : PADRAO.bannerEscurecer;
  return cfg;
}

module.exports = { obterConfig, PADRAO };
