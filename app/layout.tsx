import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Espacio TOPA | Salto, Uruguay",
    template: "%s | Espacio TOPA",
  },
  description:
    "Cafetería, talleres, cumpleaños, eventos y alquileres infantiles en Salto, Uruguay.",
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
  openGraph: {
    title: "Espacio TOPA | Salto, Uruguay",
    description: "Cafetería, talleres, cumpleaños, eventos y alquileres infantiles en Salto, Uruguay.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Espacio TOPA | Salto, Uruguay",
    description: "Cafetería, talleres, cumpleaños, eventos y alquileres infantiles en Salto, Uruguay.",
    images: ["/og.png"],
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
