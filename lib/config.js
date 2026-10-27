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
  seoTituloHome: "",
  seoDescricaoHome: "",
  tituloFaq: "Perguntas frequentes",
  // Respostas tiradas dos proprios posts do blog (nada inventado): mantem site e blog coerentes.
  faq: [
    {
      pergunta: "Quanto custa um marco de porta em madeira sob medida?",
      resposta:
        "O preço depende de três coisas: o tipo de madeira, a medida do vão e o acabamento. Não existe uma tabela única porque cada obra tem uma medida diferente. Mande a medida do vão pelo WhatsApp e receba um orçamento certeiro.",
    },
    {
      pergunta: "Cumaru ou Angelim: qual madeira escolher para porta, marco e alizar?",
      resposta:
        "O Cumaru é mais escuro, mais denso e geralmente mais caro; o Angelim é mais claro, mais leve no bolso e ainda assim resistente para uso residencial. A escolha depende do acabamento da obra e do orçamento.",
    },
    {
      pergunta: "Quanto tempo demora para fazer uma porta ou marco sob medida?",
      resposta:
        "Depende da fila de produção no momento, do tipo de peça e da disponibilidade da madeira. Quem já sabe a data da obra e avisa com antecedência tem mais facilidade de encaixar o prazo.",
    },
    {
      pergunta: "A Alfa Marcenaria atende fora de Itabirito?",
      resposta:
        "A Alfa atende Itabirito e região. Vale confirmar a distância da sua obra na conversa pelo WhatsApp.",
    },
    {
      pergunta: "A Alfa Marcenaria acompanha a instalação e oferece pós-venda?",
      resposta:
        "Sim. A Alfa acompanha a obra até o final e segue disponível no pós-venda: não é só entregar a peça e sumir.",
    },
    {
      pergunta: "Preciso ir até a marcenaria para pedir orçamento?",
      resposta:
        "Não necessariamente. Dá para mandar a medida do vão e fotos por WhatsApp e já receber uma avaliação inicial.",
    },
  ],
  tituloDepoimentos: "O que dizem nossos clientes",
  linkAvaliacaoGoogle: "",
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
  // FAQ: ignora itens com pergunta ou resposta em branco; lista toda vazia volta pro padrao
  const faqLido = Array.isArray(lido.faq) ? lido.faq.filter((i) => i && i.pergunta && i.resposta) : [];
  cfg.faq = faqLido.length > 0 ? faqLido : PADRAO.faq;
  const esc = Number(cfg.bannerEscurecer);
  cfg.bannerEscurecer = Number.isFinite(esc) ? Math.min(90, Math.max(0, esc)) : PADRAO.bannerEscurecer;
  return cfg;
}

module.exports = { obterConfig, PADRAO };
