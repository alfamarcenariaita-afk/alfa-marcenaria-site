// Convite pra o cliente mandar depoimento e foto da obra instalada (origem do UGC). O pedido
// chega pelo WhatsApp com mensagem pronta; a Lucilene cadastra no painel /admin (Depoimentos) e
// so publica depois do OK do cliente (LGPD). Se `linkGoogle` existir, convida pra avaliar no Google.
export default function ConviteDepoimento({ whatsapp, linkGoogle, className = "" }) {
  const texto =
    "Olá! Sou cliente da Alfa Marcenaria e quero enviar um depoimento e fotos da minha obra. Autorizo a publicação no site.";
  const linkZap = `https://wa.me/${whatsapp}?text=${encodeURIComponent(texto)}`;
  return (
    <div className={`rounded-xl border border-wood-200 bg-white p-6 text-center ${className}`}>
      <h2 className="font-serif text-xl font-bold text-wood-900">Já é cliente da Alfa?</h2>
      <p className="text-wood-700 mt-2">
        Conte como ficou a sua obra e mande uma foto da peça instalada. Sua opinião ajuda outras famílias a escolherem.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <a
          href={linkZap}
          className="inline-block bg-wood-900 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-wood-800 transition-colors"
        >
          Enviar depoimento pelo WhatsApp
        </a>
        {linkGoogle && (
          <a
            href={linkGoogle}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-wood-900 text-wood-900 px-5 py-2.5 rounded-lg font-semibold hover:bg-wood-50 transition-colors"
          >
            Avaliar no Google
          </a>
        )}
      </div>
    </div>
  );
}
