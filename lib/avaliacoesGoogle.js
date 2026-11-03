// lib/avaliacoesGoogle.js — nota e avaliacoes REAIS do Perfil da Empresa no Google, via Places API
// (New). Mesmo padrao do feed do Instagram: sem banco, o fetch do Next cacheia por 6h, e se nao
// houver GOOGLE_PLACES_API_KEY ou a API falhar, devolve null e a secao simplesmente nao aparece.
// A API devolve as ~5 avaliacoes mais relevantes + nota media + total. Mostramos TODAS as que
// vierem, sem filtrar por nota nem editar o texto (regra do Google: nada de "so as boas").
const { obterConfig } = require("./config");

const BASE = process.env.PLACES_API_BASE || "https://places.googleapis.com";

async function buscarAvaliacoesGoogle() {
  const chave = process.env.GOOGLE_PLACES_API_KEY;
  if (!chave) return null;
  const { googlePlaceId } = obterConfig();
  try {
    const resposta = await fetch(`${BASE}/v1/places/${googlePlaceId}?languageCode=pt-BR`, {
      headers: {
        "X-Goog-Api-Key": chave,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
      },
      next: { revalidate: 21600 },
    });
    if (!resposta.ok) return null;
    const d = await resposta.json();
    if (!d.rating || !d.userRatingCount) return null;
    const itens = (d.reviews || [])
      .filter((r) => r.text && r.text.text)
      .map((r) => ({
        autor: (r.authorAttribution && r.authorAttribution.displayName) || "Cliente",
        autorLink: r.authorAttribution && r.authorAttribution.uri,
        foto: r.authorAttribution && r.authorAttribution.photoUri,
        nota: Math.round(Number(r.rating)) || 0,
        quando: r.relativePublishTimeDescription || "",
        texto: r.text.text,
      }));
    return { nota: d.rating, total: d.userRatingCount, link: d.googleMapsUri, itens };
  } catch (e) {
    return null;
  }
}

module.exports = { buscarAvaliacoesGoogle };
