import { siteConfig } from "../lib/metadata";

export default function ArticleJsonLd({ post, url }) {
  const dados = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.titulo,
    datePublished: post.data,
    ...(post.imagemCapa ? { image: [siteConfig.url + post.imagemCapa] } : {}),
    author: { "@type": "Organization", name: siteConfig.nome },
    mainEntityOfPage: url,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }} />;
}
