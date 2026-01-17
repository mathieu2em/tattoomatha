import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import SocialFeed from "@/components/SocialFeed";
import PainMap from "@/components/PainMap";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-ink-900">
      <Navbar />
      <Hero />
      <AboutMe />
      <SocialFeed />
      <PainMap />
      <ContactForm />
      <Footer />
    </main>
  );
}
