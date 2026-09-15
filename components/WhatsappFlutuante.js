import { obterPagina } from "../lib/content";
import { linkWhatsapp } from "../lib/whatsapp";

// Botao fixo no canto da tela, presente em toda pagina (incluido no layout raiz).
// Cor oficial do WhatsApp (#25D366), sempre visivel pra facilitar o contato rapido.
export default function WhatsappFlutuante() {
  const contato = obterPagina("contato");
  return (
    <a
      href={linkWhatsapp(contato.whatsapp, "botão flutuante")}
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1EBE5A] transition-colors"
    >
      <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden="true">
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.31.66 4.46 1.8 6.29L4 29l7.9-1.75A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.9c-2.03 0-3.92-.58-5.52-1.58l-.4-.24-4.7 1.04 1.03-4.58-.26-.42A9.9 9.9 0 0 1 6.1 15c0-5.47 4.45-9.9 9.9-9.9 5.46 0 9.9 4.43 9.9 9.9 0 5.46-4.44 9.9-9.9 9.9Zm5.42-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.34.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.18-.24-.58-.48-.5-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      </svg>
    </a>
  );
}
