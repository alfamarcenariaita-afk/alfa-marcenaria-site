import { obterColecao } from "../lib/content";
import { siteConfig } from "../lib/metadata";
import { depoimentosAutorizados } from "../lib/depoimentos";

// lastModified so onde ha data real (posts). Paginas sem data ficam sem o campo: data inventada
// (ex.: "agora" a cada build) faz o Google desconfiar e ignorar o lastmod do site todo.
export default function sitemap() {
  const fixas = [
    { caminho: "", prioridade: 1 },
    { caminho: "/servicos", prioridade: 0.9 },
    { caminho: "/portfolio", prioridade: 0.7 },
    { caminho: "/sobre", prioridade: 0.6 },
    { caminho: "/blog", prioridade: 0.7 },
    { caminho: "/contato", prioridade: 0.8 },
    ...(depoimentosAutorizados().length > 0 ? [{ caminho: "/depoimentos", prioridade: 0.6 }] : []),
  ].map((p) => ({ url: siteConfig.url + p.caminho, priority: p.prioridade }));

  const servicos = obterColecao("servicos").map((s) => ({
    url: `${siteConfig.url}/servicos/${s.slug}`,
    priority: 0.8,
  }));

  const posts = obterColecao("blog").map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.atualizado || post.data),
    priority: 0.6,
  }));

  return [...fixas, ...servicos, ...posts];
}
