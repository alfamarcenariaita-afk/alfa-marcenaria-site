import { obterPagina } from "../../lib/content";
import { construirMetadata } from "../../lib/metadata";
import { linkWhatsapp } from "../../lib/whatsapp";
import JsonLd from "../../components/JsonLd";
import Breadcrumbs from "../../components/Breadcrumbs";
import ConviteDepoimento from "../../components/ConviteDepoimento";
import { obterConfig } from "../../lib/config";
import { siteConfig } from "../../lib/metadata";
import { paginaDeContato } from "../../lib/schema";
import MapaAlfa from "../../components/MapaAlfa";

export const metadata = construirMetadata({
  titulo: "Contato e orçamento de marcenaria em Itabirito/MG",
  descricao:
    "Peça seu orçamento de marcenaria sob medida por WhatsApp ou telefone. Alfa Marcenaria: Rua Joaquim Augusto França, 358, São José, Itabirito/MG. Segunda a sexta, 8h às 18h.",
  caminho: "/contato",
});

export default function ContatoPage() {
  const contato = obterPagina("contato");
  const config = obterConfig();
  return (
    <>
      <JsonLd dados={paginaDeContato(`${siteConfig.url}/contato`)} />
      <section className="max-w-3xl mx-auto px-4 py-16">
        <Breadcrumbs itens={[{ nome: "Contato", caminho: "/contato" }]} />
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
            <MapaAlfa busca={contato.mapaBusca} logo={config.logo} nome={config.nomeSite} className="h-80" />
          </div>
        )}

        <ConviteDepoimento whatsapp={contato.whatsapp} linkGoogle={config.linkAvaliacaoGoogle} className="mt-12" />
      </section>
    </>
  );
}
