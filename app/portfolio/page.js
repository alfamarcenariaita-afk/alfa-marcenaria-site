import { obterColecao } from "../../lib/content";
import { construirMetadata } from "../../lib/metadata";
import Card from "../../components/Card";

export const metadata = construirMetadata({
  titulo: "Portfólio",
  descricao: "Trabalhos entregues pela Alfa Marcenaria em Itabirito/MG.",
  caminho: "/portfolio",
});

export default function PortfolioPage() {
  const trabalhos = obterColecao("portfolio");
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Portfólio</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {trabalhos.map((t) => (
          <Card key={t.slug} imagem={t.imagem} titulo={t.titulo} categoria={t.categoria} descricaoHtml={t.corpoHtml} />
        ))}
      </div>
    </section>
  );
}
