import Link from "next/link";
import JsonLd from "./JsonLd";
import { breadcrumb } from "../lib/schema";

// Trilha de navegacao visivel + BreadcrumbList (JSON-LD). `itens` vai da Home ate a pagina atual;
// o ultimo item e a propria pagina (sem link).
export default function Breadcrumbs({ itens }) {
  const todos = [{ nome: "Início", caminho: "/" }, ...itens];
  return (
    <>
      <JsonLd dados={breadcrumb(todos)} />
      <nav aria-label="Trilha de navegação" className="text-sm text-wood-700 mb-6">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {todos.map((it, i) => {
            const ultimo = i === todos.length - 1;
            return (
              <li key={it.caminho} className="flex items-center gap-2">
                {ultimo ? (
                  <span aria-current="page" className="text-wood-900 font-medium">{it.nome}</span>
                ) : (
                  <Link href={it.caminho} className="hover:text-gold-700 hover:underline">{it.nome}</Link>
                )}
                {!ultimo && <span aria-hidden="true">›</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
