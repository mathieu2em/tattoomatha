import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: path.join(process.cwd(), ".env.local") });


// Tattoo metadata matching your existing fallback data
const tattooData = [
  {
    filename: "epinette-noire-avant-bras.jpeg",
    title: "Épinette Noire",
    alt: "Épinette noire tatouée sur avant-bras avec détails réalistes",
    size: "large",
    order: 0,
  },
  {
    filename: "dualite-emotionnelle-cuisse.jpeg",
    title: "Dualité Émotionnelle",
    alt: "Tatouage représentant la dualité émotionnelle sur la cuisse",
    size: "medium",
    order: 1,
  },
  {
    filename: "mandala-epaule.jpeg",
    title: "Mandala d'Épaule",
    alt: "Mandala géométrique détaillé sur l'épaule",
    size: "large",
    order: 2,
  },
  {
    filename: "sacred-geometry-microrealism.jpeg",
    title: "Sacred Geometry",
    alt: "Géométrie sacrée en microréalisme",
    size: "small",
    order: 3,
  },
  {
    filename: "colibri-et-fleur.jpeg",
    title: "Colibri et Fleur",
    alt: "Colibri en vol près d'une fleur délicate",
    size: "small",
    order: 4,
  },
  {
    filename: "phoenix-cube-metatron.jpeg",
    title: "Phoenix & Cube de Métatron",
    alt: "Phoenix mythique avec cube de Métatron en géométrie sacrée",
    size: "large",
    order: 5,
  },
  {
    filename: "bateau-viking.jpeg",
    title: "Bateau Viking",
    alt: "Drakkar viking naviguant sur les mers nordiques",
    size: "medium",
    order: 6,
  },
  {
    filename: "marguerite.jpeg",
    title: "Marguerite",
    alt: "Marguerite délicate en style botanique",
    size: "small",
    order: 7,
  },
  {
    filename: "floral-mollet.jpeg",
    title: "Composition Florale",
    alt: "Composition florale artistique sur le mollet",
    size: "small",
    order: 8,
  },
  {
    filename: "huitre-perle.jpeg",
    title: "Huître et Perle",
    alt: "Huître ouverte révélant une perle précieuse",
    size: "small",
    order: 9,
  },
  {
    filename: "foret-nordique-avant-bras.jpeg",
    title: "Forêt Nordique",
    alt: "Paysage de forêt nordique sur l'avant-bras",
    size: "small",
    order: 10,
  },
  {
    filename: "mandala-coude.jpeg",
    title: "Mandala du Coude",
    alt: "Mandala circulaire centré sur le coude",
    size: "small",
    order: 11,
  },
  {
    filename: "memento-mori.jpeg",
    title: "Memento Mori",
    alt: "Rappel de la mortalité en style artistique",
    size: "small",
    order: 12,
  },
  {
    filename: "mandala-sur-mollet.png",
    title: "Mandala sur Mollet",
    alt: "Grand mandala décoratif sur le mollet",
    size: "small",
    order: 13,
  },
  {
    filename: "ginkgo-biloba.jpeg",
    title: "Feuille de Ginkgo Biloba",
    alt: "Feuille de Ginkgo Biloba en détail botanique",
    size: "small",
    order: 14,
  },
  {
    filename: "agencement-avant-bras.jpeg",
    title: "Agencement Avant-Bras",
    alt: "Composition artistique agencée sur l'avant-bras",
    size: "medium",
    order: 15,
  },
  {
    filename: "chibi-manga.jpeg",
    title: "Chibi Manga",
    alt: "Personnage manga en style chibi",
    size: "small",
    order: 16,
  },
  {
    filename: "fleur-cover.jpeg",
    title: "Fleur Cover",
    alt: "Fleur artistique en cover-up",
    size: "small",
    order: 17,
  },
  {
    filename: "king.jpeg",
    title: "King",
    alt: "Symbole royal King",
    size: "small",
    order: 18,
  },
  {
    filename: "queen.jpeg",
    title: "Queen",
    alt: "Symbole royal Queen",
    size: "small",
    order: 19,
  },
  {
    filename: "memorial-a-ses-enfants.jpeg",
    title: "Mémorial à ses Enfants",
    alt: "Tatouage mémorial dédié aux enfants",
    size: "medium",
    order: 20,
  },
  {
    filename: "F11BD132-F024-4494-9E9A-E7AC79589293_4_5005_c.jpeg",
    title: "Tatouage Artistique 1",
    alt: "Tatouage artistique unique",
    size: "small",
    order: 21,
  },
  {
    filename: "FDEA7EEE-D2E9-4E95-94B8-8C5241D596E6_1_105_c.jpeg",
    title: "Tatouage Artistique 2",
    alt: "Tatouage artistique créatif",
    size: "small",
    order: 22,
  },
  {
    filename: "manga-chibi.jpeg",
    title: "Manga Chibi",
    alt: "Style manga chibi kawaii",
    size: "small",
    order: 23,
  },
];

async function uploadTattoos() {
  // Get token from environment or command line
  const token = process.env.SANITY_AUTH_TOKEN;

  if (!token) {
    console.error("❌ SANITY_AUTH_TOKEN is required!");
    console.log("\n📝 To get your token:");
    console.log("1. Go to https://www.sanity.io/manage");
    console.log("2. Select your project");
    console.log("3. Go to API → Tokens");
    console.log("4. Click 'Add API token'");
    console.log("5. Give it a name (e.g., 'Migration Script')");
    console.log("6. Set permissions to 'Editor'");
    console.log("7. Copy the token");
    console.log(
      "\n8. Run: SANITY_AUTH_TOKEN=your_token_here npm run upload-tattoos\n"
    );
    process.exit(1);
  }

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: "2024-01-01",
    token: token,
    useCdn: false,
  });

  const tattoosDir = path.join(process.cwd(), "public", "tattoos");

  console.log("🎨 Starting tattoo upload to Sanity CMS...\n");

  let successCount = 0;
  let errorCount = 0;

  for (const tattoo of tattooData) {
    try {
      const imagePath = path.join(tattoosDir, tattoo.filename);

      if (!fs.existsSync(imagePath)) {
        console.log(`⚠️  Skipping ${tattoo.filename} - file not found`);
        errorCount++;
        continue;
      }

      console.log(`📤 Uploading: ${tattoo.title} (${tattoo.filename})...`);

      // Upload the image asset
      const imageBuffer = fs.readFileSync(imagePath);
      const asset = await client.assets.upload("image", imageBuffer, {
        filename: tattoo.filename,
      });

      console.log(`   ✅ Asset uploaded: ${asset._id}`);

      // Create the tattoo document
      const document = await client.create({
        _type: "tattoo",
        title: tattoo.title,
        alt: tattoo.alt,
        size: tattoo.size,
        order: tattoo.order,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: asset._id,
          },
        },
      });

      console.log(`   ✅ Document created: ${document._id}`);
      console.log(`   🎉 Successfully uploaded: ${tattoo.title}\n`);
      successCount++;
    } catch (error) {
      console.error(`   ❌ Error uploading ${tattoo.filename}:`, error);
      errorCount++;
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log(`✅ Successfully uploaded: ${successCount} tattoos`);
  if (errorCount > 0) {
    console.log(`❌ Failed uploads: ${errorCount}`);
  }
  console.log("=".repeat(50));
  console.log(
    "\n🎉 Done! Check your Sanity Studio at http://localhost:3000/studio\n"
  );
}

uploadTattoos().catch(console.error);
