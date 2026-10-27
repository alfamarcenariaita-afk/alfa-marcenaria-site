import Link from "next/link";
import { obterPagina } from "../lib/content";
import { obterConfig } from "../lib/config";
import MapaAlfa from "./MapaAlfa";
import { linksNav } from "../lib/nav";
import { depoimentosAutorizados } from "../lib/depoimentos";

export default function Footer() {
  const contato = obterPagina("contato");
  const links = linksNav(depoimentosAutorizados().length > 0);
  const { nomeSite, logo } = obterConfig();
  const ano = new Date().getFullYear();
  return (
    <footer className="bg-wood-900 text-wood-100 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-10 text-sm grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <p className="font-serif font-semibold text-white text-base">{nomeSite}</p>
          <p className="mt-2 text-wood-200">{contato.endereco}</p>
          <p className="text-wood-200">{contato.telefone}</p>
          {contato.instagram && (
            <p className="mt-2">
              Instagram:{" "}
              <a
                href={`https://instagram.com/${contato.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-500 hover:underline"
              >
                {contato.instagram}
              </a>
            </p>
          )}
        </div>
        <nav aria-label="Navegação do rodapé" className="flex flex-col gap-2">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-wood-200 hover:text-gold-500 hover:underline transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        <MapaAlfa busca={contato.mapaBusca} logo={logo} nome={nomeSite} className="h-48 sm:h-full sm:min-h-[12rem]" />
      </div>
      <div className="border-t border-wood-800">
        <p className="max-w-5xl mx-auto px-4 py-4 text-xs text-wood-200 text-center">
          © {ano} {nomeSite}
        </p>
      </div>
    </footer>
  );
}
