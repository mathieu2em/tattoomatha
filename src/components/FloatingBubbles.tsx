"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

interface TattooItem {
  id: number;
  image: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
}

// Tatouages préférés de Mathieu
const featuredTattoos: TattooItem[] = [
  {
    id: 1,
    image: "/tattoos/18315492-C46F-4366-9293-2E6BBE3300AB.jpeg",
    titleFr: "Épinette Noire",
    titleEn: "Black Spruce",
    descriptionFr: "Épinette noire réaliste tatouée à l'intérieur de l'avant-bras. Un symbole de résilience nordique réalisé en 2 heures.",
    descriptionEn: "Realistic black spruce tattooed on the inner forearm. A symbol of Nordic resilience completed in 2 hours.",
  },
  {
    id: 2,
    image: "/tattoos/3C0108B9-8BE6-4891-817F-8E1F62BCFFFD_1_105_c.jpeg",
    titleFr: "Dualité Émotionnelle",
    titleEn: "Emotional Duality",
    descriptionFr: "Pièce sur la cuisse explorant la dualité émotionnelle. Un voyage intérieur encré en 2h30.",
    descriptionEn: "Thigh piece exploring emotional duality. An inner journey inked in 2.5 hours.",
  },
  {
    id: 3,
    image: "/tattoos/4403857E-7B78-4D56-99A6-9E3AD94FEFEC_1_105_c.jpeg",
    titleFr: "Mandala d'Épaule",
    titleEn: "Shoulder Mandala",
    descriptionFr: "Mandala complexe ornant l'épaule. 6 heures de travail minutieux pour créer cette œuvre méditative.",
    descriptionEn: "Complex mandala adorning the shoulder. 6 hours of meticulous work to create this meditative piece.",
  },
  {
    id: 4,
    image: "/tattoos/48E6E2BC-C108-40B0-8AE2-77260188DB77_1_102_o.jpeg",
    titleFr: "Sacred Geometry & Microréalisme",
    titleEn: "Sacred Geometry & Microrealism",
    descriptionFr: "Fusion unique de géométrie sacrée et de microréalisme. Quand la précision mathématique rencontre l'art organique.",
    descriptionEn: "Unique fusion of sacred geometry and microrealism. When mathematical precision meets organic art.",
  },
  {
    id: 5,
    image: "/tattoos/682070E2-C249-41E8-BA5B-4A0D79818742_1_102_o.jpeg",
    titleFr: "Robot Transformer",
    titleEn: "Transformer Robot",
    descriptionFr: "Robot Transformer détaillé réalisé en 2 sessions de 2h30 chacune. 5 heures au total pour donner vie à cette machine.",
    descriptionEn: "Detailed Transformer robot completed in 2 sessions of 2.5 hours each. 5 hours total to bring this machine to life.",
  },
  {
    id: 6,
    image: "/tattoos/718840BF-474D-4C58-8AB6-95899C68134A_1_105_c.jpeg",
    titleFr: "Phoenix & Cube de Métatron",
    titleEn: "Phoenix & Metatron's Cube",
    descriptionFr: "Grande pièce dorsale majestueuse: un phoenix entouré du cube de Métatron et des 6 éléments - vent, eau, feu, terre, éther et lumière.",
    descriptionEn: "Majestic large back piece: a phoenix surrounded by Metatron's cube and the 6 elements - wind, water, fire, earth, ether and light.",
  },
  {
    id: 7,
    image: "/tattoos/AC9EEAFC-5C4A-47DC-98C8-2B7AAA7FDEDD_1_105_c.jpeg",
    titleFr: "Bateau Viking",
    titleEn: "Viking Ship",
    descriptionFr: "Drakkar viking naviguant vers l'aventure. Hommage aux explorateurs nordiques et à l'esprit de conquête.",
    descriptionEn: "Viking longship sailing towards adventure. Tribute to Nordic explorers and the spirit of conquest.",
  },
  {
    id: 8,
    image: "/tattoos/C59DDAC4-5FE1-4E2A-BF38-F5ECCF6D98CA_1_105_c.jpeg",
    titleFr: "Composition Florale",
    titleEn: "Floral Composition",
    descriptionFr: "Agencement floral élégant avec feuillage délicat sur le mollet. La nature en mouvement sur la peau.",
    descriptionEn: "Elegant floral arrangement with delicate foliage on the calf. Nature in motion on the skin.",
  },
  {
    id: 9,
    image: "/tattoos/CF266DA1-0CF7-480F-AD1C-FA98CABC4426.jpeg",
    titleFr: "Forêt Nordique",
    titleEn: "Nordic Forest",
    descriptionFr: "Forêt d'arbres nordiques sur l'avant-bras. Une immersion dans les bois silencieux du Grand Nord.",
    descriptionEn: "Nordic tree forest on the forearm. An immersion into the silent woods of the Great North.",
  },
  {
    id: 10,
    image: "/tattoos/FB2A3DB3-2E0C-4866-AF27-04F117D25732_1_102_o.jpeg",
    titleFr: "Feuille de Ginkgo Biloba",
    titleEn: "Ginkgo Biloba Leaf",
    descriptionFr: "Feuille de ginkgo biloba minimaliste. Symbole de longévité et de résilience, un fossile vivant encré sur la peau.",
    descriptionEn: "Minimalist ginkgo biloba leaf. Symbol of longevity and resilience, a living fossil inked on skin.",
  },
];

