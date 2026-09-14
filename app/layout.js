import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { construirMetadata } from "../lib/metadata";

export const metadata = construirMetadata({});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
