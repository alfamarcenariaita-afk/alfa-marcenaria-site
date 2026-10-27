import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsappFlutuante from "../components/WhatsappFlutuante";
import { construirMetadata } from "../lib/metadata";
import { obterConfig } from "../lib/config";
import { cssDoTema } from "../lib/tema";

// Playfair (títulos) + Inter (texto) — dupla clássica/moderna pra passar autoridade
// sem ficar pesada; next/font baixa e hospeda as fontes no próprio build (sem
// requisição externa em produção).
const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = construirMetadata({});

export default function RootLayout({ children }) {
  const config = obterConfig();
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <head>
        {/* cores editaveis pelo painel /admin: sobrescrevem a paleta padrao */}
        <style dangerouslySetInnerHTML={{ __html: cssDoTema(config) }} />
      </head>
      <body className="min-h-screen flex flex-col bg-wood-50 text-wood-900 font-sans antialiased">
        <a href="#conteudo" className="pular-para-conteudo bg-wood-900 text-white px-4 py-2 rounded-md font-medium">
          Pular para o conteúdo
        </a>
        <Header nome={config.nomeSite} logo={config.logo} />
        <main id="conteudo" className="flex-1">{children}</main>
        <Footer />
        <WhatsappFlutuante />
      </body>
    </html>
  );
}
