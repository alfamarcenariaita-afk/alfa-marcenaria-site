// lib/tema.js — transforma as 3 cores escolhidas no painel (escura, destaque, fundo) na paleta
// completa usada pelo Tailwind (wood-50..900, gold-500..700) como variaveis CSS no formato
// "R G B" (permite modificadores de opacidade, ex.: bg-wood-900/70).
const HEX = /^#?([0-9a-f]{6})$/i;

function paraRgb(hex, fallback) {
  const m = HEX.exec(String(hex || "").trim()) || HEX.exec(fallback);
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

// mistura `a` com `b`; t=0 devolve a, t=1 devolve b
function misturar(a, b, t) {
  return a.map((v, i) => Math.round(v + (b[i] - v) * t));
}

const canal = (rgb) => rgb.join(" ");

function variaveisDoTema(cfg) {
  const escura = paraRgb(cfg.corEscura, "#251A11");
  const destaque = paraRgb(cfg.corDestaque, "#B0824A");
  const fundo = paraRgb(cfg.corFundo, "#F8F3EC");
  const branco = [255, 255, 255];
  const preto = [0, 0, 0];
  return {
    "--wood-50": canal(fundo),
    // tons claros puxam pro destaque (mantem o tom quente da madeira no padrao)
    "--wood-100": canal(misturar(fundo, destaque, 0.15)),
    "--wood-200": canal(misturar(fundo, destaque, 0.4)),
    "--wood-700": canal(misturar(escura, branco, 0.2)),
    "--wood-800": canal(misturar(escura, branco, 0.08)),
    "--wood-900": canal(escura),
    "--gold-500": canal(misturar(destaque, branco, 0.2)),
    "--gold-600": canal(destaque),
    "--gold-700": canal(misturar(destaque, preto, 0.22)),
  };
}

function cssDoTema(cfg) {
  const v = variaveisDoTema(cfg);
  return `:root{${Object.entries(v).map(([k, val]) => `${k}:${val}`).join(";")}}`;
}

module.exports = { variaveisDoTema, cssDoTema, paraRgb };
