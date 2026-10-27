import { obterPagina } from "../../lib/content";
import { construirMetadata } from "../../lib/metadata";
import { linkWhatsapp } from "../../lib/whatsapp";
import LocalBusinessJsonLd from "../../components/LocalBusinessJsonLd";
import { obterConfig } from "../../lib/config";
import { urlAbrirMapa, urlEmbedMapa } from "../../lib/mapas";

export const metadata = construirMetadata({
  titulo: "Contato",
  descricao: "Fale com a Alfa Marcenaria por WhatsApp ou telefone. Atendimento em Itabirito/MG.",
  caminho: "/contato",
});

export default function ContatoPage() {
  const contato = obterPagina("contato");
  const config = obterConfig();
  return (
    <>
      <LocalBusinessJsonLd contato={contato} />
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-serif text-3xl font-bold mb-6 text-wood-900">{contato.titulo}</h1>
        <dl className="space-y-2 text-wood-700">
          <div><dt className="font-semibold inline text-wood-900">Telefone: </dt><dd className="inline">{contato.telefone}</dd></div>
          <div><dt className="font-semibold inline text-wood-900">Endereço: </dt><dd className="inline">{contato.endereco}</dd></div>
          <div><dt className="font-semibold inline text-wood-900">Horário: </dt><dd className="inline">{contato.horario}</dd></div>
          {contato.instagram && (
            <div><dt className="font-semibold inline text-wood-900">Instagram: </dt><dd className="inline">{contato.instagram}</dd></div>
          )}
        </dl>
        <div className="prose prose-neutral mt-6" dangerouslySetInnerHTML={{ __html: contato.corpoHtml }} />
        <a
          href={linkWhatsapp(contato.whatsapp, "página de Contato")}
          className="inline-block mt-8 bg-wood-900 text-white px-7 py-3 rounded-lg font-semibold hover:bg-wood-800 transition-colors"
        >
          {config.textoBotaoContato}
        </a>
        <p className="text-sm text-wood-700/70 mt-4">{config.textoOrcamento}</p>

        {contato.mapaBusca && (
          <div className="mt-12">
            <h2 className="font-serif text-2xl font-bold mb-4 text-wood-900">Como chegar</h2>
            <iframe
              title={`Mapa: ${contato.endereco}`}
              src={urlEmbedMapa(contato.mapaBusca)}
              className="w-full h-80 rounded-xl border border-wood-200"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              href={urlAbrirMapa(contato.mapaBusca)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-gold-700 font-semibold hover:underline"
            >
              Abrir no Google Maps →
            </a>
          </div>
        )}
      </section>
    </>
  );
}
