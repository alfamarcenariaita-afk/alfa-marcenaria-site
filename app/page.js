import Link from "next/link";
import { obterPagina, obterColecao } from "../lib/content";
import { construirMetadata } from "../lib/metadata";
import { linkWhatsapp } from "../lib/whatsapp";
import Card from "../components/Card";
import InstagramFeed from "../components/InstagramFeed";
import Faq from "../components/Faq";
import Depoimentos from "../components/Depoimentos";
import ConviteDepoimento from "../components/ConviteDepoimento";
import { obterConfig } from "../lib/config";
import { paraRgb } from "../lib/tema";
import { depoimentosAutorizados } from "../lib/depoimentos";

// Titulo e descricao da Home editaveis no painel (Configuracoes > SEO); vazio = padrao do site.
export function generateMetadata() {
  const config = obterConfig();
  const base = construirMetadata({
    descricao: config.seoDescricaoHome || undefined,
    caminho: "/",
    imagem: config.bannerImagem,
  });
  if (!config.seoTituloHome) return base;
  return {
    ...base,
    title: config.seoTituloHome,
    openGraph: { ...base.openGraph, title: config.seoTituloHome },
    twitter: { ...base.twitter, title: config.seoTituloHome },
  };
}

export default function HomePage() {
  const config = obterConfig();
  const depoimentos = depoimentosAutorizados().slice(0, 4);
  const SELOS = config.selos;
  const [r, g, b] = paraRgb(config.corEscura, "#251A11");
  const home = obterPagina("home");
  const servicosDestaque = obterColecao("servicos").slice(0, 3);
  return (
    <>
      <section
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url(${config.bannerImagem})` }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `rgb(${r} ${g} ${b} / ${config.bannerEscurecer / 100})` }}
        />
        <div className="relative max-w-3xl mx-auto px-4 py-24 sm:py-32 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">
            {home.titulo}
          </h1>
          <p className="text-xl text-gold-500 mt-4">{home.subtitulo}</p>
          <div
            className="mt-6 prose prose-invert mx-auto"
            dangerouslySetInnerHTML={{ __html: home.corpoHtml }}
          />
          <a
            href={linkWhatsapp(home.whatsapp, "Home")}
            className="inline-block mt-8 bg-white text-wood-900 px-7 py-3 rounded-lg font-semibold hover:bg-wood-900 hover:text-white transition-colors"
          >
            {home.chamada}
          </a>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {SELOS.map((s) => (
            <div key={s.titulo} className="px-4">
              <p className="font-serif text-lg font-semibold text-wood-900">{s.titulo}</p>
              <p className="text-sm text-wood-700 mt-1">{s.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {servicosDestaque.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <h2 className="font-serif text-2xl font-bold mb-8 text-center text-wood-900">{config.tituloServicosHome}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {servicosDestaque.map((s) => (
              <Card
                key={s.slug}
                imagem={s.imagem}
                titulo={s.nome}
                categoria={s.categoria}
                descricaoHtml={s.corpoHtml}
                href={`/servicos/${s.slug}`}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/servicos" className="text-gold-700 font-semibold hover:underline">
              {config.textoLinkServicos}
            </Link>
          </div>
        </section>
      )}

      {depoimentos.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 pb-12">
          <Depoimentos itens={depoimentos} titulo={config.tituloDepoimentos} />
          <ConviteDepoimento whatsapp={home.whatsapp} linkGoogle={config.linkAvaliacaoGoogle} className="mt-8" />
        </div>
      )}

      <Faq itens={config.faq} titulo={config.tituloFaq} className="max-w-3xl mx-auto px-4 pb-16" />

      <InstagramFeed />
    </>
  );
}
