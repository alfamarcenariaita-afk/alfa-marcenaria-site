// Renderiza um bloco JSON-LD (schema.org). Ignora dado vazio (ex.: FAQ sem itens).
// "<" escapado pra um texto com "</script>" nao fechar a tag antes da hora.
export default function JsonLd({ dados }) {
  if (!dados) return null;
  const json = JSON.stringify(dados).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
