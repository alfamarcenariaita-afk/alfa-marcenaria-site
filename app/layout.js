import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsappFlutuante from "../components/WhatsappFlutuante";
import JsonLd from "../components/JsonLd";
import { construirMetadata, siteConfig } from "../lib/metadata";
import { obterConfig } from "../lib/config";
import { obterPagina } from "../lib/content";
import { cssDoTema } from "../lib/tema";
import { grafoGlobal } from "../lib/schema";
import { depoimentosAutorizados } from "../lib/depoimentos";
import { linksNav } from "../lib/nav";

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

export const metadata = { ...construirMetadata({}), metadataBase: new URL(siteConfig.url) };

export default function RootLayout({ children }) {
  const config = obterConfig();
  const contato = obterPagina("contato");
  const temDepoimentos = depoimentosAutorizados().length > 0;
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
        {/* entidade da empresa + site em TODAS as paginas (SEO local / GEO) */}
        <JsonLd dados={grafoGlobal(contato, config)} />
        <Header nome={config.nomeSite} logo={config.logo} links={linksNav(temDepoimentos)} />
        <main id="conteudo" className="flex-1">{children}</main>
        <Footer />
        <WhatsappFlutuante />
      </body>
    </html>
  );
}
