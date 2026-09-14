import { notFound } from "next/navigation";
import { obterColecao, obterItemColecao } from "../../../lib/content";
import { construirMetadata, siteConfig } from "../../../lib/metadata";
import ArticleJsonLd from "../../../components/ArticleJsonLd";

export function generateStaticParams() {
  return obterColecao("blog").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = obterItemColecao("blog", slug);
  if (!post) return construirMetadata({ titulo: "Post não encontrado" });
  return construirMetadata({ titulo: post.titulo, descricao: post.resumo, caminho: `/blog/${slug}` });
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = obterItemColecao("blog", slug);
  if (!post) notFound();
  const url = `${siteConfig.url}/blog/${slug}`;
  return (
    <>
      <ArticleJsonLd post={post} url={url} />
      <article className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold">{post.titulo}</h1>
        <p className="text-sm text-neutral-500 mt-2">
          {new Date(post.data).toLocaleDateString("pt-BR", { timeZone: "UTC" })}
        </p>
        <div className="prose prose-neutral mt-6" dangerouslySetInnerHTML={{ __html: post.corpoHtml }} />
      </article>
    </>
  );
}
