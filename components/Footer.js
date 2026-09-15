import { obterPagina } from "../lib/content";

export default function Footer() {
  const contato = obterPagina("contato");
  const ano = new Date().getFullYear();
  return (
    <footer className="bg-wood-900 text-wood-100 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-10 text-sm flex flex-col sm:flex-row justify-between gap-6">
        <div>
          <p className="font-serif font-semibold text-white text-base">Alfa Marcenaria</p>
          <p className="mt-2 text-wood-200">{contato.endereco}</p>
          <p className="text-wood-200">{contato.telefone}</p>
        </div>
        <div className="sm:text-right">
          {contato.instagram && (
            <p className="text-gold-500">Instagram: {contato.instagram}</p>
          )}
          <p className="mt-2 text-wood-200">© {ano} Alfa Marcenaria</p>
        </div>
      </div>
    </footer>
  );
}
