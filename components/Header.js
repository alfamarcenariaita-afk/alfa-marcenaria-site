"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { linksNav } from "../lib/nav";

export default function Header({ nome = "Alfa Marcenaria", logo = "/logo.png", links = linksNav(false) }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b-2 border-gold-500/60">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <img src={logo} alt={nome} className="h-10 w-auto" width={40} height={40} />
          <span className="font-serif font-semibold text-lg text-wood-900 tracking-wide">
            {nome}
          </span>
        </Link>
        <nav className="hidden sm:flex gap-6 text-sm font-medium">
          {links.map((l) => {
            const ativo = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={ativo ? "page" : undefined}
                className={
                  "py-2 border-b-2 transition-colors " +
                  (ativo
                    ? "text-gold-700 border-gold-600"
                    : "text-wood-800 border-transparent hover:text-gold-700")
                }
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <details className="sm:hidden relative">
          <summary className="list-none cursor-pointer min-h-[44px] flex items-center px-3 border border-wood-200 rounded-md text-sm font-medium text-wood-800">
            Menu
          </summary>
          <nav className="absolute right-0 mt-2 w-48 bg-white border border-wood-100 rounded-md shadow-lg flex flex-col text-sm z-10">
            {links.map((l) => {
              const ativo = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={ativo ? "page" : undefined}
                  className={
                    "min-h-[44px] flex items-center px-4 border-b border-wood-50 last:border-b-0 " +
                    (ativo ? "text-gold-700 font-semibold bg-wood-50" : "text-wood-800 hover:text-gold-700")
                  }
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </details>
      </div>
    </header>
  );
}
