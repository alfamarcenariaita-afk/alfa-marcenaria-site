import { obterPagina } from "../../lib/content";
import { construirMetadata } from "../../lib/metadata";
import { linkWhatsapp } from "../../lib/whatsapp";
import LocalBusinessJsonLd from "../../components/LocalBusinessJsonLd";

export const metadata = construirMetadata({
  titulo: "Contato",
  descricao: "Fale com a Alfa Marcenaria por WhatsApp ou telefone. Atendimento em Itabirito/MG.",
  caminho: "/contato",
});

export default function ContatoPage() {
  const contato = obterPagina("contato");
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
          Falar no WhatsApp
        </a>
        <p className="text-sm text-wood-700/70 mt-4">
          Orçamento sem compromisso. Atendimento direto com quem faz a peça, do orçamento à entrega.
        </p>
      </section>
    </>
  );
}
