import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mathieu Perron Tattoo | Artiste Tatoueur à St-Jean-de-Matha",
  description:
    "Tatouages personnalisés par Mathieu Perron à St-Jean-de-Matha. Transformez votre vision en art corporel intemporel. Réservez votre consultation aujourd'hui.",
  keywords: ["tattoo", "tatouage", "tattoo artist", "artiste tatoueur", "St-Jean-de-Matha", "Mathieu Perron", "custom tattoo"],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
