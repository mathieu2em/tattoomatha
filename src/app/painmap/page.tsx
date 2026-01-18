"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiShare2, FiPlay, FiRotateCcw, FiInfo, FiClock, FiZap, FiHeart, FiArrowRight, FiDownload } from "react-icons/fi";
import { FaInstagram, FaFacebook } from "react-icons/fa";

interface BodyZone {
  id: string;
  path: string;
  painLevel: number;
  nameFr: string;
  nameEn: string;
  healingDays: number;
  sessionHours: string;
  whyItHurtsFr: string;
  whyItHurtsEn: string;
}

// Extended zone data with healing time, session length, and pain explanations
const bodyZonesFront: BodyZone[] = [
  // Head & Neck
  { id: "head", path: "M 150,28 Q 128,28 123,50 Q 118,77 129,93 Q 140,107 150,107 Q 160,107 171,93 Q 182,77 177,50 Q 172,28 150,28 Z", painLevel: 5, nameFr: "Tête", nameEn: "Head", healingDays: 21, sessionHours: "2-4h", whyItHurtsFr: "Peau très fine sur l'os du crâne, beaucoup de terminaisons nerveuses", whyItHurtsEn: "Very thin skin over skull bone, many nerve endings" },
  { id: "neck-front", path: "M 138,110 L 162,110 L 167,132 L 133,132 Z", painLevel: 5, nameFr: "Cou", nameEn: "Neck", healingDays: 14, sessionHours: "1-2h", whyItHurtsFr: "Zone très sensible avec peu de graisse, proche de la trachée", whyItHurtsEn: "Very sensitive area with little fat, close to windpipe" },

  // Torso
  { id: "chest-left", path: "M 133,135 L 142,135 L 142,178 L 118,178 L 113,152 Q 118,138 133,135 Z", painLevel: 3, nameFr: "Poitrine gauche", nameEn: "Left chest", healingDays: 14, sessionHours: "2-4h", whyItHurtsFr: "Zone charnue avec douleur modérée, plus sensible près du mamelon", whyItHurtsEn: "Fleshy area with moderate pain, more sensitive near nipple" },
  { id: "sternum", path: "M 145,135 L 155,135 L 155,178 L 145,178 Z", painLevel: 5, nameFr: "Sternum", nameEn: "Sternum", healingDays: 21, sessionHours: "1-2h", whyItHurtsFr: "Directement sur l'os, peau très fine sans coussin de graisse", whyItHurtsEn: "Directly on bone, very thin skin with no fat cushion" },
  { id: "chest-right", path: "M 158,135 L 167,135 Q 182,138 187,152 L 182,178 L 158,178 Z", painLevel: 3, nameFr: "Poitrine droite", nameEn: "Right chest", healingDays: 14, sessionHours: "2-4h", whyItHurtsFr: "Zone charnue avec douleur modérée, plus sensible près du mamelon", whyItHurtsEn: "Fleshy area with moderate pain, more sensitive near nipple" },
  { id: "stomach", path: "M 123,181 L 177,181 L 177,218 L 123,218 Z", painLevel: 3, nameFr: "Ventre", nameEn: "Stomach", healingDays: 14, sessionHours: "3-5h", whyItHurtsFr: "Douleur modérée, peut varier selon la tonicité musculaire", whyItHurtsEn: "Moderate pain, can vary based on muscle tone" },
  { id: "ribs-left", path: "M 107,152 L 115,178 L 120,218 L 110,218 L 100,178 Z", painLevel: 5, nameFr: "Côtes gauches", nameEn: "Left ribs", healingDays: 21, sessionHours: "2-3h", whyItHurtsFr: "Peau fine sur les os, vibrations douloureuses sur la cage thoracique", whyItHurtsEn: "Thin skin over bones, painful vibrations on rib cage" },
  { id: "ribs-right", path: "M 193,152 L 185,178 L 180,218 L 190,218 L 200,178 Z", painLevel: 5, nameFr: "Côtes droites", nameEn: "Right ribs", healingDays: 21, sessionHours: "2-3h", whyItHurtsFr: "Peau fine sur les os, vibrations douloureuses sur la cage thoracique", whyItHurtsEn: "Thin skin over bones, painful vibrations on rib cage" },
  { id: "lower-abs", path: "M 128,221 L 172,221 L 167,258 L 133,258 Z", painLevel: 4, nameFr: "Bas-ventre", nameEn: "Lower abdomen", healingDays: 14, sessionHours: "2-4h", whyItHurtsFr: "Plus sensible que le haut du ventre, proche des os du bassin", whyItHurtsEn: "More sensitive than upper stomach, close to hip bones" },

  // Arms
  { id: "shoulder-left", path: "M 108,135 Q 82,140 75,155 L 93,155 L 108,140 Z", painLevel: 2, nameFr: "Épaule gauche", nameEn: "Left shoulder", healingDays: 10, sessionHours: "2-4h", whyItHurtsFr: "Bonne couche de muscle, zone populaire et peu douloureuse", whyItHurtsEn: "Good muscle layer, popular and less painful area" },
  { id: "shoulder-right", path: "M 192,135 Q 218,140 225,155 L 207,155 L 192,140 Z", painLevel: 2, nameFr: "Épaule droite", nameEn: "Right shoulder", healingDays: 10, sessionHours: "2-4h", whyItHurtsFr: "Bonne couche de muscle, zone populaire et peu douloureuse", whyItHurtsEn: "Good muscle layer, popular and less painful area" },
  { id: "armpit-left", path: "M 93,158 L 110,158 L 110,180 L 93,180 Z", painLevel: 5, nameFr: "Aisselle gauche", nameEn: "Left armpit", healingDays: 21, sessionHours: "1-2h", whyItHurtsFr: "Peau extrêmement fine, ganglions lymphatiques et nerfs nombreux", whyItHurtsEn: "Extremely thin skin, many lymph nodes and nerves" },
  { id: "armpit-right", path: "M 190,158 L 207,158 L 207,180 L 190,180 Z", painLevel: 5, nameFr: "Aisselle droite", nameEn: "Right armpit", healingDays: 21, sessionHours: "1-2h", whyItHurtsFr: "Peau extrêmement fine, ganglions lymphatiques et nerfs nombreux", whyItHurtsEn: "Extremely thin skin, many lymph nodes and nerves" },
  { id: "upper-arm-left", path: "M 75,158 L 90,158 L 85,198 L 70,198 Z", painLevel: 2, nameFr: "Bras gauche (ext.)", nameEn: "Left upper arm", healingDays: 10, sessionHours: "3-5h", whyItHurtsFr: "Zone charnue idéale pour les débutants, guérit bien", whyItHurtsEn: "Fleshy area ideal for beginners, heals well" },
  { id: "upper-arm-right", path: "M 210,158 L 225,158 L 230,198 L 215,198 Z", painLevel: 2, nameFr: "Bras droit (ext.)", nameEn: "Right upper arm", healingDays: 10, sessionHours: "3-5h", whyItHurtsFr: "Zone charnue idéale pour les débutants, guérit bien", whyItHurtsEn: "Fleshy area ideal for beginners, heals well" },
  { id: "inner-arm-left", path: "M 88,158 L 105,158 L 100,198 L 83,198 Z", painLevel: 4, nameFr: "Bras gauche (int.)", nameEn: "Left inner arm", healingDays: 14, sessionHours: "2-3h", whyItHurtsFr: "Peau plus fine, nerfs proches de la surface", whyItHurtsEn: "Thinner skin, nerves close to surface" },
  { id: "inner-arm-right", path: "M 195,158 L 212,158 L 217,198 L 200,198 Z", painLevel: 4, nameFr: "Bras droit (int.)", nameEn: "Right inner arm", healingDays: 14, sessionHours: "2-3h", whyItHurtsFr: "Peau plus fine, nerfs proches de la surface", whyItHurtsEn: "Thinner skin, nerves close to surface" },
  { id: "elbow-left", path: "M 66,201 L 100,201 L 98,221 L 64,221 Z", painLevel: 5, nameFr: "Coude gauche", nameEn: "Left elbow", healingDays: 21, sessionHours: "1-2h", whyItHurtsFr: "Peau sur l'os, pli qui bouge beaucoup et guérit lentement", whyItHurtsEn: "Skin over bone, crease that moves a lot and heals slowly" },
  { id: "elbow-right", path: "M 200,201 L 234,201 L 236,221 L 202,221 Z", painLevel: 5, nameFr: "Coude droit", nameEn: "Right elbow", healingDays: 21, sessionHours: "1-2h", whyItHurtsFr: "Peau sur l'os, pli qui bouge beaucoup et guérit lentement", whyItHurtsEn: "Skin over bone, crease that moves a lot and heals slowly" },
  { id: "forearm-left", path: "M 60,224 L 98,224 L 88,278 L 54,278 Z", painLevel: 2, nameFr: "Avant-bras gauche", nameEn: "Left forearm", healingDays: 10, sessionHours: "2-4h", whyItHurtsFr: "Zone populaire, douleur gérable sur l'extérieur", whyItHurtsEn: "Popular area, manageable pain on outer side" },
  { id: "forearm-right", path: "M 202,224 L 240,224 L 246,278 L 212,278 Z", painLevel: 2, nameFr: "Avant-bras droit", nameEn: "Right forearm", healingDays: 10, sessionHours: "2-4h", whyItHurtsFr: "Zone populaire, douleur gérable sur l'extérieur", whyItHurtsEn: "Popular area, manageable pain on outer side" },
  { id: "wrist-left", path: "M 50,281 L 88,281 L 83,301 L 45,301 Z", painLevel: 4, nameFr: "Poignet gauche", nameEn: "Left wrist", healingDays: 14, sessionHours: "1-2h", whyItHurtsFr: "Os et tendons proches de la surface, peau fine", whyItHurtsEn: "Bones and tendons close to surface, thin skin" },
  { id: "wrist-right", path: "M 212,281 L 250,281 L 255,301 L 217,301 Z", painLevel: 4, nameFr: "Poignet droit", nameEn: "Right wrist", healingDays: 14, sessionHours: "1-2h", whyItHurtsFr: "Os et tendons proches de la surface, peau fine", whyItHurtsEn: "Bones and tendons close to surface, thin skin" },
  { id: "hand-left", path: "M 41,304 L 83,304 L 78,345 L 36,345 Z", painLevel: 5, nameFr: "Main gauche", nameEn: "Left hand", healingDays: 21, sessionHours: "2-4h", whyItHurtsFr: "Nombreux os et nerfs, peau fine, s'estompe plus vite", whyItHurtsEn: "Many bones and nerves, thin skin, fades faster" },
  { id: "hand-right", path: "M 217,304 L 259,304 L 264,345 L 222,345 Z", painLevel: 5, nameFr: "Main droite", nameEn: "Right hand", healingDays: 21, sessionHours: "2-4h", whyItHurtsFr: "Nombreux os et nerfs, peau fine, s'estompe plus vite", whyItHurtsEn: "Many bones and nerves, thin skin, fades faster" },

  // Legs
  { id: "hip-left", path: "M 118,261 L 135,261 L 135,278 L 113,278 Z", painLevel: 3, nameFr: "Hanche gauche", nameEn: "Left hip", healingDays: 14, sessionHours: "2-3h", whyItHurtsFr: "Sensibilité variable selon la proximité de l'os", whyItHurtsEn: "Sensitivity varies based on bone proximity" },
  { id: "hip-right", path: "M 165,261 L 182,261 L 187,278 L 165,278 Z", painLevel: 3, nameFr: "Hanche droite", nameEn: "Right hip", healingDays: 14, sessionHours: "2-3h", whyItHurtsFr: "Sensibilité variable selon la proximité de l'os", whyItHurtsEn: "Sensitivity varies based on bone proximity" },
  { id: "thigh-left", path: "M 113,281 L 138,281 L 133,358 L 108,358 Z", painLevel: 2, nameFr: "Cuisse gauche", nameEn: "Left thigh", healingDays: 10, sessionHours: "4-6h", whyItHurtsFr: "Grande surface charnue, parfait pour grandes pièces", whyItHurtsEn: "Large fleshy surface, perfect for big pieces" },
  { id: "thigh-right", path: "M 162,281 L 187,281 L 192,358 L 167,358 Z", painLevel: 2, nameFr: "Cuisse droite", nameEn: "Right thigh", healingDays: 10, sessionHours: "4-6h", whyItHurtsFr: "Grande surface charnue, parfait pour grandes pièces", whyItHurtsEn: "Large fleshy surface, perfect for big pieces" },
  { id: "inner-thigh-left", path: "M 141,281 L 148,281 L 148,358 L 136,358 Z", painLevel: 4, nameFr: "Intérieur cuisse G", nameEn: "Left inner thigh", healingDays: 14, sessionHours: "2-3h", whyItHurtsFr: "Zone très sensible avec peau fine et nerfs", whyItHurtsEn: "Very sensitive area with thin skin and nerves" },
  { id: "inner-thigh-right", path: "M 152,281 L 159,281 L 164,358 L 152,358 Z", painLevel: 4, nameFr: "Intérieur cuisse D", nameEn: "Right inner thigh", healingDays: 14, sessionHours: "2-3h", whyItHurtsFr: "Zone très sensible avec peau fine et nerfs", whyItHurtsEn: "Very sensitive area with thin skin and nerves" },
  { id: "knee-left", path: "M 108,361 L 145,361 L 143,393 L 106,393 Z", painLevel: 5, nameFr: "Genou gauche", nameEn: "Left knee", healingDays: 21, sessionHours: "2-3h", whyItHurtsFr: "Articulation osseuse, mouvement constant ralentit la guérison", whyItHurtsEn: "Bony joint, constant movement slows healing" },
  { id: "knee-right", path: "M 155,361 L 192,361 L 194,393 L 157,393 Z", painLevel: 5, nameFr: "Genou droit", nameEn: "Right knee", healingDays: 21, sessionHours: "2-3h", whyItHurtsFr: "Articulation osseuse, mouvement constant ralentit la guérison", whyItHurtsEn: "Bony joint, constant movement slows healing" },
  { id: "shin-left", path: "M 106,396 L 143,396 L 138,458 L 110,458 Z", painLevel: 4, nameFr: "Tibia gauche", nameEn: "Left shin", healingDays: 14, sessionHours: "2-4h", whyItHurtsFr: "Os directement sous la peau, vibrations ressenties", whyItHurtsEn: "Bone directly under skin, vibrations felt" },
  { id: "shin-right", path: "M 157,396 L 194,396 L 190,458 L 162,458 Z", painLevel: 4, nameFr: "Tibia droit", nameEn: "Right shin", healingDays: 14, sessionHours: "2-4h", whyItHurtsFr: "Os directement sous la peau, vibrations ressenties", whyItHurtsEn: "Bone directly under skin, vibrations felt" },
  { id: "ankle-left", path: "M 110,461 L 138,461 L 135,481 L 113,481 Z", painLevel: 4, nameFr: "Cheville gauche", nameEn: "Left ankle", healingDays: 21, sessionHours: "1-2h", whyItHurtsFr: "Os saillant, frottement des chaussures ralentit la guérison", whyItHurtsEn: "Protruding bone, shoe friction slows healing" },
  { id: "ankle-right", path: "M 162,461 L 190,461 L 187,481 L 165,481 Z", painLevel: 4, nameFr: "Cheville droite", nameEn: "Right ankle", healingDays: 21, sessionHours: "1-2h", whyItHurtsFr: "Os saillant, frottement des chaussures ralentit la guérison", whyItHurtsEn: "Protruding bone, shoe friction slows healing" },
  { id: "foot-left", path: "M 108,484 L 140,484 L 145,515 L 103,515 Z", painLevel: 5, nameFr: "Pied gauche", nameEn: "Left foot", healingDays: 28, sessionHours: "2-4h", whyItHurtsFr: "Nombreux os et nerfs, s'estompe vite, guérison difficile", whyItHurtsEn: "Many bones and nerves, fades fast, difficult healing" },
  { id: "foot-right", path: "M 160,484 L 192,484 L 197,515 L 155,515 Z", painLevel: 5, nameFr: "Pied droit", nameEn: "Right foot", healingDays: 28, sessionHours: "2-4h", whyItHurtsFr: "Nombreux os et nerfs, s'estompe vite, guérison difficile", whyItHurtsEn: "Many bones and nerves, fades fast, difficult healing" },
];

