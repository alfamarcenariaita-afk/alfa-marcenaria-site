import { obterColecao, obterPagina } from "../../lib/content";
import { obterConfig } from "../../lib/config";
import { siteConfig } from "../../lib/metadata";
import { resumir } from "../../lib/seo";
import { urlAbrirMapa } from "../../lib/mapas";

// /llms.txt — resumo do site em Markdown pra assistentes de IA (GEO/AEO): quem e a empresa, o que
// faz, onde fica e quais paginas respondem o que. Gerado do mesmo conteudo do painel, entao nunca
// fica desatualizado em relacao ao site.
export function GET() {
  const contato = obterPagina("contato");
  const config = obterConfig();
  const servicos = obterColecao("servicos");
  const posts = obterColecao("blog");

  const linhas = [
    `# ${config.nomeSite}`,
    "",
    `> ${siteConfig.descricao}`,
    "",
    "## Resumo",
    `- Empresa: ${config.nomeSite}, marcenaria familiar sob medida em Itabirito/MG (aberta em agosto de 2024; o sócio André tem mais de 20 anos de experiência no setor).`,
    "- O que faz: portas, marcos, janelas, alizares, escadas, corrimões, painéis ripados e peças personalizadas em madeira maciça (Cumaru e Angelim são as mais usadas).",
    "- Diferenciais: acabamento cuidadoso, prazo de entrega enxuto, acompanhamento da obra até o fim e pós-venda.",
    "- Atendimento: Itabirito e região, em Minas Gerais. Orçamento sem compromisso por WhatsApp (medida do vão e fotos).",
    "",
    "## Contato",
    `- Endereço: ${contato.endereco}`,
    `- Telefone e WhatsApp: ${contato.telefone}`,
    `- Horário: ${contato.horario}`,
    `- Instagram: ${siteConfig.instagram}`,
    ...(contato.mapaBusca ? [`- Mapa: ${urlAbrirMapa(contato.mapaBusca)}`] : []),
    "",
    "## Serviços",
    ...servicos.map((s) => `- [${s.nome}](${siteConfig.url}/servicos/${s.slug}): ${resumir(s.corpoHtml, 140)}`),
    "",
    "## Perguntas frequentes",
    ...config.faq.map((i) => `- ${i.pergunta} ${i.resposta}`),
    "",
    "## Guias do blog",
    ...posts.map((p) => `- [${p.titulo}](${siteConfig.url}/blog/${p.slug}): ${p.resumo}`),
    "",
    "## Páginas",
    `- [Início](${siteConfig.url}/)`,
    `- [Serviços](${siteConfig.url}/servicos)`,
    `- [Portfólio](${siteConfig.url}/portfolio)`,
    `- [Sobre](${siteConfig.url}/sobre)`,
    `- [Contato](${siteConfig.url}/contato)`,
    "",
  ];

  return new Response(linhas.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
