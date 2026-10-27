import Link from "next/link";
import { obterColecao } from "../../lib/content";
import { construirMetadata, siteConfig } from "../../lib/metadata";
import { dataBR, dataISO } from "../../lib/seo";
import { listaItens } from "../../lib/schema";
import JsonLd from "../../components/JsonLd";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata = construirMetadata({
  titulo: "Blog de marcenaria: madeira, preços, prazos e acabamento",
  descricao: "Dicas e informações sobre marcenaria sob medida, madeira e acabamento, direto da Alfa Marcenaria.",
  caminho: "/blog",
});

export default function BlogPage() {
  const posts = obterColecao("blog");
  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <Breadcrumbs itens={[{ nome: "Blog", caminho: "/blog" }]} />
      <JsonLd
        dados={listaItens(
          "Blog da Alfa Marcenaria",
          posts.map((p) => ({ nome: p.titulo, url: `${siteConfig.url}/blog/${p.slug}` }))
        )}
      />
      <h1 className="font-serif text-3xl font-bold mb-8 text-wood-900">Blog</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-wood-100 pb-6">
            <Link href={`/blog/${post.slug}`} className="font-serif text-xl font-semibold text-wood-900 hover:text-gold-700 transition-colors">
              {post.titulo}
            </Link>
            <p className="text-sm text-wood-700/70 mt-1">
              <time dateTime={dataISO(post.data)}>{dataBR(post.data)}</time>
            </p>
            <p className="text-wood-700 mt-2">{post.resumo}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
