import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { construirMetadata } from "../lib/metadata";

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
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen flex flex-col bg-wood-50 text-wood-900 font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
