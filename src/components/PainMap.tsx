"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface BodyZone {
  id: string;
  path: string;
  painLevel: number; // 1-5 (1 = low pain, 5 = extreme pain)
  nameFr: string;
  nameEn: string;
}

// Pain levels: 1 = très supportable, 5 = très douloureux
const bodyZonesFront: BodyZone[] = [
  // Head & Neck
  { id: "head", path: "M 150,30 Q 130,30 125,50 Q 120,75 130,90 Q 140,105 150,105 Q 160,105 170,90 Q 180,75 175,50 Q 170,30 150,30 Z", painLevel: 4, nameFr: "Tête", nameEn: "Head" },
  { id: "neck-front", path: "M 140,105 L 160,105 L 165,130 L 135,130 Z", painLevel: 5, nameFr: "Cou", nameEn: "Neck" },
  
  // Torso
  { id: "chest-left", path: "M 135,130 L 150,130 L 150,180 L 120,180 L 115,150 Q 120,135 135,130 Z", painLevel: 3, nameFr: "Poitrine gauche", nameEn: "Left chest" },
  { id: "chest-right", path: "M 150,130 L 165,130 Q 180,135 185,150 L 180,180 L 150,180 Z", painLevel: 3, nameFr: "Poitrine droite", nameEn: "Right chest" },
  { id: "stomach", path: "M 125,180 L 175,180 L 175,220 L 125,220 Z", painLevel: 3, nameFr: "Ventre", nameEn: "Stomach" },
  { id: "ribs-left", path: "M 110,150 L 120,180 L 125,220 L 115,220 L 105,180 Z", painLevel: 5, nameFr: "Côtes gauches", nameEn: "Left ribs" },
  { id: "ribs-right", path: "M 190,150 L 180,180 L 175,220 L 185,220 L 195,180 Z", painLevel: 5, nameFr: "Côtes droites", nameEn: "Right ribs" },
  { id: "lower-abs", path: "M 130,220 L 170,220 L 165,260 L 135,260 Z", painLevel: 4, nameFr: "Bas-ventre", nameEn: "Lower abdomen" },
  
  // Arms
  { id: "shoulder-left", path: "M 115,130 Q 95,135 90,150 L 105,150 L 115,135 Z", painLevel: 2, nameFr: "Épaule gauche", nameEn: "Left shoulder" },
  { id: "shoulder-right", path: "M 185,130 Q 205,135 210,150 L 195,150 L 185,135 Z", painLevel: 2, nameFr: "Épaule droite", nameEn: "Right shoulder" },
  { id: "upper-arm-left", path: "M 90,150 L 105,150 L 100,200 L 85,200 Z", painLevel: 2, nameFr: "Bras gauche (ext.)", nameEn: "Left upper arm" },
  { id: "upper-arm-right", path: "M 195,150 L 210,150 L 215,200 L 200,200 Z", painLevel: 2, nameFr: "Bras droit (ext.)", nameEn: "Right upper arm" },
  { id: "inner-arm-left", path: "M 100,200 L 105,150 L 110,150 L 110,200 Z", painLevel: 4, nameFr: "Bras gauche (int.)", nameEn: "Left inner arm" },
  { id: "inner-arm-right", path: "M 190,150 L 195,150 L 200,200 L 190,200 Z", painLevel: 4, nameFr: "Bras droit (int.)", nameEn: "Right inner arm" },
  { id: "elbow-left", path: "M 82,200 L 110,200 L 108,220 L 80,220 Z", painLevel: 5, nameFr: "Coude gauche", nameEn: "Left elbow" },
  { id: "elbow-right", path: "M 190,200 L 220,200 L 220,220 L 192,220 Z", painLevel: 5, nameFr: "Coude droit", nameEn: "Right elbow" },
  { id: "forearm-left", path: "M 75,220 L 108,220 L 100,280 L 70,280 Z", painLevel: 2, nameFr: "Avant-bras gauche", nameEn: "Left forearm" },
  { id: "forearm-right", path: "M 192,220 L 225,220 L 230,280 L 200,280 Z", painLevel: 2, nameFr: "Avant-bras droit", nameEn: "Right forearm" },
  { id: "wrist-left", path: "M 65,280 L 100,280 L 95,300 L 60,300 Z", painLevel: 4, nameFr: "Poignet gauche", nameEn: "Left wrist" },
  { id: "wrist-right", path: "M 200,280 L 235,280 L 240,300 L 205,300 Z", painLevel: 4, nameFr: "Poignet droit", nameEn: "Right wrist" },
  { id: "hand-left", path: "M 55,300 L 95,300 L 90,340 L 50,340 Z", painLevel: 5, nameFr: "Main gauche", nameEn: "Left hand" },
  { id: "hand-right", path: "M 205,300 L 245,300 L 250,340 L 210,340 Z", painLevel: 5, nameFr: "Main droite", nameEn: "Right hand" },
  
  // Legs
  { id: "hip-left", path: "M 120,260 L 135,260 L 135,280 L 115,280 Z", painLevel: 3, nameFr: "Hanche gauche", nameEn: "Left hip" },
  { id: "hip-right", path: "M 165,260 L 180,260 L 185,280 L 165,280 Z", painLevel: 3, nameFr: "Hanche droite", nameEn: "Right hip" },
  { id: "thigh-left", path: "M 115,280 L 145,280 L 140,360 L 110,360 Z", painLevel: 2, nameFr: "Cuisse gauche", nameEn: "Left thigh" },
  { id: "thigh-right", path: "M 155,280 L 185,280 L 190,360 L 160,360 Z", painLevel: 2, nameFr: "Cuisse droite", nameEn: "Right thigh" },
  { id: "inner-thigh-left", path: "M 140,280 L 150,280 L 150,360 L 140,360 Z", painLevel: 4, nameFr: "Intérieur cuisse G", nameEn: "Left inner thigh" },
  { id: "inner-thigh-right", path: "M 150,280 L 160,280 L 160,360 L 150,360 Z", painLevel: 4, nameFr: "Intérieur cuisse D", nameEn: "Right inner thigh" },
  { id: "knee-left", path: "M 110,360 L 145,360 L 143,390 L 108,390 Z", painLevel: 5, nameFr: "Genou gauche", nameEn: "Left knee" },
  { id: "knee-right", path: "M 155,360 L 190,360 L 192,390 L 157,390 Z", painLevel: 5, nameFr: "Genou droit", nameEn: "Right knee" },
  { id: "calf-left", path: "M 108,390 L 143,390 L 138,460 L 112,460 Z", painLevel: 2, nameFr: "Mollet gauche", nameEn: "Left calf" },
  { id: "calf-right", path: "M 157,390 L 192,390 L 188,460 L 162,460 Z", painLevel: 2, nameFr: "Mollet droit", nameEn: "Right calf" },
  { id: "ankle-left", path: "M 112,460 L 138,460 L 135,480 L 115,480 Z", painLevel: 4, nameFr: "Cheville gauche", nameEn: "Left ankle" },
  { id: "ankle-right", path: "M 162,460 L 188,460 L 185,480 L 165,480 Z", painLevel: 4, nameFr: "Cheville droite", nameEn: "Right ankle" },
  { id: "foot-left", path: "M 110,480 L 140,480 L 145,510 L 105,510 Z", painLevel: 5, nameFr: "Pied gauche", nameEn: "Left foot" },
  { id: "foot-right", path: "M 160,480 L 190,480 L 195,510 L 155,510 Z", painLevel: 5, nameFr: "Pied droit", nameEn: "Right foot" },
];

