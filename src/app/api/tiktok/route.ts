import { NextResponse } from "next/server";

// Types pour les vidéos TikTok
interface TikTokVideo {
  id: string;
  title: string;
  cover_image_url: string;
  share_url: string;
  create_time: number;
  like_count: number;
  comment_count: number;
  view_count: number;
  duration: number;
}

interface TikTokAPIResponse {
  data: {
    videos: TikTokVideo[];
    cursor: number;
    has_more: boolean;
  };
  error: {
    code: string;
    message: string;
  };
}

// Cache simple en mémoire
let cache: {
  data: TikTokVideo[] | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0,
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  try {
    const accessToken = process.env.TIKTOK_ACCESS_TOKEN;

    // Vérifier si les variables d'environnement sont configurées
    if (!accessToken) {
      return NextResponse.json(
        { 
          error: "TikTok API not configured",
          message: "Veuillez configurer TIKTOK_ACCESS_TOKEN dans .env.local après approbation de votre app"
        },
        { status: 503 }
      );
    }

    // Vérifier le cache
    const now = Date.now();
    if (cache.data && now - cache.timestamp < CACHE_DURATION) {
      return NextResponse.json({
        videos: cache.data,
        cached: true,
      });
    }

    // Appeler l'API TikTok
    const response = await fetch(
      "https://open.tiktokapis.com/v2/video/list/?fields=id,title,cover_image_url,share_url,create_time,like_count,comment_count,view_count,duration",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          max_count: 12,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("TikTok API Error:", errorData);

      return NextResponse.json(
        { error: "Failed to fetch TikTok videos" },
        { status: response.status }
      );
    }

    const data: TikTokAPIResponse = await response.json();

    if (data.error && data.error.code !== "ok") {
      return NextResponse.json(
        { error: data.error.message },
        { status: 400 }
      );
    }

    // Mettre à jour le cache
    cache = {
      data: data.data.videos,
      timestamp: now,
    };

    return NextResponse.json({
      videos: data.data.videos,
      cached: false,
    });
  } catch (error) {
    console.error("TikTok API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
