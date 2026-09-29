import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "KYC Flow v1.7 — Next-Gen Virtual Camera Injection & Identity Verification Suite",
  description: "Download KYC Flow v1.7 APK. Advanced Virtual Camera PC/OBS Studio bridge, Real-time AI, and automated identity verification utility suite for Android 10-15+, PC & Mac.",
  keywords: "KYC Flow, virtual camera android, OBS virtual camera bridge, camera injection tool, identity verification testing",
  authors: [{ name: "KYC Flow Team" }],
  openGraph: {
    title: "KYC Flow v1.7 — Virtual Camera Injection & Identity Verification Suite",
    description: "Stream live video from PC/OBS to your mobile camera. Instant activation, zero-log protection, and automated document testing.",
    url: "/",
    siteName: "KYC Flow",
    images: [{ url: "/kyc-flow-logo.png", width: 512, height: 512, alt: "KYC Flow Logo" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KYC Flow v1.7 — Virtual Camera & Injection Suite",
    description: "Next-Gen Virtual Camera OBS/PC live bridge & Real-time AI.",
    images: ["/kyc-flow-logo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${jetbrains.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
