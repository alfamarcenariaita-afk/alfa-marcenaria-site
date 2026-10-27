import Link from "next/link";
import { obterPagina } from "../lib/content";
import { obterConfig } from "../lib/config";
import { urlAbrirMapa } from "../lib/mapas";

const LINKS = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/servicos", label: "Serviços" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export default function Footer() {
  const contato = obterPagina("contato");
  const { nomeSite } = obterConfig();
  const ano = new Date().getFullYear();
  return (
    <footer className="bg-wood-900 text-wood-100 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-10 text-sm grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <p className="font-serif font-semibold text-white text-base">{nomeSite}</p>
          <p className="mt-2 text-wood-200">{contato.endereco}</p>
          {contato.mapaBusca && (
            <p>
              <a
                href={urlAbrirMapa(contato.mapaBusca)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-500 hover:underline"
              >
                Ver no Google Maps
              </a>
            </p>
          )}
          <p className="text-wood-200">{contato.telefone}</p>
        </div>
        <nav aria-label="Navegação do rodapé" className="flex flex-col gap-2">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-wood-200 hover:text-gold-500 hover:underline transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="sm:text-right">
          {contato.instagram && (
            <p>
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
          <p className="mt-2 text-wood-200">© {ano} {nomeSite}</p>
        </div>
      </div>
    </footer>
  );
}
