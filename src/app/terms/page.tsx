"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function TermsPage() {
  const { language, t } = useLanguage();

  const content = {
    fr: {
      sections: [
        {
          title: "1. Services",
          content: `Mathieu Perron (« nous », « notre ») fournit des services professionnels de tatouage à notre studio situé à St-Jean-de-Matha, Lanaudière, Québec. En prenant rendez-vous ou en utilisant nos services, vous acceptez ces Conditions d'utilisation.`
        },
        {
          title: "2. Exigences d'âge",
          content: `Tous les clients doivent avoir au moins 18 ans. Une pièce d'identité gouvernementale valide avec photo est requise avant tout service de tatouage.`
        },
        {
          title: "3. Réservation et dépôts",
          list: [
            "Un dépôt non remboursable peut être requis pour sécuriser votre rendez-vous",
            "Le dépôt sera appliqué au coût final de votre tatouage",
            "Les annulations doivent être faites au moins 48 heures à l'avance pour reprogrammer",
            "Les absences ou annulations tardives entraîneront la perte du dépôt"
          ]
        },
        {
          title: "4. Santé et sécurité",
          list: [
            "Tout l'équipement est stérile et à usage unique lorsqu'applicable",
            "Vous devez divulguer toute condition médicale, allergie ou médicament",
            "Nous nous réservons le droit de refuser le service si vous semblez intoxiqué ou sous influence",
            "Vous ne devez pas être enceinte ou allaitante",
            "Vous devez suivre toutes les instructions de soins après-tatouage"
          ]
        },
        {
          title: "5. Design et propriété intellectuelle",
          content: `Tous les designs personnalisés créés par Mathieu Perron demeurent la propriété intellectuelle de l'artiste. En recevant un tatouage, vous recevez une licence permanente pour afficher l'œuvre sur votre corps, mais l'artiste conserve les droits de photographier et d'afficher l'œuvre dans son portfolio et ses matériels marketing.`
        },
        {
          title: "6. Retouches et corrections",
          content: `Une séance de retouche complémentaire peut être fournie dans les 3 mois suivant le tatouage initial, sous réserve que les soins appropriés aient été suivis. Les retouches ou corrections supplémentaires peuvent faire l'objet de frais.`
        },
        {
          title: "7. Responsabilité",
          content: `Vous reconnaissez que le tatouage comporte des risques inhérents incluant infection, réaction allergique et cicatrisation. En procédant aux services, vous acceptez de dégager Mathieu Perron de toute responsabilité pour les complications découlant du tatouage, à condition que les protocoles d'hygiène et de sécurité appropriés aient été suivis.`
        },
        {
          title: "8. Paiement",
          content: `Le paiement est dû en totalité à la fin des services. Nous acceptons l'argent comptant, les cartes de crédit et le virement électronique. Les prix sont des estimations et peuvent varier selon le design final et la durée de la séance.`
        },
        {
          title: "9. Politiques du studio",
          list: [
            "Veuillez arriver à l'heure pour votre rendez-vous",
            "Les invités peuvent être limités dans la zone du studio",
            "Le studio est un environnement professionnel - veuillez être respectueux",
            "Nous nous réservons le droit de refuser le service pour toute raison"
          ]
        },
        {
          title: "10. Utilisation du site web",
          content: `Ce site web (matha.tattoo) est à des fins informatives. Les fonctionnalités interactives telles que la carte de la douleur et le quiz sont des outils éducatifs uniquement et ne constituent pas un avis médical. Les niveaux de douleur réels varient selon les individus.`
        },
        {
          title: "11. Modifications des conditions",
          content: `Nous nous réservons le droit de mettre à jour ces Conditions d'utilisation à tout moment. L'utilisation continue de nos services constitue l'acceptation de tout changement.`
        },
        {
          title: "12. Contact",
          content: `Pour toute question concernant ces Conditions d'utilisation, veuillez nous contacter via le formulaire de contact sur ce site web ou via nos réseaux sociaux.`
        }
      ]
    },
    en: {
      sections: [
        {
          title: "1. Services",
          content: `Mathieu Perron ("we," "us," or "our") provides professional tattoo artistry services at our studio in St-Jean-de-Matha, Lanaudière, Quebec. By booking an appointment or using our services, you agree to these Terms of Service.`
        },
        {
          title: "2. Age Requirements",
          content: `All clients must be at least 18 years of age. Valid government-issued photo identification is required before any tattoo service can be provided.`
        },
        {
          title: "3. Booking and Deposits",
          list: [
            "A non-refundable deposit may be required to secure your appointment",
            "The deposit will be applied to the final cost of your tattoo",
            "Cancellations must be made at least 48 hours in advance to reschedule",
            "No-shows or late cancellations will result in forfeiture of the deposit"
          ]
        },
        {
          title: "4. Health and Safety",
          list: [
            "All equipment is sterile and single-use when applicable",
            "You must disclose any medical conditions, allergies, or medications",
            "We reserve the right to refuse service if you appear intoxicated or under the influence",
            "You must not be pregnant or nursing",
            "You must follow all provided aftercare instructions"
          ]
        },
        {
          title: "5. Design and Intellectual Property",
          content: `All custom designs created by Mathieu Perron remain the intellectual property of the artist. By receiving a tattoo, you receive a permanent license to display the artwork on your body, but the artist retains rights to photograph and display the work in their portfolio and marketing materials.`
        },
        {
          title: "6. Touch-Ups and Corrections",
          content: `One complimentary touch-up session may be provided within 3 months of the initial tattoo, subject to proper aftercare having been followed. Additional touch-ups or corrections may be subject to fees.`
        },
        {
          title: "7. Liability",
          content: `You acknowledge that tattooing involves inherent risks including infection, allergic reaction, and scarring. By proceeding with services, you agree to hold Mathieu Perron harmless from any complications arising from the tattoo, provided proper hygiene and safety protocols were followed.`
        },
        {
          title: "8. Payment",
          content: `Payment is due in full upon completion of services. We accept cash, credit cards, and e-transfer. Prices are estimates and may vary based on the final design and session length.`
        },
        {
          title: "9. Studio Policies",
          list: [
            "Please arrive on time for your appointment",
            "Guests may be limited in the studio area",
            "The studio is a professional environment - please be respectful",
            "We reserve the right to refuse service for any reason"
          ]
        },
        {
          title: "10. Website Use",
          content: `This website (matha.tattoo) is for informational purposes. Interactive features such as the pain map and quiz are educational tools only and do not constitute medical advice. Actual pain levels vary by individual.`
        },
        {
          title: "11. Changes to Terms",
          content: `We reserve the right to update these Terms of Service at any time. Continued use of our services constitutes acceptance of any changes.`
        },
        {
          title: "12. Contact",
          content: `For questions about these Terms of Service, please contact us through the contact form on this website or via our social media channels.`
        }
      ]
    }
  };

  const currentContent = content[language as keyof typeof content] || content.fr;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ink-900 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
            {t("legal.terms.title")}
          </h1>

          <div className="space-y-6 text-gray-300">
            <p className="text-sm text-gray-400">
              {t("legal.lastUpdated")}: {language === "fr" ? "Janvier 2026" : "January 2026"}
            </p>

            {currentContent.sections.map((section, index) => (
              <section key={index}>
                <h2 className="text-2xl font-semibold text-white mb-4">{section.title}</h2>
                {section.content && <p className="leading-relaxed">{section.content}</p>}
                {section.list && (
                  <ul className="list-disc pl-6 space-y-2">
                    {section.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
