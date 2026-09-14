// Dados estruturados (schema.org) pras paginas institucionais (Home, Contato).
// Usa o subtipo HomeAndConstructionBusiness (mais especifico que LocalBusiness generico).
export default function LocalBusinessJsonLd({ contato }) {
  const dados = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Alfa Marcenaria",
    telephone: contato.telefone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Itabirito",
      addressRegion: "MG",
      addressCountry: "BR",
    },
    openingHours: contato.horario,
    ...(contato.instagram
      ? { sameAs: [`https://instagram.com/${contato.instagram.replace("@", "")}`] }
      : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }} />;
}
