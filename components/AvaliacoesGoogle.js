// Avaliacoes reais do Google (nota media, total e as avaliacoes mais relevantes), vindas de
// lib/avaliacoesGoogle.js. Sem schema Review/aggregateRating de proposito (ver lib/schema.js).
// Exigencias do Google: mostrar o autor com link, indicar a fonte e linkar pro perfil.
function Estrelas({ nota }) {
  const cheias = Math.max(0, Math.min(5, Math.round(nota)));
  return (
    <span role="img" aria-label={`Nota ${nota} de 5`} className="text-gold-600">
      {"★".repeat(cheias)}
      <span className="text-wood-200">{"★".repeat(5 - cheias)}</span>
    </span>
  );
}

export default function AvaliacoesGoogle({ dados, linkAvaliar, titulo = "Avaliações no Google", className = "" }) {
  if (!dados) return null;
  const notaTexto = Number(dados.nota).toFixed(1).replace(".", ",");
  return (
    <section className={className} aria-labelledby="avaliacoes-google-titulo">
      <h2 id="avaliacoes-google-titulo" className="font-serif text-2xl font-bold text-center text-wood-900">
        {titulo}
      </h2>
      <p className="text-center mt-2 text-wood-700">
        <span className="text-2xl font-bold text-wood-900">{notaTexto}</span>{" "}
        <Estrelas nota={dados.nota} />{" "}
        <span>
          · {dados.total} {dados.total === 1 ? "avaliação" : "avaliações"} no Google
        </span>
      </p>

      {dados.itens.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {dados.itens.map((r) => (
            <figure key={`${r.autor}-${r.quando}-${r.texto.slice(0, 12)}`} className="rounded-xl border border-wood-100 bg-white p-5 shadow-sm">
              <figcaption className="flex items-center gap-3">
                {r.foto && (
                  <img
                    src={r.foto}
                    alt=""
                    width={40}
                    height={40}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div className="text-sm">
                  {r.autorLink ? (
                    <a href={r.autorLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-wood-900 hover:underline">
                      {r.autor}
                    </a>
                  ) : (
                    <span className="font-semibold text-wood-900">{r.autor}</span>
                  )}
                  <p className="text-wood-700/70">{r.quando}</p>
                </div>
              </figcaption>
              <p className="mt-3 text-lg"><Estrelas nota={r.nota} /></p>
              <blockquote className="mt-1 text-wood-700 whitespace-pre-line">{r.texto}</blockquote>
            </figure>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
        {dados.link && (
          <a href={dados.link} target="_blank" rel="noopener noreferrer" className="text-gold-700 font-semibold hover:underline">
            Ver todas as avaliações no Google →
          </a>
        )}
        {linkAvaliar && (
          <a href={linkAvaliar} target="_blank" rel="noopener noreferrer" className="text-gold-700 font-semibold hover:underline">
            Avaliar no Google →
          </a>
        )}
        <span className="text-wood-700/70">Fonte: Google</span>
      </div>
    </section>
  );
}
