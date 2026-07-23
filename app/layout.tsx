import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Espacio TOPA | Salto, Uruguay",
    template: "%s | Espacio TOPA",
  },
  description:
    "Cafetería familiar, juegos, talleres, cumpleaños y eventos en Salto, Uruguay.",
  keywords: [
    "Espacio TOPA",
    "cafetería familiar Salto",
    "cumpleaños infantiles Salto",
    "talleres para niños Salto",
    "eventos familiares Uruguay",
  ],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
