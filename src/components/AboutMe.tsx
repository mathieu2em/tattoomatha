"use client";

import { motion } from "framer-motion";
import { FaPalette, FaCode, FaHeart, FaClock } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutMe() {
  const { language } = useLanguage();

  const content = {
    fr: {
      title1: "À Propos de ",
      title2: "Mathieu",
      intro: "Artiste tatoueur passionné, basé à St-Jean-de-Matha, au cœur de Lanaudière.",
      description: `Je m'appelle Mathieu et je suis artiste tatoueur dans mon studio privé à St-Jean-de-Matha. Je t'accueille dans un environnement calme et personnalisé où je me consacre à 100% à créer une pièce unique, à ton image, avec un grand souci du détail.

Je ne réalise qu'un à deux tatouages par semaine, ce qui me permet de donner toute mon attention à chaque projet. Je tatoue principalement en soirée, car je suis développeur logiciel le jour – un équilibre qui me permet de garder le tatouage comme une véritable passion.`,
      background: "Mon parcours combine un DEC en Arts visuels et un BAC en Informatique. Cette double formation est un atout unique : ma maîtrise des outils technologiques me permet de créer des œuvres d'une précision remarquable, de modéliser les tatouages en 3D et d'explorer des techniques innovantes pour donner vie à ta vision.",
      features: [
        { icon: FaPalette, text: "DEC en Arts Visuels" },
        { icon: FaCode, text: "BAC en Informatique" },
        { icon: FaHeart, text: "Passion avant tout" },
        { icon: FaClock, text: "1-2 tatouages par semaine" },
      ],
    },
    en: {
      title1: "About ",
      title2: "Mathieu",
      intro: "Passionate tattoo artist based in St-Jean-de-Matha, in the heart of Lanaudière.",
      description: `My name is Mathieu and I'm a tattoo artist working from my private studio in St-Jean-de-Matha. I welcome you in a calm, personalized environment where I dedicate 100% of my focus to creating a unique piece that reflects who you are, with meticulous attention to detail.

I only do one to two tattoos per week, allowing me to give my full attention to each project. I tattoo mainly in the evenings since I work as a software developer during the day – a balance that lets me keep tattooing as a true passion.`,
      background: "My background combines a college degree in Visual Arts and a Bachelor's in Computer Science. This unique combination is a real asset: my mastery of technological tools allows me to create remarkably precise artwork, model tattoos in 3D, and explore innovative techniques to bring your vision to life.",
      features: [
        { icon: FaPalette, text: "Visual Arts Degree" },
        { icon: FaCode, text: "Computer Science Bachelor's" },
        { icon: FaHeart, text: "Passion First" },
        { icon: FaClock, text: "1-2 Tattoos Per Week" },
      ],
    },
  };

  const t = content[language];

  return (
    <section id="about" className="py-20 md:py-32 bg-ink-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-gold-400/20 to-gold-600/10 blur-sm" />
              
              {/* Profile image */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-gold-400/30 shadow-2xl shadow-gold-400/10">
                <img
                  src="/profile.jpg"
                  alt="Mathieu Perron - Tatoueur Lanaudière"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative badge */}
              <div className="absolute -bottom-2 -right-2 bg-ink-800 border-2 border-gold-400 rounded-full p-3 shadow-lg">
                <FaPalette className="text-gold-400 text-xl" />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              <span className="text-gray-100">{t.title1}</span>
              <span className="gradient-text">{t.title2}</span>
            </h2>
            
            <p className="text-gold-400 text-lg mb-6">
              {t.intro}
            </p>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              {t.description.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-6 p-4 bg-ink-800/50 rounded-xl border border-gold-400/10">
              <p className="text-gray-300 leading-relaxed text-sm">
                {t.background}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {t.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 p-3 bg-ink-800 rounded-lg border border-ink-600"
                >
                  <feature.icon className="text-gold-400 text-lg flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
