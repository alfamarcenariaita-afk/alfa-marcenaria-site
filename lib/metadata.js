// lib/metadata.js — configuracao central do site e helper de metadata pro Next.js.
// Trocar `url` aqui quando o dominio definitivo (Registro.br) for confirmado.
const siteConfig = {
  nome: "Alfa Marcenaria",
  descricao: "Marcenaria sob medida em Itabirito/MG: portas, marcos, alizares e corrimões em madeira.",
  url: "https://alfamarcenaria.com.br",
};

function construirMetadata({ titulo, descricao, caminho = "/" }) {
  const url = siteConfig.url + caminho;
  const tituloFinal = titulo ? `${titulo} | ${siteConfig.nome}` : siteConfig.nome;
  const descricaoFinal = descricao || siteConfig.descricao;
  return {
    title: tituloFinal,
    description: descricaoFinal,
    alternates: { canonical: url },
    openGraph: {
      title: titulo || siteConfig.nome,
      description: descricaoFinal,
      url,
      siteName: siteConfig.nome,
      images: [siteConfig.url + "/logo.png"],
      locale: "pt_BR",
      type: "website",
    },
  };
}

module.exports = { siteConfig, construirMetadata };
