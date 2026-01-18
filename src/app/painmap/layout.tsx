import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carte de Douleur Tatouage | Pain Map | Matha Tattoo",
  description:
    "Découvrez le niveau de douleur de chaque zone du corps pour votre tatouage. Carte interactive avec temps de guérison, durée de séance et quiz de tolérance à la douleur. Tattoo pain chart.",
  keywords: [
    "tattoo pain chart",
    "carte douleur tatouage",
    "pain map tattoo",
    "douleur tatouage",
    "où fait mal tatouage",
    "tattoo pain level",
    "zones douloureuses tatouage",
    "tattoo healing time",
    "temps guérison tatouage",
    "tatouage côtes douleur",
    "tatouage bras douleur",
  ],
  openGraph: {
    title: "Carte de Douleur Tatouage | Teste ta Tolérance!",
    description:
      "Découvre le niveau de douleur de chaque zone et teste ta tolérance avec notre quiz interactif!",
    url: "https://matha.tattoo/painmap",
    siteName: "Matha Tattoo",
    locale: "fr_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carte de Douleur Tatouage | Pain Map",
    description:
      "Découvre le niveau de douleur de chaque zone et teste ta tolérance!",
  },
  alternates: {
    canonical: "/painmap",
  },
};

export default function PainMapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
