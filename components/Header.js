import Link from "next/link";

const LINKS = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/servicos", label: "Serviços" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  return (
    <header className="bg-white border-b-2 border-gold-500/60">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Alfa Marcenaria" className="h-10 w-auto" width={40} height={40} />
          <span className="font-serif font-semibold text-lg text-wood-900 tracking-wide">
            Alfa Marcenaria
          </span>
        </Link>
        <nav className="hidden sm:flex gap-6 text-sm font-medium">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-wood-800 hover:text-gold-700 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        <details className="sm:hidden relative">
          <summary className="list-none cursor-pointer px-3 py-2 border border-wood-200 rounded-md text-sm font-medium text-wood-800">
            Menu
          </summary>
          <nav className="absolute right-0 mt-2 w-48 bg-white border border-wood-100 rounded-md shadow-lg flex flex-col text-sm z-10">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-wood-800 hover:text-gold-700 px-4 py-3 border-b border-wood-50 last:border-b-0"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
