"use client";

import { useEffect, useState } from "react";
import { isRestrictiveInAppBrowser } from "@/utils/browserDetection";

export default function TestPage() {
  const [browserInfo, setBrowserInfo] = useState({
    userAgent: "",
    isRestricted: false,
    isInstagram: false,
  });

  useEffect(() => {
    const ua = window.navigator.userAgent;
    const isInstagram = ua.toLowerCase().includes('instagram');
    const isFacebook = ua.toLowerCase().includes('fban') || ua.toLowerCase().includes('fbav');
    const isLinkedIn = ua.toLowerCase().includes('linkedin');

    setBrowserInfo({
      userAgent: ua,
      isRestricted: isRestrictiveInAppBrowser(),
      isInstagram: isInstagram,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <h1 className="text-4xl font-bold text-white mb-6">
            🎉 Success! Page Loaded
          </h1>

          <div className="space-y-4 text-white">
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
              <p className="text-lg font-semibold">✅ If you're seeing this, the white screen is fixed!</p>
            </div>

            <div className="bg-white/5 rounded-lg p-4 space-y-2">
              <h2 className="text-xl font-bold mb-3">Browser Information:</h2>

              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Is Instagram Browser: </span>
                  <span className={browserInfo.isInstagram ? "text-yellow-300 font-bold" : "text-gray-300"}>
                    {browserInfo.isInstagram ? "YES 📱" : "No"}
                  </span>
                </div>

                <div>
                  <span className="font-semibold">Is Restrictive Browser: </span>
                  <span className={browserInfo.isRestricted ? "text-yellow-300 font-bold" : "text-gray-300"}>
                    {browserInfo.isRestricted ? "YES (Analytics disabled)" : "No (Analytics enabled)"}
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="font-semibold mb-2">User Agent:</p>
                  <p className="text-sm text-gray-300 break-all font-mono bg-black/30 p-2 rounded">
                    {browserInfo.userAgent || "Loading..."}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4 mt-6">
              <h2 className="text-lg font-bold mb-2">What's working:</h2>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Page rendering ✅</li>
                <li>JavaScript execution ✅</li>
                <li>React hydration ✅</li>
                <li>Client-side code ✅</li>
                {browserInfo.isRestricted && (
                  <li className="text-yellow-300">Analytics scripts skipped (to prevent CSP errors) ✅</li>
                )}
              </ul>
            </div>

            <div className="mt-6 pt-6 border-t border-white/30">
              <a
                href="/"
                className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                ← Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
