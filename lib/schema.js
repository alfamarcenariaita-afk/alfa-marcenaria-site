// lib/schema.js — dados estruturados (schema.org / JSON-LD) do site inteiro.
// Tudo se liga ao mesmo "negocio" por @id, formando um grafo de entidade (GEO): buscadores e IAs
// reconhecem que site, servicos, artigos e contato sao da MESMA empresa.
// Nao ha aggregateRating/Review de proposito: o Google ignora (e pode penalizar) avaliacao que o
// proprio negocio publica sobre si; depoimentos aparecem so como conteudo visivel.
const { siteConfig, absoluta } = require("./metadata");
const { urlAbrirMapa } = require("./mapas");
const { textoPuro, dataISO } = require("./seo");

const ID_NEGOCIO = siteConfig.url + "/#negocio";
const ID_SITE = siteConfig.url + "/#site";
const CTX = "https://schema.org";

function telefoneE164(contato) {
  const digitos = String(contato.whatsapp || contato.telefone || "").replace(/\D/g, "");
  return digitos ? "+" + digitos : undefined;
}

function negocio(contato, config) {
  return {
    "@type": "HomeAndConstructionBusiness",
    "@id": ID_NEGOCIO,
    name: config.nomeSite || siteConfig.nome,
    url: siteConfig.url,
    description: siteConfig.descricao,
    logo: { "@type": "ImageObject", url: absoluta(config.logo || "/logo.png") },
    image: absoluta(config.bannerImagem || config.logo || "/logo.png"),
    telephone: telefoneE164(contato),
    address: {
      "@type": "PostalAddress",
      // cidade/UF fixas: o CMS ainda nao tem esses campos (rua e bairro vem de enderecoRua)
      streetAddress: contato.enderecoRua || contato.endereco,
      addressLocality: "Itabirito",
      addressRegion: "MG",
      addressCountry: "BR",
    },
    ...(contato.mapaBusca ? { hasMap: urlAbrirMapa(contato.mapaBusca) } : {}),
    areaServed: [
      { "@type": "City", name: "Itabirito" },
      { "@type": "AdministrativeArea", name: "Itabirito e região, MG" },
    ],
    // fixo em formato schema.org; manter sincronizado com contato.horario ("Segunda a sexta, 8h às 18h")
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    foundingDate: siteConfig.fundacao,
    knowsAbout: [
      "Marcenaria sob medida",
      "Portas de madeira",
      "Marcos de porta e janela",
      "Janelas de madeira",
      "Escadas e corrimãos de madeira",
      "Painéis ripados",
    ],
    sameAs: [siteConfig.instagram],
  };
}

function website(config) {
  return {
    "@type": "WebSite",
    "@id": ID_SITE,
    url: siteConfig.url,
    name: config.nomeSite || siteConfig.nome,
    inLanguage: "pt-BR",
    publisher: { "@id": ID_NEGOCIO },
  };
}

function grafoGlobal(contato, config) {
  return { "@context": CTX, "@graph": [negocio(contato, config), website(config)] };
}

// itens: [{ nome, caminho }] — do primeiro nivel (Inicio) ate a pagina atual
function breadcrumb(itens) {
  return {
    "@context": CTX,
    "@type": "BreadcrumbList",
    itemListElement: itens.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.nome,
      item: siteConfig.url + it.caminho,
    })),
  };
}

function faq(itens) {
  if (!itens || itens.length === 0) return null;
  return {
    "@context": CTX,
    "@type": "FAQPage",
    mainEntity: itens.map((i) => ({
      "@type": "Question",
      name: i.pergunta,
      acceptedAnswer: { "@type": "Answer", text: i.resposta },
    })),
  };
}

function artigo(post, url) {
  const publicado = dataISO(post.data);
  const atualizado = dataISO(post.atualizado) || publicado;
  return {
    "@context": CTX,
    "@type": "Article",
    headline: post.titulo,
    description: post.resumo,
    inLanguage: "pt-BR",
    datePublished: publicado,
    dateModified: atualizado,
    ...(post.imagemCapa ? { image: [absoluta(post.imagemCapa)] } : {}),
    author: { "@type": "Organization", "@id": ID_NEGOCIO, name: siteConfig.nome },
    publisher: { "@id": ID_NEGOCIO },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    wordCount: textoPuro(post.corpoHtml).split(" ").length,
  };
}

function servico(s, url, descricao) {
  return {
    "@context": CTX,
    "@type": "Service",
    name: s.nome,
    serviceType: s.categoria,
    description: descricao,
    url,
    ...(s.imagem ? { image: absoluta(s.imagem) } : {}),
    provider: { "@id": ID_NEGOCIO },
    areaServed: { "@type": "City", name: "Itabirito" },
  };
}

function listaItens(nome, itens) {
  return {
    "@context": CTX,
    "@type": "ItemList",
    name: nome,
    itemListElement: itens.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.nome,
      url: it.url,
    })),
  };
}

function paginaDeContato(url) {
  return {
    "@context": CTX,
    "@type": "ContactPage",
    name: "Contato",
    url,
    mainEntity: { "@id": ID_NEGOCIO },
  };
}

function paginaSobre(url) {
  return {
    "@context": CTX,
    "@type": "AboutPage",
    name: "Sobre a Alfa Marcenaria",
    url,
    about: { "@id": ID_NEGOCIO },
  };
}

module.exports = {
  grafoGlobal,
  breadcrumb,
  faq,
  artigo,
  servico,
  listaItens,
  paginaDeContato,
  paginaSobre,
};
