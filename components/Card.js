export default function Card({ imagem, titulo, categoria, descricaoHtml }) {
  return (
    <div className="rounded-xl overflow-hidden border border-wood-100 bg-white shadow-sm hover:shadow-md transition-shadow">
      {imagem && (
        <img
          src={imagem}
          alt={titulo}
          className="w-full h-48 object-cover"
          width={400}
          height={192}
        />
      )}
      <div className="p-4">
        {categoria && (
          <span className="text-xs uppercase tracking-wide text-gold-700 font-medium">{categoria}</span>
        )}
        <h3 className="font-serif text-lg font-semibold mt-1 text-wood-900">{titulo}</h3>
        {descricaoHtml && (
          <div className="text-sm text-wood-700 mt-2 prose prose-sm" dangerouslySetInnerHTML={{ __html: descricaoHtml }} />
        )}
      </div>
    </div>
  );
}
