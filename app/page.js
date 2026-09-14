import { obterPagina } from "../lib/content";
import { construirMetadata } from "../lib/metadata";
import LocalBusinessJsonLd from "../components/LocalBusinessJsonLd";

export const metadata = construirMetadata({
  descricao:
    "Marcenaria sob medida em Itabirito/MG: portas, marcos, alizares e corrimões em madeira de qualidade.",
  caminho: "/",
});

export default function HomePage() {
  const home = obterPagina("home");
  const contato = obterPagina("contato");
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
          href={`https://wa.me/${home.whatsapp}`}
          className="inline-block mt-8 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
        >
          {home.chamada}
        </a>
      </section>
    </>
  );
}
