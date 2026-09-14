import Link from "next/link";
import { obterColecao } from "../../lib/content";
import { construirMetadata } from "../../lib/metadata";

export const metadata = construirMetadata({
  titulo: "Blog",
  descricao: "Dicas e informações sobre marcenaria sob medida, madeira e acabamento — Alfa Marcenaria.",
  caminho: "/blog",
});

export default function BlogPage() {
  const posts = obterColecao("blog");
  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-neutral-200 pb-6">
            <Link href={`/blog/${post.slug}`} className="text-xl font-semibold hover:text-amber-700">
              {post.titulo}
            </Link>
            <p className="text-sm text-neutral-500 mt-1">
              {new Date(post.data).toLocaleDateString("pt-BR")}
            </p>
            <p className="text-neutral-700 mt-2">{post.resumo}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
