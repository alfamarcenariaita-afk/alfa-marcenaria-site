// lib/metadata.js — configuracao central do site e helper de metadata pro Next.js.
// Trocar `url` aqui quando o dominio definitivo (Registro.br) for confirmado.
const siteConfig = {
  nome: "Alfa Marcenaria",
  tituloPadrao: "Alfa Marcenaria | Marcenaria sob medida em Itabirito/MG",
  descricao:
    "Marcenaria sob medida em Itabirito/MG: portas, marcos, janelas, alizares, escadas e corrimões em madeira maciça, com acompanhamento da obra e pós-venda.",
  url: "https://alfamarcenaria.com.br",
  instagram: "https://instagram.com/alfamarcenaria_ita",
  fundacao: "2024-08",
};

function absoluta(caminhoOuUrl) {
  return /^https?:\/\//.test(caminhoOuUrl) ? caminhoOuUrl : siteConfig.url + caminhoOuUrl;
}

// `imagem` = caminho (/images/...) usado no compartilhamento (WhatsApp, Facebook, Google Discover);
// `tipo: "article"` + datas marcam posts do blog; `semIndexar` tira a pagina do Google.
function construirMetadata({
  titulo,
  descricao,
  caminho = "/",
  imagem,
  tipo = "website",
  publicadoEm,
  atualizadoEm,
  semIndexar = false,
}) {
  const url = siteConfig.url + caminho;
  const tituloFinal = titulo ? `${titulo} | ${siteConfig.nome}` : siteConfig.tituloPadrao;
  const descricaoFinal = descricao || siteConfig.descricao;
  const imagemFinal = absoluta(imagem || "/logo.png");
  return {
    title: tituloFinal,
    description: descricaoFinal,
    alternates: { canonical: url },
    ...(semIndexar ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: titulo || siteConfig.tituloPadrao,
      description: descricaoFinal,
      url,
      siteName: siteConfig.nome,
      images: [imagemFinal],
      locale: "pt_BR",
      type: tipo,
      ...(tipo === "article"
        ? {
            ...(publicadoEm ? { publishedTime: new Date(publicadoEm).toISOString() } : {}),
            ...(atualizadoEm ? { modifiedTime: new Date(atualizadoEm).toISOString() } : {}),
            authors: [siteConfig.nome],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: titulo || siteConfig.tituloPadrao,
      description: descricaoFinal,
      images: [imagemFinal],
    },
  };
}

module.exports = { siteConfig, construirMetadata, absoluta };