// Positions des bulles - desktop et mobile différentes
// Sur mobile, on les positionne sur les bords et plus petites
const bubblePositions = [
  { x: 2, y: 8, size: 70, mobileSize: 40, mobileX: 2, mobileY: 5 },
  { x: 88, y: 8, size: 75, mobileSize: 42, mobileX: 85, mobileY: 5 },
  { x: 3, y: 35, size: 65, mobileSize: 38, mobileX: 2, mobileY: 25 },
  { x: 90, y: 38, size: 70, mobileSize: 40, mobileX: 88, mobileY: 28 },
  { x: 5, y: 60, size: 60, mobileSize: 36, mobileX: 3, mobileY: 50 },
  { x: 88, y: 58, size: 72, mobileSize: 38, mobileX: 87, mobileY: 48 },
  { x: 2, y: 82, size: 68, mobileSize: 40, mobileX: 2, mobileY: 75 },
  { x: 90, y: 80, size: 65, mobileSize: 38, mobileX: 88, mobileY: 72 },
  { x: 4, y: 92, size: 70, mobileSize: 36, mobileX: 3, mobileY: 88 },
  { x: 87, y: 90, size: 62, mobileSize: 38, mobileX: 85, mobileY: 85 },
];

function Bubble({ 
  tattoo, 
  position, 
  index, 
  onClick 
}: { 
  tattoo: TattooItem; 
  position: { x: number; y: number; size: number; mobileSize: number; mobileX: number; mobileY: number };
  index: number;
  onClick: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) return null;

  const currentX = isMobile ? position.mobileX : position.x;
  const currentY = isMobile ? position.mobileY : position.y;
  const currentSize = isMobile ? position.mobileSize : position.size;

  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={{
        left: `${currentX}%`,
        top: `${currentY}%`,
        width: currentSize,
        height: currentSize,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isMobile ? 0.7 : 1, 
        scale: 1,
        x: [0, 10, -5, 8, 0],
        y: [0, -8, 5, -10, 0],
      }}
      transition={{
        opacity: { delay: index * 0.2, duration: 0.5 },
        scale: { delay: index * 0.2, duration: 0.5 },
        x: {
          duration: 8 + index * 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
        y: {
          duration: 10 + index * 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{ scale: 1.15 }}
      onClick={onClick}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gold-500/20 blur-md group-hover:bg-gold-500/40 transition-all" />
      
      {/* Border ring */}
      <div className="absolute inset-0 rounded-full border-2 border-gold-500/50 group-hover:border-gold-400 transition-all" />
      
      {/* Image */}
      <div className="relative w-full h-full rounded-full overflow-hidden">
        <img
          src={tattoo.image}
          alt={tattoo.titleFr}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            // Fallback si l'image n'existe pas
            (e.target as HTMLImageElement).src = `https://picsum.photos/200?random=${tattoo.id}`;
          }}
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
          <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Voir
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function Modal({ 
  tattoo, 
  onClose,
  language 
}: { 
  tattoo: TattooItem; 
  onClose: () => void;
  language: string;
}) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative max-w-2xl w-full bg-ink-800 rounded-2xl overflow-hidden border border-gold-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
        >
          <FaTimes size={18} />
        </button>

        {/* Image */}
        <div className="relative aspect-square max-h-[60vh] overflow-hidden">
          <img
            src={tattoo.image}
            alt={language === "fr" ? tattoo.titleFr : tattoo.titleEn}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://picsum.photos/600?random=${tattoo.id}`;
            }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-display font-bold text-white mb-2">
            {language === "fr" ? tattoo.titleFr : tattoo.titleEn}
          </h3>
          <p className="text-gray-400">
            {language === "fr" ? tattoo.descriptionFr : tattoo.descriptionEn}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FloatingBubbles() {
  const [selectedTattoo, setSelectedTattoo] = useState<TattooItem | null>(null);
  const { language } = useLanguage();

  return (
    <>
      {/* Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {featuredTattoos.map((tattoo, index) => (
          <div key={tattoo.id} className="pointer-events-auto">
            <Bubble
              tattoo={tattoo}
              position={bubblePositions[index]}
              index={index}
              onClick={() => setSelectedTattoo(tattoo)}
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedTattoo && (
          <Modal
            tattoo={selectedTattoo}
            onClose={() => setSelectedTattoo(null)}
            language={language}
          />
        )}
      </AnimatePresence>
    </>
  );
}
