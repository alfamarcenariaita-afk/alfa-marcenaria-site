import "./globals.css";

export const metadata = {
  title: "Alfa Marcenaria",
  description: "Marcenaria sob medida em Itabirito/MG.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-neutral-50 text-neutral-900">{children}</body>
    </html>
  );
}
