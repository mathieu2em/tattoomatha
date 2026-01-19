"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPage() {
  const { language, t } = useLanguage();

  const content = {
    fr: {
      sections: [
        {
          title: "1. Introduction",
          content: `Mathieu Perron (« nous », « notre ») respecte votre vie privée. Cette Politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous visitez notre site web matha.tattoo ou utilisez nos services de tatouage à St-Jean-de-Matha, Lanaudière, Québec.`
        },
        {
          title: "2. Informations que nous collectons",
          subsections: [
            {
              subtitle: "Informations personnelles",
              content: "Lorsque vous nous contactez ou prenez rendez-vous, nous pouvons collecter :",
              list: [
                "Nom",
                "Adresse courriel",
                "Numéro de téléphone",
                "Âge/Date de naissance (pour vérification d'âge)",
                "Préférences de design et emplacement de tatouage",
                "Informations médicales pertinentes au tatouage (allergies, conditions, médicaments)",
                "Photos de tatouages existants ou images de référence que vous fournissez"
              ]
            },
            {
              subtitle: "Informations collectées automatiquement",
              content: "Lorsque vous visitez notre site web, nous pouvons collecter automatiquement :",
              list: [
                "Adresse IP",
                "Type et version de navigateur",
                "Informations sur l'appareil",
                "Pages visitées et temps passé sur les pages",
                "Adresses des sites web référents"
              ]
            }
          ]
        },
        {
          title: "3. Comment nous utilisons vos informations",
          content: "Nous utilisons les informations collectées pour :",
          list: [
            "Planifier et gérer les rendez-vous de tatouage",
            "Communiquer avec vous au sujet de votre projet de tatouage",
            "Créer des designs de tatouage personnalisés",
            "Maintenir des dossiers de santé et sécurité tel que requis par la loi",
            "Envoyer des rappels de rendez-vous et des instructions de soins",
            "Améliorer notre site web et nos services",
            "Répondre à vos demandes",
            "Respecter les obligations légales"
          ]
        },
        {
          title: "4. Photographie et utilisation du portfolio",
          content: `Nous pouvons photographier les tatouages terminés pour notre portfolio, site web et marketing sur les réseaux sociaux. Si vous ne souhaitez pas que votre tatouage soit photographié ou partagé publiquement, veuillez nous en informer avant votre rendez-vous. Nous respecterons toujours vos souhaits concernant le partage de photos.`
        },
        {
          title: "5. Partage et divulgation des données",
          content: "Nous ne vendons, ne louons ni n'échangeons vos informations personnelles. Nous pouvons partager vos informations uniquement dans les circonstances suivantes :",
          list: [
            "Fournisseurs de services : Services de courriel, hébergement web, analytique (Microsoft Clarity)",
            "Exigences légales : Lorsque requis par la loi ou pour protéger nos droits",
            "Urgence : Pour protéger la sécurité de nos clients ou d'autres personnes"
          ]
        },
        {
          title: "6. Analytique tierce",
          content: "Nous utilisons Microsoft Clarity pour comprendre comment les visiteurs interagissent avec notre site web. Clarity collecte des informations sur le comportement des utilisateurs, incluant :",
          list: [
            "Pages visitées",
            "Clics et comportement de défilement",
            "Mouvements de souris",
            "Informations sur l'appareil et le navigateur"
          ],
          additionalContent: `Cela nous aide à améliorer l'expérience du site web. Vous pouvez en apprendre davantage sur les pratiques de confidentialité de Microsoft Clarity à `
        },
        {
          title: "7. Réseaux sociaux",
          content: `Notre site web contient des liens vers nos profils de réseaux sociaux (Instagram, TikTok, Facebook). Lorsque vous interagissez avec nous sur les réseaux sociaux, les politiques de confidentialité de ces plateformes s'appliquent. Nous pouvons présenter du contenu de nos comptes de réseaux sociaux sur notre site web.`
        },
        {
          title: "8. Sécurité des données",
          content: `Nous mettons en œuvre des mesures de sécurité raisonnables pour protéger vos informations contre l'accès non autorisé, l'altération ou la destruction. Cependant, aucune transmission internet n'est complètement sécurisée, et nous ne pouvons garantir une sécurité absolue.`
        },
        {
          title: "9. Conservation des données",
          content: `Nous conservons vos informations personnelles aussi longtemps que nécessaire pour fournir nos services et respecter les obligations légales. Les dossiers de santé et sécurité sont maintenus selon les règlements de santé du Québec.`
        },
        {
          title: "10. Vos droits",
          content: "Selon votre emplacement, vous pouvez avoir le droit de :",
          list: [
            "Accéder à vos informations personnelles",
            "Corriger les informations inexactes",
            "Demander la suppression de vos informations (sous réserve des exigences légales)",
            "Vous opposer ou restreindre certains traitements de vos informations",
            "Retirer votre consentement lorsque le traitement est basé sur le consentement"
          ],
          additionalContent: `Pour exercer ces droits, veuillez nous contacter via le formulaire de contact sur notre site web ou via nos réseaux sociaux.`
        },
        {
          title: "11. Confidentialité des enfants",
          content: `Nos services ne sont pas destinés aux personnes de moins de 18 ans. Nous ne collectons pas sciemment d'informations personnelles de mineurs.`
        },
        {
          title: "12. Cookies et suivi",
          content: `Notre site web peut utiliser des cookies et des technologies de suivi similaires pour améliorer votre expérience de navigation. Vous pouvez contrôler les préférences de cookies via les paramètres de votre navigateur.`
        },
        {
          title: "13. Modifications de cette politique de confidentialité",
          content: `Nous pouvons mettre à jour cette Politique de confidentialité de temps à autre. Nous vous informerons de tout changement important en publiant la nouvelle Politique de confidentialité sur cette page et en mettant à jour la date de "Dernière mise à jour".`
        },
        {
          title: "14. Nous contacter",
          content: "Si vous avez des questions concernant cette Politique de confidentialité ou nos pratiques de données, veuillez nous contacter :",
          contactList: [
            "Site web : matha.tattoo",
            "Emplacement : St-Jean-de-Matha, Lanaudière, Québec",
            "Réseaux sociaux : @tattoomatha (Instagram), @mathieutattoomatha (TikTok)"
          ]
        }
      ]
    },
    en: {
      sections: [
        {
          title: "1. Introduction",
          content: `Mathieu Perron ("we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website matha.tattoo or use our tattoo services in St-Jean-de-Matha, Lanaudière, Quebec.`
        },
        {
          title: "2. Information We Collect",
          subsections: [
            {
              subtitle: "Personal Information",
              content: "When you contact us or book an appointment, we may collect:",
              list: [
                "Name",
                "Email address",
                "Phone number",
                "Age/Date of birth (for age verification)",
                "Tattoo design preferences and placement",
                "Medical information relevant to tattooing (allergies, conditions, medications)",
                "Photos of existing tattoos or reference images you provide"
              ]
            },
            {
              subtitle: "Automatically Collected Information",
              content: "When you visit our website, we may automatically collect:",
              list: [
                "IP address",
                "Browser type and version",
                "Device information",
                "Pages visited and time spent on pages",
                "Referring website addresses"
              ]
            }
          ]
        },
        {
          title: "3. How We Use Your Information",
          content: "We use the information we collect to:",
          list: [
            "Schedule and manage tattoo appointments",
            "Communicate with you about your tattoo project",
            "Create custom tattoo designs",
            "Maintain health and safety records as required by law",
            "Send appointment reminders and aftercare instructions",
            "Improve our website and services",
            "Respond to your inquiries",
            "Comply with legal obligations"
          ]
        },
        {
          title: "4. Photography and Portfolio Use",
          content: `We may photograph completed tattoos for our portfolio, website, and social media marketing. If you do not wish your tattoo to be photographed or shared publicly, please inform us before your appointment. We will always respect your wishes regarding photo sharing.`
        },
        {
          title: "5. Data Sharing and Disclosure",
          content: "We do not sell, rent, or trade your personal information. We may share your information only in the following circumstances:",
          list: [
            "Service Providers: Email services, website hosting, analytics (Microsoft Clarity)",
            "Legal Requirements: When required by law or to protect our rights",
            "Emergency: To protect the safety of our clients or others"
          ]
        },
        {
          title: "6. Third-Party Analytics",
          content: "We use Microsoft Clarity to understand how visitors interact with our website. Clarity collects information about user behavior, including:",
          list: [
            "Pages visited",
            "Clicks and scrolling behavior",
            "Mouse movements",
            "Device and browser information"
          ],
          additionalContent: `This helps us improve the website experience. You can learn more about Microsoft Clarity's privacy practices at `
        },
        {
          title: "7. Social Media",
          content: `Our website contains links to our social media profiles (Instagram, TikTok, Facebook). When you interact with us on social media, those platforms' privacy policies apply. We may feature content from our social media accounts on our website.`
        },
        {
          title: "8. Data Security",
          content: `We implement reasonable security measures to protect your information from unauthorized access, alteration, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.`
        },
        {
          title: "9. Data Retention",
          content: `We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Health and safety records are maintained according to Quebec health regulations.`
        },
        {
          title: "10. Your Rights",
          content: "Depending on your location, you may have the right to:",
          list: [
            "Access your personal information",
            "Correct inaccurate information",
            "Request deletion of your information (subject to legal requirements)",
            "Object to or restrict certain processing of your information",
            "Withdraw consent where processing is based on consent"
          ],
          additionalContent: `To exercise these rights, please contact us through the contact form on our website or via our social media channels.`
        },
        {
          title: "11. Children's Privacy",
          content: `Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from minors.`
        },
        {
          title: "12. Cookies and Tracking",
          content: `Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie preferences through your browser settings.`
        },
        {
          title: "13. Changes to This Privacy Policy",
          content: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.`
        },
        {
          title: "14. Contact Us",
          content: "If you have questions about this Privacy Policy or our data practices, please contact us:",
          contactList: [
            "Website: matha.tattoo",
            "Location: St-Jean-de-Matha, Lanaudière, Quebec",
            "Social Media: @tattoomatha (Instagram), @mathieutattoomatha (TikTok)"
          ]
        }
      ]
    }
  };

  const currentContent = content[language as keyof typeof content] || content.en;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ink-900 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
            {t("legal.privacy.title")}
          </h1>

          <div className="space-y-6 text-gray-300">
            <p className="text-sm text-gray-400">
              {t("legal.lastUpdated")}: {language === "fr" ? "Janvier 2026" : "January 2026"}
            </p>

            {currentContent.sections.map((section, index) => (
              <section key={index}>
                <h2 className="text-2xl font-semibold text-white mb-4">{section.title}</h2>

                {section.content && <p className="leading-relaxed mb-3">{section.content}</p>}

                {section.list && (
                  <ul className="list-disc pl-6 space-y-2 mb-3">
                    {section.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.subsections && section.subsections.map((subsection, subIndex) => (
                  <div key={subIndex} className="mt-4">
                    <h3 className="text-xl font-semibold text-white mb-3">{subsection.subtitle}</h3>
                    {subsection.content && <p className="leading-relaxed mb-2">{subsection.content}</p>}
                    {subsection.list && (
                      <ul className="list-disc pl-6 space-y-2">
                        {subsection.list.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {section.additionalContent && (
                  <p className="mt-3 leading-relaxed">
                    {section.additionalContent}
                    {section.title.includes("Analytics") || section.title.includes("Analytique") ? (
                      <a
                        href="https://privacy.microsoft.com/privacystatement"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold-400 hover:text-gold-300"
                      >
                        {language === "fr" ? "Déclaration de confidentialité de Microsoft" : "Microsoft Privacy Statement"}
                      </a>
                    ) : null}
                    .
                  </p>
                )}

                {section.contactList && (
                  <ul className="list-none space-y-2 mt-3">
                    {section.contactList.map((item, i) => (
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