const bodyZonesBack: BodyZone[] = [
  // Head & Neck
  { id: "head-back", path: "M 150,28 Q 128,28 123,50 Q 118,77 129,93 Q 140,107 150,107 Q 160,107 171,93 Q 182,77 177,50 Q 172,28 150,28 Z", painLevel: 5, nameFr: "Arrière tête", nameEn: "Back of head", healingDays: 21, sessionHours: "2-3h", whyItHurtsFr: "Peau fine sur le crâne, sensibilité élevée", whyItHurtsEn: "Thin skin on skull, high sensitivity" },
  { id: "neck-back", path: "M 138,110 L 162,110 L 167,132 L 133,132 Z", painLevel: 5, nameFr: "Nuque", nameEn: "Nape", healingDays: 14, sessionHours: "1-2h", whyItHurtsFr: "Colonne vertébrale proche, beaucoup de nerfs", whyItHurtsEn: "Spine nearby, many nerves" },

  // Back
  { id: "upper-back-left", path: "M 113,135 L 142,135 L 142,178 L 108,178 Z", painLevel: 2, nameFr: "Haut du dos G", nameEn: "Upper back left", healingDays: 10, sessionHours: "3-5h", whyItHurtsFr: "Bonne couche musculaire, zone populaire", whyItHurtsEn: "Good muscle layer, popular area" },
  { id: "upper-back-right", path: "M 158,135 L 187,135 L 192,178 L 158,178 Z", painLevel: 2, nameFr: "Haut du dos D", nameEn: "Upper back right", healingDays: 10, sessionHours: "3-5h", whyItHurtsFr: "Bonne couche musculaire, zone populaire", whyItHurtsEn: "Good muscle layer, popular area" },
  { id: "spine-upper", path: "M 145,135 L 155,135 L 155,198 L 145,198 Z", painLevel: 5, nameFr: "Colonne (haut)", nameEn: "Upper spine", healingDays: 21, sessionHours: "1-2h", whyItHurtsFr: "Directement sur les vertèbres, très sensible", whyItHurtsEn: "Directly on vertebrae, very sensitive" },
  { id: "mid-back-left", path: "M 108,181 L 142,181 L 142,228 L 113,228 Z", painLevel: 2, nameFr: "Milieu dos G", nameEn: "Mid back left", healingDays: 10, sessionHours: "3-5h", whyItHurtsFr: "Zone charnue et tolerable", whyItHurtsEn: "Fleshy and tolerable area" },
  { id: "mid-back-right", path: "M 158,181 L 192,181 L 187,228 L 158,228 Z", painLevel: 2, nameFr: "Milieu dos D", nameEn: "Mid back right", healingDays: 10, sessionHours: "3-5h", whyItHurtsFr: "Zone charnue et tolerable", whyItHurtsEn: "Fleshy and tolerable area" },
  { id: "spine-mid", path: "M 145,201 L 155,201 L 155,248 L 145,248 Z", painLevel: 5, nameFr: "Colonne (milieu)", nameEn: "Mid spine", healingDays: 21, sessionHours: "1-2h", whyItHurtsFr: "Os et nerfs de la colonne vertébrale", whyItHurtsEn: "Spine bones and nerves" },
  { id: "lower-back-left", path: "M 118,231 L 142,231 L 142,268 L 123,268 Z", painLevel: 3, nameFr: "Bas du dos G", nameEn: "Lower back left", healingDays: 14, sessionHours: "2-4h", whyItHurtsFr: "Sensibilité modérée, attention près de la colonne", whyItHurtsEn: "Moderate sensitivity, careful near spine" },
  { id: "lower-back-right", path: "M 158,231 L 182,231 L 177,268 L 158,268 Z", painLevel: 3, nameFr: "Bas du dos D", nameEn: "Lower back right", healingDays: 14, sessionHours: "2-4h", whyItHurtsFr: "Sensibilité modérée, attention près de la colonne", whyItHurtsEn: "Moderate sensitivity, careful near spine" },
  { id: "spine-lower", path: "M 145,251 L 155,251 L 155,278 L 145,278 Z", painLevel: 5, nameFr: "Colonne (bas)", nameEn: "Lower spine", healingDays: 21, sessionHours: "1-2h", whyItHurtsFr: "Vertèbres lombaires sensibles", whyItHurtsEn: "Sensitive lumbar vertebrae" },

  // Arms back
  { id: "shoulder-back-left", path: "M 108,135 Q 82,142 75,158 L 93,158 L 108,142 Z", painLevel: 2, nameFr: "Épaule arrière G", nameEn: "Left back shoulder", healingDays: 10, sessionHours: "2-4h", whyItHurtsFr: "Zone musclée, bien tolérée", whyItHurtsEn: "Muscular area, well tolerated" },
  { id: "shoulder-back-right", path: "M 192,135 Q 218,142 225,158 L 207,158 L 192,142 Z", painLevel: 2, nameFr: "Épaule arrière D", nameEn: "Right back shoulder", healingDays: 10, sessionHours: "2-4h", whyItHurtsFr: "Zone musclée, bien tolérée", whyItHurtsEn: "Muscular area, well tolerated" },
  { id: "tricep-left", path: "M 75,161 L 98,161 L 93,208 L 70,208 Z", painLevel: 2, nameFr: "Triceps gauche", nameEn: "Left tricep", healingDays: 10, sessionHours: "2-4h", whyItHurtsFr: "Zone charnue, excellente pour un premier tatouage", whyItHurtsEn: "Fleshy area, excellent for first tattoo" },
  { id: "tricep-right", path: "M 202,161 L 225,161 L 230,208 L 207,208 Z", painLevel: 2, nameFr: "Triceps droit", nameEn: "Right tricep", healingDays: 10, sessionHours: "2-4h", whyItHurtsFr: "Zone charnue, excellente pour un premier tatouage", whyItHurtsEn: "Fleshy area, excellent for first tattoo" },
  { id: "back-elbow-left", path: "M 66,211 L 93,211 L 91,231 L 64,231 Z", painLevel: 5, nameFr: "Coude arrière G", nameEn: "Left back elbow", healingDays: 21, sessionHours: "1-2h", whyItHurtsFr: "Peau lâche sur l'os, guérison lente", whyItHurtsEn: "Loose skin over bone, slow healing" },
  { id: "back-elbow-right", path: "M 207,211 L 234,211 L 236,231 L 209,231 Z", painLevel: 5, nameFr: "Coude arrière D", nameEn: "Right back elbow", healingDays: 21, sessionHours: "1-2h", whyItHurtsFr: "Peau lâche sur l'os, guérison lente", whyItHurtsEn: "Loose skin over bone, slow healing" },
  { id: "back-forearm-left", path: "M 60,234 L 91,234 L 85,278 L 54,278 Z", painLevel: 2, nameFr: "Avant-bras arr. G", nameEn: "Left back forearm", healingDays: 10, sessionHours: "2-4h", whyItHurtsFr: "Douleur légère, guérit rapidement", whyItHurtsEn: "Light pain, heals quickly" },
  { id: "back-forearm-right", path: "M 209,234 L 240,234 L 246,278 L 215,278 Z", painLevel: 2, nameFr: "Avant-bras arr. D", nameEn: "Right back forearm", healingDays: 10, sessionHours: "2-4h", whyItHurtsFr: "Douleur légère, guérit rapidement", whyItHurtsEn: "Light pain, heals quickly" },
  { id: "back-wrist-left", path: "M 50,281 L 85,281 L 81,301 L 46,301 Z", painLevel: 4, nameFr: "Poignet arr. G", nameEn: "Left back wrist", healingDays: 14, sessionHours: "1-2h", whyItHurtsFr: "Os et tendons proches", whyItHurtsEn: "Bones and tendons nearby" },
  { id: "back-wrist-right", path: "M 215,281 L 250,281 L 254,301 L 219,301 Z", painLevel: 4, nameFr: "Poignet arr. D", nameEn: "Right back wrist", healingDays: 14, sessionHours: "1-2h", whyItHurtsFr: "Os et tendons proches", whyItHurtsEn: "Bones and tendons nearby" },
  { id: "back-hand-left", path: "M 42,304 L 81,304 L 77,345 L 38,345 Z", painLevel: 5, nameFr: "Main arr. G", nameEn: "Left back hand", healingDays: 21, sessionHours: "2-4h", whyItHurtsFr: "Os et nerfs nombreux, s'estompe", whyItHurtsEn: "Many bones and nerves, fades" },
  { id: "back-hand-right", path: "M 219,304 L 258,304 L 262,345 L 223,345 Z", painLevel: 5, nameFr: "Main arr. D", nameEn: "Right back hand", healingDays: 21, sessionHours: "2-4h", whyItHurtsFr: "Os et nerfs nombreux, s'estompe", whyItHurtsEn: "Many bones and nerves, fades" },

  // Glutes & Legs
  { id: "glute-left", path: "M 118,271 L 148,271 L 148,308 L 113,308 Z", painLevel: 1, nameFr: "Fesse gauche", nameEn: "Left glute", healingDays: 10, sessionHours: "3-5h", whyItHurtsFr: "Zone la plus charnue du corps, très peu douloureux", whyItHurtsEn: "Fleshiest area of body, very low pain" },
  { id: "glute-right", path: "M 152,271 L 182,271 L 187,308 L 152,308 Z", painLevel: 1, nameFr: "Fesse droite", nameEn: "Right glute", healingDays: 10, sessionHours: "3-5h", whyItHurtsFr: "Zone la plus charnue du corps, très peu douloureux", whyItHurtsEn: "Fleshiest area of body, very low pain" },
  { id: "back-thigh-left", path: "M 110,311 L 148,311 L 143,368 L 106,368 Z", painLevel: 2, nameFr: "Arrière cuisse G", nameEn: "Left hamstring", healingDays: 10, sessionHours: "3-5h", whyItHurtsFr: "Zone musclée, bonne tolérance", whyItHurtsEn: "Muscular area, good tolerance" },
  { id: "back-thigh-right", path: "M 152,311 L 190,311 L 194,368 L 157,368 Z", painLevel: 2, nameFr: "Arrière cuisse D", nameEn: "Right hamstring", healingDays: 10, sessionHours: "3-5h", whyItHurtsFr: "Zone musclée, bonne tolérance", whyItHurtsEn: "Muscular area, good tolerance" },
  { id: "back-knee-left", path: "M 106,371 L 143,371 L 140,396 L 108,396 Z", painLevel: 4, nameFr: "Arrière genou G", nameEn: "Left back knee", healingDays: 21, sessionHours: "1-2h", whyItHurtsFr: "Creux sensible avec nerfs et vaisseaux", whyItHurtsEn: "Sensitive hollow with nerves and vessels" },
  { id: "back-knee-right", path: "M 157,371 L 194,371 L 192,396 L 160,396 Z", painLevel: 4, nameFr: "Arrière genou D", nameEn: "Right back knee", healingDays: 21, sessionHours: "1-2h", whyItHurtsFr: "Creux sensible avec nerfs et vaisseaux", whyItHurtsEn: "Sensitive hollow with nerves and vessels" },
  { id: "back-calf-left", path: "M 108,399 L 140,399 L 135,458 L 113,458 Z", painLevel: 2, nameFr: "Mollet arrière G", nameEn: "Left back calf", healingDays: 10, sessionHours: "2-4h", whyItHurtsFr: "Muscle charnu, bien toléré", whyItHurtsEn: "Fleshy muscle, well tolerated" },
  { id: "back-calf-right", path: "M 160,399 L 192,399 L 187,458 L 165,458 Z", painLevel: 2, nameFr: "Mollet arrière D", nameEn: "Right back calf", healingDays: 10, sessionHours: "2-4h", whyItHurtsFr: "Muscle charnu, bien toléré", whyItHurtsEn: "Fleshy muscle, well tolerated" },
  { id: "achilles-left", path: "M 116,461 L 134,461 L 132,488 L 118,488 Z", painLevel: 5, nameFr: "Tendon d'Achille G", nameEn: "Left Achilles", healingDays: 28, sessionHours: "1-2h", whyItHurtsFr: "Tendon sensible, peu de chair, guérison lente", whyItHurtsEn: "Sensitive tendon, little flesh, slow healing" },
  { id: "achilles-right", path: "M 166,461 L 184,461 L 182,488 L 168,488 Z", painLevel: 5, nameFr: "Tendon d'Achille D", nameEn: "Right Achilles", healingDays: 28, sessionHours: "1-2h", whyItHurtsFr: "Tendon sensible, peu de chair, guérison lente", whyItHurtsEn: "Sensitive tendon, little flesh, slow healing" },
  { id: "heel-left", path: "M 113,491 L 137,491 L 140,515 L 110,515 Z", painLevel: 5, nameFr: "Talon gauche", nameEn: "Left heel", healingDays: 28, sessionHours: "1-2h", whyItHurtsFr: "Os du talon, frottement constant", whyItHurtsEn: "Heel bone, constant friction" },
  { id: "heel-right", path: "M 163,491 L 187,491 L 190,515 L 160,515 Z", painLevel: 5, nameFr: "Talon droit", nameEn: "Right heel", healingDays: 28, sessionHours: "1-2h", whyItHurtsFr: "Os du talon, frottement constant", whyItHurtsEn: "Heel bone, constant friction" },
];

