"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-ink-700 rounded-full p-1">
      <button
        onClick={() => setLanguage("fr")}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
          language === "fr"
            ? "bg-gold-400 text-ink-900"
            : "text-gray-400 hover:text-white"
        }`}
      >
        FR
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
          language === "en"
            ? "bg-gold-400 text-ink-900"
            : "text-gray-400 hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
}
