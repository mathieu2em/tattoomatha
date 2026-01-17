"use client";

import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import TattooCarousel from "@/components/TattooCarousel";
import SocialFeed from "@/components/SocialFeed";
import PainMap from "@/components/PainMap";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  
  return (
    <main className="min-h-screen bg-ink-900">
      <Navbar />
      <Hero />
      <AboutMe />
      
      {/* Section Carrousel */}
      <section id="featured" className="py-12 md:py-16 bg-gradient-to-b from-ink-900 to-ink-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-3">
              <span className="gradient-text">{t("gallery.title")}</span>
            </h2>
            <p className="text-gray-400 text-lg">{t("gallery.description")}</p>
          </div>
          <TattooCarousel />
        </div>
      </section>
      
      <SocialFeed />
      <PainMap />
      <ContactForm />
      <Footer />
    </main>
  );
}
