import Link from "next/link";
import { obterPagina, obterColecao } from "../lib/content";
import { construirMetadata } from "../lib/metadata";
import { linkWhatsapp } from "../lib/whatsapp";
import LocalBusinessJsonLd from "../components/LocalBusinessJsonLd";
import Card from "../components/Card";
import InstagramFeed from "../components/InstagramFeed";

export const metadata = construirMetadata({
  descricao:
    "Marcenaria sob medida em Itabirito/MG: portas, marcos, alizares e corrimões em madeira de qualidade.",
  caminho: "/",
});

const SELOS = [
  { titulo: "20+ anos de experiência", texto: "know-how do sócio André no setor de marcenaria" },
  { titulo: "Acompanhamento até o fim", texto: "da medição à instalação, sem sumir no meio da obra" },
  { titulo: "Pós-venda incluso", texto: "suporte depois da entrega, não só até o pagamento" },
];

export default function HomePage() {
  const home = obterPagina("home");
  const contato = obterPagina("contato");
  const servicosDestaque = obterColecao("servicos").slice(0, 3);
  return (
    <>
      <LocalBusinessJsonLd contato={contato} />
      <section className="bg-white border-b border-wood-100">
        <div className="max-w-3xl mx-auto px-4 py-16 sm:py-20 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-wood-900 leading-tight">
            {home.titulo}
          </h1>
          <p className="text-xl text-wood-700 mt-4">{home.subtitulo}</p>
          <div
            className="mt-6 prose prose-neutral mx-auto"
            dangerouslySetInnerHTML={{ __html: home.corpoHtml }}
          />
          <a
            href={linkWhatsapp(home.whatsapp, "Home")}
            className="inline-block mt-8 bg-wood-900 text-white px-7 py-3 rounded-lg font-semibold hover:bg-wood-800 transition-colors"
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
          <h2 className="font-serif text-2xl font-bold mb-8 text-center text-wood-900">Nossos serviços</h2>
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
            <Link href="/servicos" className="text-gold-700 font-semibold hover:underline">
              Ver todos os serviços →
            </Link>
          </div>
        </section>
      )}

      <InstagramFeed />
    </>
  );
}
