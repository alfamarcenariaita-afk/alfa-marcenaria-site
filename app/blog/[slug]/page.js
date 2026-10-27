import Link from "next/link";
import { notFound } from "next/navigation";
import { obterColecao, obterItemColecao } from "../../../lib/content";
import { construirMetadata, siteConfig } from "../../../lib/metadata";
import { extrairFaq, servicoDoPost, dataBR, dataISO } from "../../../lib/seo";
import { artigo, faq as faqSchema } from "../../../lib/schema";
import JsonLd from "../../../components/JsonLd";
import Breadcrumbs from "../../../components/Breadcrumbs";

export function generateStaticParams() {
  return obterColecao("blog").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = obterItemColecao("blog", slug);
  if (!post) return construirMetadata({ titulo: "Post não encontrado", semIndexar: true });
  return construirMetadata({
    titulo: post.titulo,
    descricao: post.resumo,
    caminho: `/blog/${slug}`,
    imagem: post.imagemCapa,
    tipo: "article",
    publicadoEm: post.data,
    atualizadoEm: post.atualizado || post.data,
  });
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = obterItemColecao("blog", slug);
  if (!post) notFound();
  const url = `${siteConfig.url}/blog/${slug}`;
  const servico = servicoDoPost(slug);
  const atualizado = post.atualizado && dataISO(post.atualizado) !== dataISO(post.data) ? post.atualizado : null;
  return (
    <>
      <JsonLd dados={artigo(post, url)} />
      <JsonLd dados={faqSchema(extrairFaq(post.corpoHtml))} />
      <article className="max-w-3xl mx-auto px-4 py-16">
        <Breadcrumbs itens={[{ nome: "Blog", caminho: "/blog" }, { nome: post.titulo, caminho: `/blog/${slug}` }]} />
        <h1 className="font-serif text-3xl font-bold text-wood-900">{post.titulo}</h1>
        <p className="text-sm text-wood-700/70 mt-2">
          Por {siteConfig.nome} · Publicado em <time dateTime={dataISO(post.data)}>{dataBR(post.data)}</time>
          {atualizado && (
            <>
              {" "}· Atualizado em <time dateTime={dataISO(atualizado)}>{dataBR(atualizado)}</time>
            </>
          )}
        </p>
        {post.imagemCapa && (
          <img
            src={post.imagemCapa}
            alt={post.titulo}
            className="w-full max-h-[26rem] object-cover rounded-xl shadow-sm mt-6"
            width={768}
            height={416}
          />
        )}
        <div className="prose prose-neutral mt-6" dangerouslySetInnerHTML={{ __html: post.corpoHtml }} />
        {servico && (
          <p className="mt-10 border-t border-wood-100 pt-6 text-wood-700">
            Serviço relacionado:{" "}
            <Link href={`/servicos/${servico.slug}`} className="text-gold-700 font-semibold hover:underline">
              {servico.nome}
            </Link>
          </p>
        )}
      </article>
    </>
  );
}
