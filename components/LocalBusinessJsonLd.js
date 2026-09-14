import { siteConfig } from "../lib/metadata";

// Dados estruturados (schema.org) pras paginas institucionais (Home, Contato).
// Usa o subtipo HomeAndConstructionBusiness (mais especifico que LocalBusiness generico).
export default function LocalBusinessJsonLd({ contato }) {
  const dados = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: siteConfig.nome,
    url: siteConfig.url,
    image: siteConfig.url + "/logo.png",
    telephone: contato.telefone,
    address: {
      "@type": "PostalAddress",
      // addressLocality/addressRegion fixos por enquanto (contato.endereco no CMS ainda e uma
      // string livre, ex. "Itabirito, MG", nao endereco estruturado). Se a Alfa passar a operar
      // de outra cidade, isso precisa virar campo proprio no config.yml.
      addressLocality: "Itabirito",
      addressRegion: "MG",
      addressCountry: "BR",
      streetAddress: contato.endereco,
    },
    areaServed: "Itabirito e região, MG",
    // Valor fixo em formato schema.org (Mo-Fr 08:00-18:00), pois contato.horario e texto livre
    // em PT-BR ("Segunda a sexta, 8h as 18h") usado na pagina /contato e no rodape — nao e
    // formato valido pra openingHours. Manter sincronizado manualmente com contato.horario ate
    // virar campo estruturado proprio no CMS.
    openingHours: "Mo-Fr 08:00-18:00",
    ...(contato.instagram
      ? { sameAs: [`https://instagram.com/${contato.instagram.replace("@", "")}`] }
      : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }} />;
}
