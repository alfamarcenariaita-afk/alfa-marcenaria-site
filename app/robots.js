import { siteConfig } from "../lib/metadata";

// Robos de IA liberados DE PROPOSITO (GEO): e por eles que ChatGPT, Claude, Perplexity, Gemini e
// Apple Intelligence descobrem e citam a Alfa em respostas ("marcenaria em Itabirito"). Bloquear
// qualquer um destes tira o site das respostas daquele assistente. Painel e API ficam fora.
const ROBOS_DE_IA = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
];

const BLOQUEADO = ["/admin", "/api/"];

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: BLOQUEADO },
      ...ROBOS_DE_IA.map((userAgent) => ({ userAgent, allow: "/", disallow: BLOQUEADO })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
