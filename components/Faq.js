import JsonLd from "./JsonLd";
import { faq as faqSchema } from "../lib/schema";

// Perguntas e respostas SEMPRE visiveis no HTML (nada escondido em "acordeao"): e o formato que
// buscadores e IAs (AEO/GEO) extraem como resposta direta. Gera tambem o FAQPage (JSON-LD).
export default function Faq({ itens, titulo = "Perguntas frequentes", className = "" }) {
  if (!itens || itens.length === 0) return null;
  return (
    <section className={className} aria-labelledby="faq-titulo">
      <JsonLd dados={faqSchema(itens)} />
      <h2 id="faq-titulo" className="font-serif text-2xl font-bold mb-6 text-wood-900">{titulo}</h2>
      <div className="space-y-5">
        {itens.map((i) => (
          <div key={i.pergunta}>
            <h3 className="font-semibold text-wood-900">{i.pergunta}</h3>
            <p className="text-wood-700 mt-1">{i.resposta}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