const bodyZonesBack: BodyZone[] = [
  // Head & Neck
  { id: "head-back", path: "M 150,30 Q 130,30 125,50 Q 120,75 130,90 Q 140,105 150,105 Q 160,105 170,90 Q 180,75 175,50 Q 170,30 150,30 Z", painLevel: 4, nameFr: "Arrière tête", nameEn: "Back of head" },
  { id: "neck-back", path: "M 140,105 L 160,105 L 165,130 L 135,130 Z", painLevel: 5, nameFr: "Nuque", nameEn: "Nape" },
  
  // Back
  { id: "upper-back-left", path: "M 115,130 L 150,130 L 150,180 L 110,180 Z", painLevel: 2, nameFr: "Haut du dos G", nameEn: "Upper back left" },
  { id: "upper-back-right", path: "M 150,130 L 185,130 L 190,180 L 150,180 Z", painLevel: 2, nameFr: "Haut du dos D", nameEn: "Upper back right" },
  { id: "spine-upper", path: "M 145,130 L 155,130 L 155,200 L 145,200 Z", painLevel: 5, nameFr: "Colonne (haut)", nameEn: "Upper spine" },
  { id: "mid-back-left", path: "M 110,180 L 145,180 L 145,230 L 115,230 Z", painLevel: 2, nameFr: "Milieu dos G", nameEn: "Mid back left" },
  { id: "mid-back-right", path: "M 155,180 L 190,180 L 185,230 L 155,230 Z", painLevel: 2, nameFr: "Milieu dos D", nameEn: "Mid back right" },
  { id: "spine-mid", path: "M 145,200 L 155,200 L 155,250 L 145,250 Z", painLevel: 5, nameFr: "Colonne (milieu)", nameEn: "Mid spine" },
  { id: "lower-back-left", path: "M 120,230 L 145,230 L 145,270 L 125,270 Z", painLevel: 3, nameFr: "Bas du dos G", nameEn: "Lower back left" },
  { id: "lower-back-right", path: "M 155,230 L 180,230 L 175,270 L 155,270 Z", painLevel: 3, nameFr: "Bas du dos D", nameEn: "Lower back right" },
  { id: "spine-lower", path: "M 145,250 L 155,250 L 155,280 L 145,280 Z", painLevel: 5, nameFr: "Colonne (bas)", nameEn: "Lower spine" },
  
  // Arms (back view)
  { id: "shoulder-back-left", path: "M 110,130 Q 90,140 85,155 L 100,155 L 110,140 Z", painLevel: 2, nameFr: "Épaule arrière G", nameEn: "Left back shoulder" },
  { id: "shoulder-back-right", path: "M 190,130 Q 210,140 215,155 L 200,155 L 190,140 Z", painLevel: 2, nameFr: "Épaule arrière D", nameEn: "Right back shoulder" },
  { id: "tricep-left", path: "M 85,155 L 105,155 L 100,210 L 80,210 Z", painLevel: 3, nameFr: "Triceps gauche", nameEn: "Left tricep" },
  { id: "tricep-right", path: "M 195,155 L 215,155 L 220,210 L 200,210 Z", painLevel: 3, nameFr: "Triceps droit", nameEn: "Right tricep" },
  { id: "back-elbow-left", path: "M 78,210 L 100,210 L 98,230 L 75,230 Z", painLevel: 5, nameFr: "Coude arrière G", nameEn: "Left back elbow" },
  { id: "back-elbow-right", path: "M 200,210 L 222,210 L 225,230 L 202,230 Z", painLevel: 5, nameFr: "Coude arrière D", nameEn: "Right back elbow" },
  { id: "back-forearm-left", path: "M 73,230 L 98,230 L 92,285 L 68,285 Z", painLevel: 2, nameFr: "Avant-bras arr. G", nameEn: "Left back forearm" },
  { id: "back-forearm-right", path: "M 202,230 L 227,230 L 232,285 L 208,285 Z", painLevel: 2, nameFr: "Avant-bras arr. D", nameEn: "Right back forearm" },
  
  // Glutes & Legs
  { id: "glute-left", path: "M 120,270 L 150,270 L 150,310 L 115,310 Z", painLevel: 1, nameFr: "Fesse gauche", nameEn: "Left glute" },
  { id: "glute-right", path: "M 150,270 L 180,270 L 185,310 L 150,310 Z", painLevel: 1, nameFr: "Fesse droite", nameEn: "Right glute" },
  { id: "back-thigh-left", path: "M 112,310 L 148,310 L 143,370 L 108,370 Z", painLevel: 2, nameFr: "Arrière cuisse G", nameEn: "Left hamstring" },
  { id: "back-thigh-right", path: "M 152,310 L 188,310 L 192,370 L 157,370 Z", painLevel: 2, nameFr: "Arrière cuisse D", nameEn: "Right hamstring" },
  { id: "back-knee-left", path: "M 108,370 L 143,370 L 140,395 L 110,395 Z", painLevel: 4, nameFr: "Arrière genou G", nameEn: "Left back knee" },
  { id: "back-knee-right", path: "M 157,370 L 192,370 L 190,395 L 160,395 Z", painLevel: 4, nameFr: "Arrière genou D", nameEn: "Right back knee" },
  { id: "back-calf-left", path: "M 110,395 L 140,395 L 135,465 L 115,465 Z", painLevel: 2, nameFr: "Mollet arrière G", nameEn: "Left back calf" },
  { id: "back-calf-right", path: "M 160,395 L 190,395 L 185,465 L 165,465 Z", painLevel: 2, nameFr: "Mollet arrière D", nameEn: "Right back calf" },
  { id: "achilles-left", path: "M 118,465 L 132,465 L 130,490 L 120,490 Z", painLevel: 5, nameFr: "Tendon d'Achille G", nameEn: "Left Achilles" },
  { id: "achilles-right", path: "M 168,465 L 182,465 L 180,490 L 170,490 Z", painLevel: 5, nameFr: "Tendon d'Achille D", nameEn: "Right Achilles" },
  { id: "heel-left", path: "M 115,490 L 135,490 L 138,515 L 112,515 Z", painLevel: 5, nameFr: "Talon gauche", nameEn: "Left heel" },
  { id: "heel-right", path: "M 165,490 L 185,490 L 188,515 L 162,515 Z", painLevel: 5, nameFr: "Talon droit", nameEn: "Right heel" },
];

