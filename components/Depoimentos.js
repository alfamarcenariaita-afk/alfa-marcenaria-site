import { dataBR } from "../lib/seo";

// Depoimentos de clientes (UGC). Recebe so itens ja filtrados por `depoimentosAutorizados()`.
// Sem schema Review/aggregateRating de proposito (ver lib/schema.js).
export default function Depoimentos({ itens, titulo = "O que dizem nossos clientes", className = "" }) {
  if (!itens || itens.length === 0) return null;
  return (
    <section className={className} aria-labelledby="depoimentos-titulo">
      <h2 id="depoimentos-titulo" className="font-serif text-2xl font-bold mb-6 text-center text-wood-900">
        {titulo}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {itens.map((d) => (
          <figure key={d.slug} className="rounded-xl border border-wood-100 bg-white p-5 shadow-sm">
            {d.foto && (
              <img
                src={d.foto}
                alt={`Peça instalada na obra de ${d.nome}${d.local ? `, ${d.local}` : ""}`}
                className="w-full h-52 object-cover rounded-lg mb-4"
                width={480}
                height={208}
                loading="lazy"
              />
            )}
            {d.nota && (
              <p className="text-gold-600 text-lg" role="img" aria-label={`Nota ${d.nota} de 5`}>
                {"★".repeat(d.nota)}
                <span className="text-wood-200">{"★".repeat(5 - d.nota)}</span>
              </p>
            )}
            <blockquote
              className="prose prose-neutral mt-2"
              dangerouslySetInnerHTML={{ __html: d.corpoHtml }}
            />
            <figcaption className="mt-3 text-sm text-wood-700">
              <span className="font-semibold text-wood-900">{d.nome}</span>
              {d.local ? ` · ${d.local}` : ""}
              {d.data ? ` · ${dataBR(d.data)}` : ""}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
