import Link from "next/link";
import { notFound } from "next/navigation";
import { obterColecao, obterItemColecao, obterPagina } from "../../../lib/content";
import { construirMetadata, siteConfig } from "../../../lib/metadata";
import { linkWhatsapp } from "../../../lib/whatsapp";
import { resumir, extrairFaq, postRelacionado } from "../../../lib/seo";
import { servico as servicoSchema } from "../../../lib/schema";
import { depoimentosAutorizados } from "../../../lib/depoimentos";
import { obterConfig } from "../../../lib/config";
import JsonLd from "../../../components/JsonLd";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Faq from "../../../components/Faq";
import Card from "../../../components/Card";
import Depoimentos from "../../../components/Depoimentos";

// "Peça Personalizada sob medida" soaria redundante: o nome ja diz que e sob medida
function tituloDoServico(nome) {
  return /personalizada/i.test(nome) ? `${nome} em madeira em Itabirito/MG` : `${nome} sob medida em Itabirito/MG`;
}

export function generateStaticParams() {
  return obterColecao("servicos").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = obterItemColecao("servicos", slug);
  if (!s) return construirMetadata({ titulo: "Serviço não encontrado", semIndexar: true });
  return construirMetadata({
    titulo: tituloDoServico(s.nome),
    descricao: resumir(s.corpoHtml, 155),
    caminho: `/servicos/${slug}`,
    imagem: s.imagem,
  });
}

export default async function ServicoPage({ params }) {
  const { slug } = await params;
  const s = obterItemColecao("servicos", slug);
  if (!s) notFound();

  const contato = obterPagina("contato");
  const config = obterConfig();
  const url = `${siteConfig.url}/servicos/${slug}`;
  const post = postRelacionado(slug);
  const faq = post ? extrairFaq(post.corpoHtml) : [];
  const depoimentos = depoimentosAutorizados(slug);
  const outros = obterColecao("servicos")
    .filter((o) => o.slug !== slug)
    .sort((a, b) => (b.categoria === s.categoria) - (a.categoria === s.categoria))
    .slice(0, 3);

  return (
    <>
      <JsonLd dados={servicoSchema(s, url, resumir(s.corpoHtml, 300))} />
      <article className="max-w-3xl mx-auto px-4 py-16">
        <Breadcrumbs itens={[{ nome: "Serviços", caminho: "/servicos" }, { nome: s.nome, caminho: `/servicos/${slug}` }]} />
        {s.categoria && (
          <span className="text-xs uppercase tracking-wide text-gold-700 font-medium">{s.categoria}</span>
        )}
        <h1 className="font-serif text-3xl font-bold mt-1 text-wood-900">{tituloDoServico(s.nome)}</h1>
        {s.imagem && (
          <img
            src={s.imagem}
            alt={`${s.nome} sob medida — Alfa Marcenaria, Itabirito/MG`}
            className="w-full max-h-[28rem] object-cover rounded-xl shadow-sm mt-6"
            width={768}
            height={448}
          />
        )}
        <div className="prose prose-neutral mt-6" dangerouslySetInnerHTML={{ __html: s.corpoHtml }} />
        <a
          href={linkWhatsapp(contato.whatsapp, `serviço: ${s.nome}`)}
          className="inline-block mt-6 bg-wood-900 text-white px-7 py-3 rounded-lg font-semibold hover:bg-wood-800 transition-colors"
        >
          {config.textoBotaoContato}
        </a>
        {post && (
          <p className="mt-6 text-wood-700">
            Quer entender melhor antes de pedir o orçamento?{" "}
            <Link href={`/blog/${post.slug}`} className="text-gold-700 font-semibold hover:underline">
              Leia: {post.titulo}
            </Link>
          </p>
        )}

        <Faq itens={faq} className="mt-12" />
        {depoimentos.length > 0 && <Depoimentos itens={depoimentos} className="mt-12" />}
      </article>

      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="font-serif text-2xl font-bold mb-6 text-wood-900">Outros serviços</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {outros.map((o) => (
            <Card
              key={o.slug}
              imagem={o.imagem}
              titulo={o.nome}
              categoria={o.categoria}
              href={`/servicos/${o.slug}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}
