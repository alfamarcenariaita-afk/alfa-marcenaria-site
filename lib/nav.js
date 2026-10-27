// lib/nav.js — links do menu (cabecalho e rodape). "Clientes" so aparece quando ha depoimento
// autorizado publicado (pagina vazia no menu seria conteudo fraco e link morto).
export function linksNav(temDepoimentos) {
  return [
    { href: "/", label: "Início" },
    { href: "/sobre", label: "Sobre" },
    { href: "/servicos", label: "Serviços" },
    { href: "/portfolio", label: "Portfólio" },
    ...(temDepoimentos ? [{ href: "/depoimentos", label: "Clientes" }] : []),
    { href: "/blog", label: "Blog" },
    { href: "/contato", label: "Contato" },
  ];
}
