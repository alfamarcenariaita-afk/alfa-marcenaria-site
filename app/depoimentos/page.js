import { notFound } from "next/navigation";
import { obterPagina } from "../../lib/content";
import { construirMetadata } from "../../lib/metadata";
import { obterConfig } from "../../lib/config";
import { depoimentosAutorizados } from "../../lib/depoimentos";
import Breadcrumbs from "../../components/Breadcrumbs";
import Depoimentos from "../../components/Depoimentos";
import ConviteDepoimento from "../../components/ConviteDepoimento";

export const metadata = construirMetadata({
  titulo: "Clientes da Alfa Marcenaria: depoimentos e obras entregues",
  descricao:
    "Depoimentos e fotos de clientes que receberam portas, janelas, marcos e escadas sob medida da Alfa Marcenaria, em Itabirito/MG.",
  caminho: "/depoimentos",
});

export default function DepoimentosPage() {
  const itens = depoimentosAutorizados();
  // sem depoimento autorizado a pagina nao existe (nem no menu nem no sitemap)
  if (itens.length === 0) notFound();
  const config = obterConfig();
  const contato = obterPagina("contato");
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <Breadcrumbs itens={[{ nome: "Clientes", caminho: "/depoimentos" }]} />
      <h1 className="font-serif text-3xl font-bold mb-8 text-wood-900">{config.tituloDepoimentos}</h1>
      <Depoimentos itens={itens} titulo="Depoimentos" />
      <ConviteDepoimento whatsapp={contato.whatsapp} linkGoogle={config.linkAvaliacaoGoogle} className="mt-10" />
    </section>
  );
}
