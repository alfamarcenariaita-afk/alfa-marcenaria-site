import { obterPagina } from "../../lib/content";
import { construirMetadata, siteConfig } from "../../lib/metadata";
import { paginaSobre } from "../../lib/schema";
import JsonLd from "../../components/JsonLd";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata = construirMetadata({
  titulo: "Sobre a Alfa Marcenaria: marcenaria familiar em Itabirito/MG",
  descricao:
    "Conheça a história da Alfa Marcenaria, em Itabirito/MG: mais de 20 anos de experiência do sócio André, acabamento cuidadoso, prazo enxuto e pós-venda.",
  caminho: "/sobre",
  imagem: "/images/uploads/equipe-alfa-marcenaria.jpg",
});

export default function SobrePage() {
  const sobre = obterPagina("sobre");
  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <Breadcrumbs itens={[{ nome: "Sobre", caminho: "/sobre" }]} />
      <JsonLd dados={paginaSobre(`${siteConfig.url}/sobre`)} />
      <h1 className="font-serif text-3xl font-bold mb-6 text-wood-900">{sobre.titulo}</h1>
      {sobre.imagem && (
        <img
          src={sobre.imagem}
          alt="Equipe da Alfa Marcenaria, marcenaria sob medida em Itabirito/MG"
          width={640}
          height={480}
          className="w-full max-w-md aspect-[4/3] object-cover mx-auto rounded-xl shadow-sm mb-8"
        />
      )}
      <div className="prose prose-neutral" dangerouslySetInnerHTML={{ __html: sobre.corpoHtml }} />
    </section>
  );
}
