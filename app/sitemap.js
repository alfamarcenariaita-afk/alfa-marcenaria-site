import { obterColecao } from "../lib/content";
import { siteConfig } from "../lib/metadata";

export default function sitemap() {
  const paginasFixas = ["", "/sobre", "/servicos", "/portfolio", "/blog", "/contato"].map((caminho) => ({
    url: siteConfig.url + caminho,
    lastModified: new Date(),
  }));
  const posts = obterColecao("blog").map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.data ? new Date(post.data) : new Date(),
  }));
  return [...paginasFixas, ...posts];
}