function getPainColor(level: number): string {
  switch (level) {
    case 1: return "#22c55e";
    case 2: return "#84cc16";
    case 3: return "#eab308";
    case 4: return "#f97316";
    case 5: return "#ef4444";
    default: return "#6b7280";
  }
}

function getPainLabel(level: number, language: string): string {
  const labels = {
    fr: { 1: "Très supportable", 2: "Supportable", 3: "Modéré", 4: "Douloureux", 5: "Très douloureux" },
    en: { 1: "Very bearable", 2: "Bearable", 3: "Moderate", 4: "Painful", 5: "Very painful" },
  };
  return labels[language as keyof typeof labels]?.[level as keyof typeof labels.fr] || "";
}

function getToughnessLabel(score: number, language: string): { title: string; description: string; emoji: string } {
  const labels = {
    fr: [
      { title: "Guerrier/Guerrière", emoji: "🏆", description: "Tu n'as peur de rien! Les zones les plus douloureuses ne t'effraient pas." },
      { title: "Courageux/Courageuse", emoji: "💪", description: "Tu as une bonne tolérance à la douleur. Prêt(e) pour de beaux projets!" },
      { title: "Équilibré(e)", emoji: "⚖️", description: "Tu sais ce que tu veux et tu connais tes limites. C'est très sage!" },
      { title: "Prudent(e)", emoji: "🌱", description: "Tu préfères les zones plus douces. Parfait pour commencer!" },
    ],
    en: [
      { title: "Warrior", emoji: "🏆", description: "You fear nothing! The most painful areas don't scare you." },
      { title: "Brave", emoji: "💪", description: "You have good pain tolerance. Ready for beautiful projects!" },
      { title: "Balanced", emoji: "⚖️", description: "You know what you want and your limits. Very wise!" },
      { title: "Careful", emoji: "🌱", description: "You prefer gentler areas. Perfect for starting out!" },
    ],
  };
  const l = labels[language as keyof typeof labels] || labels.fr;
  if (score >= 80) return l[0];
  if (score >= 50) return l[1];
  if (score >= 30) return l[2];
  return l[3];
}

