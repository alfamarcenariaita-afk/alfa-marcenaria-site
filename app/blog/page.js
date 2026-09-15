import Link from "next/link";
import { obterColecao } from "../../lib/content";
import { construirMetadata } from "../../lib/metadata";

export const metadata = construirMetadata({
  titulo: "Blog",
  descricao: "Dicas e informações sobre marcenaria sob medida, madeira e acabamento, direto da Alfa Marcenaria.",
  caminho: "/blog",
});

export default function BlogPage() {
  const posts = obterColecao("blog");
  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-serif text-3xl font-bold mb-8 text-wood-900">Blog</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-wood-100 pb-6">
            <Link href={`/blog/${post.slug}`} className="font-serif text-xl font-semibold text-wood-900 hover:text-gold-700 transition-colors">
              {post.titulo}
            </Link>
            <p className="text-sm text-wood-700/70 mt-1">
              {new Date(post.data).toLocaleDateString("pt-BR", { timeZone: "UTC" })}
            </p>
            <p className="text-wood-700 mt-2">{post.resumo}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
