import Hero from "@/components/Hero";
import SocialFeed from "@/components/SocialFeed";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-ink-900">
      <Navbar />
      <Hero />
      <SocialFeed />
      <ContactForm />
      <Footer />
    </main>
  );
}