export default function PainMapPage() {
  const { language } = useLanguage();
  const [view, setView] = useState<"front" | "back">("front");
  const [hoveredZone, setHoveredZone] = useState<BodyZone | null>(null);
  const [quizMode, setQuizMode] = useState(false);
  const [selectedZones, setSelectedZones] = useState<Set<string>>(new Set());
  const [showResults, setShowResults] = useState(false);

  const zones = view === "front" ? bodyZonesFront : bodyZonesBack;
  const allZones = [...bodyZonesFront, ...bodyZonesBack];

  const quizScore = useMemo(() => {
    if (selectedZones.size === 0) return 0;
    let totalPain = 0;
    selectedZones.forEach((id) => {
      const zone = allZones.find((z) => z.id === id);
      if (zone) totalPain += zone.painLevel;
    });
    return Math.round((totalPain / (selectedZones.size * 5)) * 100);
  }, [selectedZones, allZones]);

  const handleZoneClick = (zone: BodyZone) => {
    // Always show zone info on click (for mobile)
    setHoveredZone(zone);

    if (quizMode) {
      const newSelected = new Set(selectedZones);
      if (newSelected.has(zone.id)) {
        newSelected.delete(zone.id);
      } else {
        newSelected.add(zone.id);
      }
      setSelectedZones(newSelected);
    }
  };

  const resetQuiz = () => {
    setSelectedZones(new Set());
    setShowResults(false);
  };

  // Generate Instagram Story image
  const generateStoryImage = (): Promise<Blob> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      // Instagram Story dimensions (9:16 ratio)
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext("2d")!;

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#0a0a0a");
      gradient.addColorStop(0.5, "#1a1a2e");
      gradient.addColorStop(1, "#0a0a0a");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Decorative circles
      ctx.beginPath();
      ctx.arc(100, 300, 200, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(234, 179, 8, 0.1)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(980, 1600, 250, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(234, 179, 8, 0.08)";
      ctx.fill();

      const toughnessResult = getToughnessLabel(quizScore, language);
      const t = language === "fr" ? {
        title: "Ma tolérance",
        subtitle: "à la douleur",
        cta: "Teste la tienne!",
        site: "matha.tattoo/painmap"
      } : {
        title: "My pain",
        subtitle: "tolerance",
        cta: "Test yours!",
        site: "matha.tattoo/painmap"
      };

      // Title
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 64px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(t.title, canvas.width / 2, 350);
      ctx.fillText(t.subtitle, canvas.width / 2, 430);

      // Big emoji
      ctx.font = "200px system-ui, sans-serif";
      ctx.fillText(toughnessResult.emoji, canvas.width / 2, 700);

      // Score
      ctx.font = "bold 180px system-ui, sans-serif";
      const scoreGradient = ctx.createLinearGradient(340, 800, 740, 1000);
      scoreGradient.addColorStop(0, "#fbbf24");
      scoreGradient.addColorStop(1, "#f59e0b");
      ctx.fillStyle = scoreGradient;
      ctx.fillText(`${quizScore}%`, canvas.width / 2, 950);

      // Toughness title
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 72px system-ui, sans-serif";
      ctx.fillText(toughnessResult.title, canvas.width / 2, 1100);

      // Description
      ctx.fillStyle = "#9ca3af";
      ctx.font = "36px system-ui, sans-serif";
      const words = toughnessResult.description.split(" ");
      let line = "";
      let y = 1180;
      for (const word of words) {
        const testLine = line + word + " ";
        if (ctx.measureText(testLine).width > 900) {
          ctx.fillText(line.trim(), canvas.width / 2, y);
          line = word + " ";
          y += 50;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line.trim(), canvas.width / 2, y);

      // CTA button
      const btnY = 1450;
      ctx.beginPath();
      ctx.roundRect(290, btnY - 40, 500, 80, 40);
      const btnGradient = ctx.createLinearGradient(290, btnY, 790, btnY);
      btnGradient.addColorStop(0, "#fbbf24");
      btnGradient.addColorStop(1, "#f59e0b");
      ctx.fillStyle = btnGradient;
      ctx.fill();
      ctx.fillStyle = "#0a0a0a";
      ctx.font = "bold 36px system-ui, sans-serif";
      ctx.fillText(t.cta, canvas.width / 2, btnY + 12);

      // Website
      ctx.fillStyle = "#fbbf24";
      ctx.font = "bold 48px system-ui, sans-serif";
      ctx.fillText(t.site, canvas.width / 2, 1650);

      // Logo/Brand
      ctx.fillStyle = "#6b7280";
      ctx.font = "28px system-ui, sans-serif";
      ctx.fillText("MATHA TATTOO", canvas.width / 2, 1800);

      canvas.toBlob((blob) => resolve(blob!), "image/png", 1);
    });
  };

  const handleDownloadStory = async () => {
    const blob = await generateStoryImage();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pain-tolerance-${quizScore}percent.png`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const blob = await generateStoryImage();
    const file = new File([blob], "pain-tolerance.png", { type: "image/png" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: language === "fr" ? "Ma tolérance à la douleur" : "My pain tolerance",
        });
      } catch {
        // User cancelled - fallback to download
        handleDownloadStory();
      }
    } else {
      // Fallback: download the image
      handleDownloadStory();
    }
  };

  const content = {
    fr: {
      title: "Carte de la Douleur",
      subtitle: "Découvrez le niveau de douleur de chaque zone et testez votre tolérance",
      front: "Avant",
      back: "Arrière",
      startQuiz: "Teste ta tolérance",
      quizInstructions: "Clique sur les zones où tu serais prêt(e) à te faire tatouer",
      seeResults: "Voir mon résultat",
      yourScore: "Ton score",
      share: "Partager",
      restart: "Recommencer",
      exitQuiz: "Quitter le quiz",
      healingTime: "Guérison",
      sessionTime: "Séance",
      whyItHurts: "Pourquoi",
      days: "jours",
      cta: "Prêt(e) à réserver?",
      ctaButton: "Contactez-moi",
      tip: "J'offre de la crème anesthésiante à mon studio pour votre confort!",
      selectZone: "Sélectionne une zone pour voir les détails",
      quizPrompt: "Clique sur les zones où tu oserais te faire tatouer!",
      zonesSelected: "zones sélectionnées",
      zoneSelected: "zone sélectionnée",
      shareStory: "Partager",
      downloadImage: "Télécharger",
      storyTitle: "Ma tolérance à la douleur",
      storySubtitle: "Teste la tienne!",
      shareTip: "Ajoute un sticker lien vers matha.tattoo/painmap!",
    },
    en: {
      title: "Pain Map",
      subtitle: "Discover the pain level of each zone and test your tolerance",
      front: "Front",
      back: "Back",
      startQuiz: "Test your tolerance",
      quizInstructions: "Click on zones where you'd be willing to get tattooed",
      seeResults: "See my result",
      yourScore: "Your score",
      share: "Share",
      restart: "Restart",
      exitQuiz: "Exit quiz",
      healingTime: "Healing",
      sessionTime: "Session",
      whyItHurts: "Why",
      days: "days",
      cta: "Ready to book?",
      ctaButton: "Contact me",
      tip: "I offer numbing cream at my studio for your comfort!",
      selectZone: "Select a zone to see details",
      quizPrompt: "Tap zones where you'd dare to get tattooed!",
      zonesSelected: "zones selected",
      zoneSelected: "zone selected",
      shareStory: "Share",
      downloadImage: "Download",
      storyTitle: "My pain tolerance",
      storySubtitle: "Test yours!",
      shareTip: "Add a link sticker to matha.tattoo/painmap!",
    },
  };

  const t = content[language as keyof typeof content] || content.fr;
  const toughness = getToughnessLabel(quizScore, language);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ink-900 pt-24 pb-16">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent mb-4"
          >
            {t.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Subtle Quiz Toggle */}
        {quizMode && (
          <div className="max-w-4xl mx-auto px-4 mb-4">
            <div className="flex justify-center">
              <button
                onClick={() => { setQuizMode(false); resetQuiz(); }}
                className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
              >
                {t.exitQuiz}
              </button>
            </div>
          </div>
        )}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* View toggle - above grid for alignment */}
          <div className="flex justify-center lg:justify-start gap-2 mb-6">
            <button
              onClick={() => setView("front")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                view === "front" ? "bg-gold-500 text-ink-900" : "bg-ink-700 text-gray-300 hover:bg-ink-600"
              }`}
            >
              {t.front}
            </button>
            <button
              onClick={() => setView("back")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                view === "back" ? "bg-gold-500 text-ink-900" : "bg-ink-700 text-gray-300 hover:bg-ink-600"
              }`}
            >
              {t.back}
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Body visualization */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              {/* SVG Container */}
              <div className="bg-ink-900/50 rounded-2xl p-6 border border-ink-700">
                <svg viewBox="0 0 320 530" className="w-full h-full max-h-[500px]">
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  {zones.map((zone) => {
                    const isSelected = selectedZones.has(zone.id);
                    const isHovered = hoveredZone?.id === zone.id;
                    return (
                      <path
                        key={zone.id}
                        d={zone.path}
                        fill={quizMode && isSelected ? "#fbbf24" : getPainColor(zone.painLevel)}
                        fillOpacity={isHovered ? 0.9 : quizMode && isSelected ? 0.9 : 0.6}
                        stroke={isHovered || isSelected ? "#fff" : getPainColor(zone.painLevel)}
                        strokeWidth={isHovered || isSelected ? 2 : 1}
                        className="cursor-pointer transition-all duration-200 touch-none"
                        filter={isHovered ? "url(#glow)" : undefined}
                        onMouseEnter={() => setHoveredZone(zone)}
                        onMouseLeave={() => setHoveredZone(null)}
                        onClick={() => handleZoneClick(zone)}
                        onTouchStart={(e) => { e.preventDefault(); handleZoneClick(zone); }}
                      />
                    );
                  })}
                </svg>
              </div>

            </motion.div>

            {/* Info panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <AnimatePresence mode="wait">
                {showResults ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-ink-800/50 rounded-2xl p-8 border border-gold-500/30 text-center"
                  >
                    <div className="text-6xl mb-4">{toughness.emoji}</div>
                    <h3 className="text-3xl font-display font-bold text-white mb-2">{toughness.title}</h3>
                    <div className="text-5xl font-bold text-gold-400 mb-4">{quizScore}%</div>
                    <p className="text-gray-300 mb-6">{toughness.description}</p>
                    <div className="flex flex-col gap-4">
                      {/* Share buttons */}
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={handleShare}
                          className="flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-ink-900 font-semibold px-5 py-2.5 rounded-full"
                        >
                          <FaInstagram className="w-4 h-4" />
                          <FaFacebook className="w-4 h-4" />
                          {t.shareStory}
                        </button>
                        <button
                          onClick={handleDownloadStory}
                          className="flex items-center gap-2 bg-ink-700 text-gray-300 px-4 py-2.5 rounded-full hover:bg-ink-600"
                          title={t.downloadImage}
                        >
                          <FiDownload className="w-4 h-4" />
                        </button>
                      </div>
                      {/* Tip about link sticker */}
                      <p className="text-xs text-gray-500">{t.shareTip}</p>
                      <button
                        onClick={resetQuiz}
                        className="flex items-center justify-center gap-2 text-gray-400 hover:text-gray-200 transition-colors text-sm"
                      >
                        <FiRotateCcw className="w-4 h-4" />
                        {t.restart}
                      </button>
                    </div>
                  </motion.div>
                ) : hoveredZone ? (
                  <motion.div
                    key="zone-info"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-ink-800/50 rounded-2xl p-6 border border-ink-700"
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

                    {/* Pain level dots */}
                    <div className="flex justify-center gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                            level <= hoveredZone.painLevel ? "text-white scale-110" : "bg-ink-700 text-gray-500"
                          }`}
                          style={{ backgroundColor: level <= hoveredZone.painLevel ? getPainColor(level) : undefined }}
                        >
                          {level}
                        </div>
                      ))}
                    </div>

                    {/* Zone details */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-300">
                        <FiHeart className="w-5 h-5 text-gold-400" />
                        <span className="font-medium">{t.healingTime}:</span>
                        <span>{hoveredZone.healingDays} {t.days}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <FiClock className="w-5 h-5 text-gold-400" />
                        <span className="font-medium">{t.sessionTime}:</span>
                        <span>{hoveredZone.sessionHours}</span>
                      </div>
                      <div className="flex items-start gap-3 text-gray-300">
                        <FiZap className="w-5 h-5 text-gold-400 mt-0.5" />
                        <div>
                          <span className="font-medium">{t.whyItHurts}:</span>
                          <p className="text-sm mt-1">
                            {language === "fr" ? hoveredZone.whyItHurtsFr : hoveredZone.whyItHurtsEn}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : quizMode ? (
                  <motion.div
                    key="quiz-panel"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-ink-800/50 rounded-2xl p-6 border border-gold-500/30 text-center"
                  >
                    <FiZap className="w-10 h-10 text-gold-400 mx-auto mb-3" />
                    <h3 className="text-xl font-display font-semibold text-white mb-2">{t.startQuiz}</h3>
                    <p className="text-gray-400 mb-6">{t.quizInstructions}</p>

                    {selectedZones.size > 0 && (
                      <div className="mb-6">
                        <div className="text-3xl font-bold text-gold-400 mb-1">
                          {selectedZones.size}
                        </div>
                        <div className="text-sm text-gray-400">
                          {selectedZones.size === 1 ? t.zoneSelected : t.zonesSelected}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => setShowResults(true)}
                      disabled={selectedZones.size === 0}
                      className={`flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold transition-all ${
                        selectedZones.size > 0
                          ? "bg-gradient-to-r from-gold-500 to-gold-600 text-ink-900"
                          : "bg-ink-700 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {t.seeResults}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-ink-800/50 rounded-2xl p-6 border border-ink-700"
                  >
                    <div className="text-center text-gray-500 mb-6">
                      <FiInfo className="w-8 h-8 mx-auto mb-2" />
                      <p>{t.selectZone}</p>
                    </div>

                    {/* Subtle quiz CTA */}
                    <div className="border-t border-ink-700 pt-5 mt-4">
                      <button
                        onClick={() => setQuizMode(true)}
                        className="flex items-center justify-center gap-2 w-full text-gold-400 hover:text-gold-300 transition-colors text-sm"
                      >
                        <FiPlay className="w-4 h-4" />
                        {t.startQuiz}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pain level legend */}
              {!showResults && (
                <div className="bg-ink-800/50 rounded-2xl p-6 border border-ink-700">
                  <h4 className="text-lg font-semibold text-white mb-4">
                    {language === "fr" ? "Niveaux de douleur" : "Pain levels"}
                  </h4>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div key={level} className="flex items-center gap-3">
                        <div
                          className="w-6 h-6 rounded-full flex-shrink-0"
                          style={{ backgroundColor: getPainColor(level) }}
                        />
                        <div className="flex-1 h-2 bg-ink-700 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ backgroundColor: getPainColor(level), width: `${level * 20}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-300 w-32 text-right">
                          {getPainLabel(level, language)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tip */}
              <div className="bg-gradient-to-r from-gold-500/10 to-gold-600/10 border border-gold-500/30 rounded-xl p-4 text-center">
                <p className="text-gold-400 font-medium">{t.tip}</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16"
        >
          <div className="bg-gradient-to-r from-gold-500/10 via-gold-400/5 to-gold-500/10 rounded-2xl p-8 border border-gold-500/20 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
              {t.cta}
            </h2>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              {t.tip}
            </p>
            <Link href="/#contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-ink-900 font-semibold px-8 py-4 rounded-full text-lg shadow-lg shadow-gold-500/25"
              >
                {t.ctaButton}
                <FiArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="fixed top-1/4 left-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-1/4 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      </main>
      <Footer />
    </>
  );
}
