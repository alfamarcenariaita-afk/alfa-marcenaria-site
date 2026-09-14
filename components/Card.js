export default function Card({ imagem, titulo, categoria, descricaoHtml }) {
  return (
    <div className="rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-sm">
      {imagem && <img src={imagem} alt={titulo} className="w-full h-48 object-cover" />}
      <div className="p-4">
        {categoria && (
          <span className="text-xs uppercase tracking-wide text-amber-700">{categoria}</span>
        )}
        <h3 className="text-lg font-semibold mt-1">{titulo}</h3>
        {descricaoHtml && (
          <div className="text-sm text-neutral-600 mt-2 prose prose-sm" dangerouslySetInnerHTML={{ __html: descricaoHtml }} />
        )}
      </div>
    </div>
  );
}
