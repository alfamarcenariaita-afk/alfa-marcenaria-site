// lib/whatsapp.js — monta o link do WhatsApp com uma mensagem pronta que já diz de onde
// o visitante veio (Home, Contato, um post do blog etc.), pra Lucilene saber a origem do
// contato sem precisar perguntar.
function linkWhatsapp(numero, origem) {
  var texto = "Olá! Vim pelo site da Alfa Marcenaria (" + origem + ") e quero um orçamento.";
  return "https://wa.me/" + numero + "?text=" + encodeURIComponent(texto);
}

module.exports = { linkWhatsapp };
