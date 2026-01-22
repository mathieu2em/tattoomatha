"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { client } from "../../sanity/lib/client";
import { TATTOOS_QUERY, type Tattoo } from "../../sanity/lib/queries";
import { urlFor } from "../../sanity/lib/image";

// 🎨 FALLBACK DATA - Used if Sanity is not configured yet
// Once Sanity is set up, data will be fetched from CMS
const fallbackTattooImages = [
  {
    src: "/tattoos/epinette-noire-avant-bras.jpeg",
    title: "Épinette Noire",
    alt: "Épinette noire tatouée sur avant-bras avec détails réalistes",
    size: "large",
  },
  {
    src: "/tattoos/dualite-emotionnelle-cuisse.jpeg",
    title: "Dualité Émotionnelle",
    alt: "Tatouage représentant la dualité émotionnelle sur la cuisse",
    size: "medium",
  },
  {
    src: "/tattoos/mandala-epaule.jpeg",
    title: "Mandala d'Épaule",
    alt: "Mandala géométrique détaillé sur l'épaule",
    size: "large",
  },
  {
    src: "/tattoos/sacred-geometry-microrealism.jpeg",
    title: "Sacred Geometry",
    alt: "Géométrie sacrée en microréalisme",
    size: "small",
  },
  {
    src: "/tattoos/colibri-et-fleur.jpeg",
    title: "Colibri et Fleur",
    alt: "Colibri en vol près d'une fleur délicate",
    size: "small",
  },
  {
    src: "/tattoos/phoenix-cube-metatron.jpeg",
    title: "Phoenix & Cube de Métatron",
    alt: "Phoenix mythique avec cube de Métatron en géométrie sacrée",
    size: "large",
  },
  {
    src: "/tattoos/bateau-viking.jpeg",
    title: "Bateau Viking",
    alt: "Drakkar viking naviguant sur les mers nordiques",
    size: "medium",
  },
  {
    src: "/tattoos/marguerite.jpeg",
    title: "Marguerite",
    alt: "Marguerite délicate en style botanique",
    size: "small",
  },
  {
    src: "/tattoos/floral-mollet.jpeg",
    title: "Composition Florale",
    alt: "Composition florale artistique sur le mollet",
    size: "small",
  },
  {
    src: "/tattoos/huitre-perle.jpeg",
    title: "Huître et Perle",
    alt: "Huître ouverte révélant une perle précieuse",
    size: "small",
  },
  {
    src: "/tattoos/foret-nordique-avant-bras.jpeg",
    title: "Forêt Nordique",
    alt: "Paysage de forêt nordique sur l'avant-bras",
    size: "small",
  },
  {
    src: "/tattoos/mandala-coude.jpeg",
    title: "Mandala du Coude",
    alt: "Mandala circulaire centré sur le coude",
    size: "small",
  },
  {
    src: "/tattoos/memento-mori.jpeg",
    title: "Memento Mori",
    alt: "Rappel de la mortalité en style artistique",
    size: "small",
  },
  {
    src: "/tattoos/mandala-sur-mollet.png",
    title: "Mandala sur Mollet",
    alt: "Grand mandala décoratif sur le mollet",
    size: "small",
  },
  {
    src: "/tattoos/ginkgo-biloba.jpeg",
    title: "Feuille de Ginkgo Biloba",
    alt: "Feuille de Ginkgo Biloba en détail botanique",
    size: "small",
  },
  {
    src: "/tattoos/agencement-avant-bras.jpeg",
    title: "Agencement Avant-Bras",
    alt: "Composition artistique agencée sur l'avant-bras",
    size: "medium",
  },
  {
    src: "/tattoos/chibi-manga.jpeg",
    title: "Chibi Manga",
    alt: "Personnage manga en style chibi",
    size: "small",
  },
  {
    src: "/tattoos/fleur-cover.jpeg",
    title: "Fleur Cover",
    alt: "Fleur artistique en cover-up",
    size: "small",
  },
  {
    src: "/tattoos/king.jpeg",
    title: "King",
    alt: "Symbole royal King",
    size: "small",
  },
  {
    src: "/tattoos/queen.jpeg",
    title: "Queen",
    alt: "Symbole royal Queen",
    size: "small",
  },
  {
    src: "/tattoos/memorial-a-ses-enfants.jpeg",
    title: "Mémorial à ses Enfants",
    alt: "Tatouage mémorial dédié aux enfants",
    size: "medium",
  },
  {
    src: "/tattoos/F11BD132-F024-4494-9E9A-E7AC79589293_4_5005_c.jpeg",
    title: "Tatouage Artistique 1",
    alt: "Tatouage artistique unique",
    size: "small",
  },
  {
    src: "/tattoos/FDEA7EEE-D2E9-4E95-94B8-8C5241D596E6_1_105_c.jpeg",
    title: "Tatouage Artistique 2",
    alt: "Tatouage artistique créatif",
    size: "small",
  },
];

