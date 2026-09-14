import { obterColecao } from "../../lib/content";
import { construirMetadata } from "../../lib/metadata";
import Card from "../../components/Card";

export const metadata = construirMetadata({
  titulo: "Serviços",
  descricao:
    "Portas, marcos, alizares, corrimões e peças sob medida em madeira, feitos pela Alfa Marcenaria em Itabirito/MG.",
  caminho: "/servicos",
});

export default function ServicosPage() {
  const servicos = obterColecao("servicos");
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Nossos serviços</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {servicos.map((s) => (
          <Card key={s.slug} imagem={s.imagem} titulo={s.nome} categoria={s.categoria} descricaoHtml={s.corpoHtml} />
        ))}
      </div>
    </section>
  );
}
