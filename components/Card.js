import Link from "next/link";

// `href` (opcional): quando existe, o titulo vira link pra pagina propria do item (links internos
// ajudam o Google a descobrir e entender as paginas de servico).
export default function Card({ imagem, titulo, categoria, descricaoHtml, href }) {
  return (
    <div className="rounded-xl overflow-hidden border border-wood-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-[box-shadow,transform] duration-200">
      {imagem && (
        <img
          src={imagem}
          alt={`${titulo} — Alfa Marcenaria, marcenaria sob medida em Itabirito/MG`}
          className="w-full h-48 object-cover"
          width={400}
          height={192}
          loading="lazy"
        />
      )}
      <div className="p-4">
        {categoria && (
          <span className="text-xs uppercase tracking-wide text-gold-700 font-medium">{categoria}</span>
        )}
        <h3 className="font-serif text-lg font-semibold mt-1 text-wood-900">
          {href ? (
            <Link href={href} className="hover:text-gold-700 transition-colors">{titulo}</Link>
          ) : (
            titulo
          )}
        </h3>
        {descricaoHtml && (
          <div className="text-sm text-wood-700 mt-2 prose prose-sm" dangerouslySetInnerHTML={{ __html: descricaoHtml }} />
        )}
        {href && (
          <Link href={href} className="inline-block mt-3 text-sm font-semibold text-gold-700 hover:underline">
            Ver detalhes →
          </Link>
        )}
      </div>
    </div>
  );
}
