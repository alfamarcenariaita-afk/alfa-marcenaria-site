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
    <header className="border-b border-neutral-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Alfa Marcenaria" className="h-10 w-auto" />
          <span className="font-semibold text-lg">Alfa Marcenaria</span>
        </Link>
        <nav className="hidden sm:flex gap-5 text-sm">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-neutral-700 hover:text-amber-700">
              {l.label}
            </Link>
          ))}
        </nav>
        <details className="sm:hidden relative">
          <summary className="list-none cursor-pointer px-3 py-2 border border-neutral-300 rounded-md text-sm font-medium text-neutral-700">
            Menu
          </summary>
          <nav className="absolute right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-md shadow-lg flex flex-col text-sm z-10">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-neutral-700 hover:text-amber-700 px-4 py-3 border-b border-neutral-100 last:border-b-0"
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
