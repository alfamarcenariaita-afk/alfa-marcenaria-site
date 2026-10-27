import { obterColecao } from "../../lib/content";
import { construirMetadata, siteConfig } from "../../lib/metadata";
import { obterConfig } from "../../lib/config";
import { listaItens } from "../../lib/schema";
import Card from "../../components/Card";
import JsonLd from "../../components/JsonLd";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata = construirMetadata({
  titulo: "Serviços de marcenaria sob medida em Itabirito/MG",
  descricao:
    "Portas, marcos, janelas, alizares, escadas, corrimões e peças sob medida em madeira maciça, feitos pela Alfa Marcenaria em Itabirito/MG.",
  caminho: "/servicos",
});

export default function ServicosPage() {
  const servicos = obterColecao("servicos");
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <Breadcrumbs itens={[{ nome: "Serviços", caminho: "/servicos" }]} />
      <JsonLd
        dados={listaItens(
          "Serviços da Alfa Marcenaria",
          servicos.map((s) => ({ nome: s.nome, url: `${siteConfig.url}/servicos/${s.slug}` }))
        )}
      />
      <h1 className="font-serif text-3xl font-bold mb-8 text-wood-900">{obterConfig().tituloServicos}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {servicos.map((s) => (
          <Card
            key={s.slug}
            imagem={s.imagem}
            titulo={s.nome}
            categoria={s.categoria}
            descricaoHtml={s.corpoHtml}
            href={`/servicos/${s.slug}`}
          />
        ))}
      </div>
    </section>
  );
}
