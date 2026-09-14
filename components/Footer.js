import { obterPagina } from "../lib/content";

export default function Footer() {
  const contato = obterPagina("contato");
  const ano = new Date().getFullYear();
  return (
    <footer className="border-t border-neutral-200 bg-white mt-16">
      <div className="max-w-5xl mx-auto px-4 py-8 text-sm text-neutral-600 flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <p className="font-semibold text-neutral-800">Alfa Marcenaria</p>
          <p>{contato.endereco}</p>
          <p>{contato.telefone}</p>
        </div>
        <div className="sm:text-right">
          {contato.instagram && <p>Instagram: {contato.instagram}</p>}
          <p className="mt-2">© {ano} Alfa Marcenaria</p>
        </div>
      </div>
    </footer>
  );
}
