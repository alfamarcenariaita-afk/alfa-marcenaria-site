import Link from "next/link";
import { obterPagina, obterColecao } from "../lib/content";
import { construirMetadata } from "../lib/metadata";
import { linkWhatsapp } from "../lib/whatsapp";
import LocalBusinessJsonLd from "../components/LocalBusinessJsonLd";
import Card from "../components/Card";

export const metadata = construirMetadata({
  descricao:
    "Marcenaria sob medida em Itabirito/MG: portas, marcos, alizares e corrimões em madeira de qualidade.",
  caminho: "/",
});

export default function HomePage() {
  const home = obterPagina("home");
  const contato = obterPagina("contato");
  const servicosDestaque = obterColecao("servicos").slice(0, 3);
  return (
    <>
      <LocalBusinessJsonLd contato={contato} />
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold">{home.titulo}</h1>
        <p className="text-xl text-neutral-600 mt-4">{home.subtitulo}</p>
        <div
          className="mt-6 prose prose-neutral mx-auto"
          dangerouslySetInnerHTML={{ __html: home.corpoHtml }}
        />
        <a
          href={linkWhatsapp(home.whatsapp, "Home")}
          className="inline-block mt-8 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
        >
          {home.chamada}
        </a>
      </section>
      {servicosDestaque.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Nossos serviços</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {servicosDestaque.map((s) => (
              <Card
                key={s.slug}
                imagem={s.imagem}
                titulo={s.nome}
                categoria={s.categoria}
                descricaoHtml={s.corpoHtml}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/servicos" className="text-amber-700 font-semibold hover:underline">
              Ver todos os serviços →
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