function getPainColor(level: number): string {
  switch (level) {
    case 1: return "#22c55e"; // green-500 - très supportable
    case 2: return "#84cc16"; // lime-500 - supportable
    case 3: return "#eab308"; // yellow-500 - modéré
    case 4: return "#f97316"; // orange-500 - douloureux
    case 5: return "#ef4444"; // red-500 - très douloureux
    default: return "#6b7280";
  }
}

function getPainLabel(level: number, language: string): string {
  const labels = {
    fr: {
      1: "Très supportable",
      2: "Supportable", 
      3: "Modéré",
      4: "Douloureux",
      5: "Très douloureux",
    },
    en: {
      1: "Very bearable",
      2: "Bearable",
      3: "Moderate",
      4: "Painful",
      5: "Very painful",
    },
  };
  return labels[language as keyof typeof labels]?.[level as keyof typeof labels.fr] || "";
}

function BodySVG({ 
  zones, 
  hoveredZone, 
  setHoveredZone,
  language 
}: { 
  zones: BodyZone[]; 
  hoveredZone: BodyZone | null;
  setHoveredZone: (zone: BodyZone | null) => void;
  language: string;
}) {
  return (
    <svg viewBox="0 0 300 540" className="w-full h-full max-h-[500px]">
      {/* Body outline for context */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {zones.map((zone) => (
        <path
          key={zone.id}
          d={zone.path}
          fill={getPainColor(zone.painLevel)}
          fillOpacity={hoveredZone?.id === zone.id ? 0.9 : 0.6}
          stroke={hoveredZone?.id === zone.id ? "#fff" : getPainColor(zone.painLevel)}
          strokeWidth={hoveredZone?.id === zone.id ? 2 : 1}
          className="cursor-pointer transition-all duration-200"
          filter={hoveredZone?.id === zone.id ? "url(#glow)" : undefined}
          onMouseEnter={() => setHoveredZone(zone)}
          onMouseLeave={() => setHoveredZone(null)}
          onClick={() => setHoveredZone(zone)}
        />
      ))}
    </svg>
  );
}

export default function PainMap() {
  const { language } = useLanguage();
  const [hoveredZone, setHoveredZone] = useState<BodyZone | null>(null);
  const [view, setView] = useState<"front" | "back">("front");

  const content = {
    fr: {
      title: "Carte de la ",
      titleHighlight: "Douleur",
      subtitle: "Découvrez le niveau de douleur de chaque zone du corps. Survolez ou touchez une zone pour plus de détails.",
      front: "Avant",
      back: "Arrière",
      hoverPrompt: "Survolez une zone pour voir le niveau de douleur",
      painLevel: "Niveau de douleur",
      tip: "💡 J'offre de la crème anesthésiante à mon studio pour votre confort!",
    },
    en: {
      title: "Pain ",
      titleHighlight: "Map",
      subtitle: "Discover the pain level for each body zone. Hover or tap a zone for more details.",
      front: "Front",
      back: "Back",
      hoverPrompt: "Hover over a zone to see the pain level",
      painLevel: "Pain level",
      tip: "💡 I offer numbing cream at my studio for your comfort!",
    },
  };

  const t = content[language as keyof typeof content] || content.fr;
  const zones = view === "front" ? bodyZonesFront : bodyZonesBack;

  return (
    <section className="py-16 sm:py-20 bg-ink-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
            {t.title}
            <span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Body visualization */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* View toggle */}
            <div className="flex justify-center gap-2 mb-6">
              <button
                onClick={() => setView("front")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  view === "front"
                    ? "bg-gold-500 text-ink-900"
                    : "bg-ink-700 text-gray-300 hover:bg-ink-600"
                }`}
              >
                {t.front}
              </button>
              <button
                onClick={() => setView("back")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  view === "back"
                    ? "bg-gold-500 text-ink-900"
                    : "bg-ink-700 text-gray-300 hover:bg-ink-600"
                }`}
              >
                {t.back}
              </button>
            </div>

            {/* SVG Container */}
            <div className="bg-ink-900/50 rounded-2xl p-6 border border-ink-700">
              <BodySVG 
                zones={zones} 
                hoveredZone={hoveredZone} 
                setHoveredZone={setHoveredZone}
                language={language}
              />
            </div>
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Selected zone info */}
            <div className="bg-ink-900/50 rounded-2xl p-6 border border-ink-700 min-h-[180px]">
              {hoveredZone ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <h3 className="text-2xl font-display font-bold text-white mb-3">
                    {language === "fr" ? hoveredZone.nameFr : hoveredZone.nameEn}
                  </h3>
                  <div 
                    className="inline-block px-4 py-2 rounded-full text-white font-medium mb-4"
                    style={{ backgroundColor: getPainColor(hoveredZone.painLevel) }}
                  >
                    {getPainLabel(hoveredZone.painLevel, language)}
                  </div>
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                          level <= hoveredZone.painLevel
                            ? "text-white scale-110"
                            : "bg-ink-700 text-gray-500"
                        }`}
                        style={{
                          backgroundColor: level <= hoveredZone.painLevel ? getPainColor(level) : undefined,
                        }}
                      >
                        {level}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 text-center">
                  <p>{t.hoverPrompt}</p>
                </div>
              )}
            </div>

            {/* Pain level legend */}
            <div className="bg-ink-900/50 rounded-2xl p-6 border border-ink-700">
              <h4 className="text-lg font-semibold text-white mb-4">{t.painLevel}</h4>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div key={level} className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex-shrink-0"
                      style={{ backgroundColor: getPainColor(level) }}
                    />
                    <div className="flex-1 h-2 bg-ink-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          backgroundColor: getPainColor(level),
                          width: `${level * 20}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-300 w-32 text-right">
                      {getPainLabel(level, language)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tip */}
            <div className="bg-gradient-to-r from-gold-500/10 to-gold-600/10 border border-gold-500/30 rounded-xl p-4 text-center">
              <p className="text-gold-400 font-medium">{t.tip}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
