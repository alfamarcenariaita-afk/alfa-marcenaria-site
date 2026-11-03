import { notFound } from "next/navigation";
import { obterPagina } from "../../lib/content";
import { construirMetadata } from "../../lib/metadata";
import { obterConfig } from "../../lib/config";
import { depoimentosAutorizados } from "../../lib/depoimentos";
import { buscarAvaliacoesGoogle } from "../../lib/avaliacoesGoogle";
import Breadcrumbs from "../../components/Breadcrumbs";
import Depoimentos from "../../components/Depoimentos";
import AvaliacoesGoogle from "../../components/AvaliacoesGoogle";
import ConviteDepoimento from "../../components/ConviteDepoimento";

export const metadata = construirMetadata({
  titulo: "Clientes da Alfa Marcenaria: avaliações e obras entregues",
  descricao:
    "Avaliações e depoimentos de clientes que receberam portas, janelas, marcos e escadas sob medida da Alfa Marcenaria, em Itabirito/MG.",
  caminho: "/depoimentos",
});

export default async function DepoimentosPage() {
  const itens = depoimentosAutorizados();
  const avaliacoes = await buscarAvaliacoesGoogle();
  // sem depoimento autorizado nem avaliacoes do Google a pagina nao existe (nem no menu nem no sitemap)
  if (itens.length === 0 && !avaliacoes) notFound();
  const config = obterConfig();
  const contato = obterPagina("contato");
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <Breadcrumbs itens={[{ nome: "Clientes", caminho: "/depoimentos" }]} />
      <h1 className="font-serif text-3xl font-bold mb-8 text-wood-900">{config.tituloDepoimentos}</h1>
      <AvaliacoesGoogle dados={avaliacoes} linkAvaliar={config.linkAvaliacaoGoogle} />
      {itens.length > 0 && <Depoimentos itens={itens} titulo="Depoimentos" className="mt-12" />}
      <ConviteDepoimento whatsapp={contato.whatsapp} linkGoogle={config.linkAvaliacaoGoogle} className="mt-10" />
    </section>
  );
}
