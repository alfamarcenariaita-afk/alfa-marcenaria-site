import { obterPagina } from "../../lib/content";
import { construirMetadata } from "../../lib/metadata";

export const metadata = construirMetadata({
  titulo: "Sobre",
  descricao: "Conheça a história da Alfa Marcenaria, em Itabirito/MG.",
  caminho: "/sobre",
});

export default function SobrePage() {
  const sobre = obterPagina("sobre");
  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">{sobre.titulo}</h1>
      <div className="prose prose-neutral" dangerouslySetInnerHTML={{ __html: sobre.corpoHtml }} />
    </section>
  );
}