export default function TattooCarousel() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [selectedAlt, setSelectedAlt] = useState<string>("");
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [tattoos, setTattoos] = useState<Array<{ src: string; title: string; alt: string; size: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch tattoos from Sanity
  useEffect(() => {
    async function fetchTattoos() {
      try {
        const sanityTattoos = await client.fetch<Tattoo[]>(TATTOOS_QUERY);

        if (sanityTattoos && sanityTattoos.length > 0) {
          // Convert Sanity data to component format
          const formattedTattoos = sanityTattoos.map((tattoo) => ({
            src: urlFor(tattoo.image).url(),
            title: tattoo.title,
            alt: tattoo.alt,
            size: tattoo.size,
          }));
          setTattoos(formattedTattoos);
        } else {
          // Use fallback data if no Sanity content
          setTattoos(fallbackTattooImages);
        }
      } catch (error) {
        console.log("Sanity not configured yet, using fallback data");
        setTattoos(fallbackTattooImages);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTattoos();
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 13 sur desktop (4 colonnes), 14 sur mobile (2 colonnes = pair)
  const INITIAL_DISPLAY_COUNT = isMobile ? 14 : 13;
  const displayedImages = showAll ? tattoos : tattoos.slice(0, INITIAL_DISPLAY_COUNT);

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-12 text-center">
        <p className="text-gold-400">Loading gallery...</p>
      </div>
    );
  }

  const getSizeClass = (size: string) => {
    switch (size) {
      case "large":
        return "md:col-span-2 md:row-span-2";
      case "medium":
        return "md:col-span-2 md:row-span-1";
      case "small":
        return "md:col-span-1 md:row-span-1";
      default:
        return "md:col-span-1 md:row-span-1";
    }
  };

  return (
    <>
      {/* Grille de galerie */}
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[220px]">
          {displayedImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`${getSizeClass(image.size)} relative overflow-hidden rounded-lg cursor-pointer group`}
              onClick={() => {
                setSelectedImage(image.src);
                setSelectedTitle(image.title);
                setSelectedAlt(image.alt);
              }}
            >
              {/* Image */}
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                quality={75}
                loading="lazy"
              />
              
              {/* Overlay au hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-gold-400 font-semibold text-sm md:text-base">{image.title}</p>
                </div>
              </div>
              
              {/* Bordure dorée au hover */}
              <div className="absolute inset-0 border-2 border-gold-500/0 group-hover:border-gold-500/50 transition-all duration-300 rounded-lg" />
            </motion.div>
          ))}
        </div>

        {/* Bouton Voir plus / Voir moins */}
        {tattoos.length > INITIAL_DISPLAY_COUNT && (
          <div className="flex justify-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-gold-400/10 border-2 border-gold-400/30 text-gold-400 font-semibold rounded-lg hover:bg-gold-400/20 hover:border-gold-400/50 transition-all"
            >
              {showAll
                ? t("gallery.viewLess")
                : `${t("gallery.viewMore")} (${tattoos.length - INITIAL_DISPLAY_COUNT} ${t("gallery.moreCount")})`
              }
            </motion.button>
          </div>
        )}
      </div>

      {/* Modal pour afficher l'image en grand */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/95 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-3xl max-h-[80vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Bouton fermer */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 md:-top-12 right-0 text-gold-400 hover:text-gold-500 transition-colors bg-ink-900/50 rounded-full p-2"
              >
                <FaTimes size={24} />
              </button>

              {/* Image agrandie */}
              <div className="relative max-h-[70vh] flex items-center justify-center bg-ink-900/50 rounded-lg border-2 border-gold-500/30 p-4">
                <div className="relative w-full h-[65vh]">
                  <Image
                    src={selectedImage}
                    alt={selectedTitle}
                    fill
                    sizes="(max-width: 768px) 90vw, 60vw"
                    className="object-contain rounded-lg"
                    quality={85}
                    priority
                  />
                </div>
              </div>

              {/* Titre et description */}
              <div className="mt-4 text-center">
                <h3 className="text-gold-400 text-lg md:text-xl font-display font-bold">
                  {selectedTitle}
                </h3>
                <p className="text-gold-400/70 text-sm md:text-base mt-2">
                  {selectedAlt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
