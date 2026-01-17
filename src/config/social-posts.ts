// Configuration de tes posts Instagram et TikTok
// Ajoute tes vrais posts ici - il suffit de copier l'URL du post et une image

export interface SocialPost {
  id: string;
  platform: "instagram" | "tiktok";
  imageUrl: string; // URL de l'image ou screenshot du post
  caption: string;
  likes: number;
  comments: number;
  postUrl: string; // URL directe vers le post
  isVideo?: boolean;
}

// ===== MODIFIE CES POSTS AVEC TES VRAIS CONTENUS =====
// Pour Instagram: Va sur ton post, copie l'URL (ex: https://www.instagram.com/p/ABC123/)
// Pour TikTok: Va sur ta vidéo, copie l'URL (ex: https://www.tiktok.com/@mathieutattoomatha/video/123456)
// Pour les images: Tu peux utiliser des URLs d'images hébergées ou des screenshots

export const socialPosts: SocialPost[] = [
  // ===== POSTS INSTAGRAM =====
  {
    id: "ig1",
    platform: "instagram",
    imageUrl: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=600&h=600&fit=crop",
    caption: "Fresh geometric sleeve completed today 🔥 #tattoo #geometric",
    likes: 1243,
    comments: 89,
    postUrl: "https://www.instagram.com/tattoomatha/", // Remplace avec l'URL de ton post
  },
  {
    id: "ig2",
    platform: "instagram",
    imageUrl: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=600&h=600&fit=crop",
    caption: "Delicate fine line work 🖤 DM for bookings",
    likes: 2105,
    comments: 156,
    postUrl: "https://www.instagram.com/tattoomatha/",
  },
  {
    id: "ig3",
    platform: "instagram",
    imageUrl: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=600&h=600&fit=crop",
    caption: "Japanese traditional meets modern 🐉",
    likes: 3420,
    comments: 201,
    postUrl: "https://www.instagram.com/tattoomatha/",
  },
  {
    id: "ig4",
    platform: "instagram",
    imageUrl: "https://images.unsplash.com/photo-1542556398-95fb5b9f9b48?w=600&h=600&fit=crop",
    caption: "Blackwork mandala 🖤 7 hours of work",
    likes: 4521,
    comments: 178,
    postUrl: "https://www.instagram.com/tattoomatha/",
  },
  {
    id: "ig5",
    platform: "instagram",
    imageUrl: "https://images.unsplash.com/photo-1604871000636-074fa5117945?w=600&h=600&fit=crop",
    caption: "Micro realism at its finest ✨",
    likes: 5678,
    comments: 234,
    postUrl: "https://www.instagram.com/tattoomatha/",
  },

  // ===== POSTS TIKTOK =====
  {
    id: "tt1",
    platform: "tiktok",
    imageUrl: "https://images.unsplash.com/photo-1590246814883-55516d8c2a73?w=600&h=600&fit=crop",
    caption: "Watch this rose come to life 🌹 #tattooartist #timelapse",
    likes: 15600,
    comments: 234,
    postUrl: "https://www.tiktok.com/@mathieutattoomatha",
    isVideo: true,
  },
  {
    id: "tt2",
    platform: "tiktok",
    imageUrl: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?w=600&h=600&fit=crop",
    caption: "Client reaction to their new piece 😭❤️ #tattoo",
    likes: 45200,
    comments: 567,
    postUrl: "https://www.tiktok.com/@mathieutattoomatha",
    isVideo: true,
  },
  {
    id: "tt3",
    platform: "tiktok",
    imageUrl: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=600&h=600&fit=crop",
    caption: "POV: You're getting your first tattoo 💉",
    likes: 28900,
    comments: 412,
    postUrl: "https://www.tiktok.com/@mathieutattoomatha",
    isVideo: true,
  },
];

// Liens vers tes profils
export const socialLinks = {
  instagram: {
    username: "tattoomatha",
    url: "https://www.instagram.com/tattoomatha/",
  },
  tiktok: {
    username: "mathieutattoomatha",
    url: "https://www.tiktok.com/@mathieutattoomatha",
  },
};
