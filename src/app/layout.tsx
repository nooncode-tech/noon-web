import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import UiGrapper from "@/components/layout/UiGrapper";
import ChatWidget from "@/components/chatbot/ChatWidget";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ChatProvider } from "@/context/ChatContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  
  title: {
    template: '%s | NOON',
    default: 'Noon | Technology Development Company',
  },

  description:
    'At Noon, we turn your idea into code with top quality, record-fast delivery, and great pricing. From simple websites to full-scale professional AI solutions.',

  metadataBase: new URL('https://nooncode.dev/'),

  keywords: [
    'web development',
    'software development',
    'AI solutions',
    'programming',
    'code',
    'web design',
    'Next.js',
  ],

  // --- Open Graph (Para Facebook, LinkedIn, Discord, etc.) ---
  openGraph: {
    title: 'Noon | Technology Development Company',
    description:
      'At Noon, we turn your idea into code with top quality, record-fast delivery, and great pricing. From simple websites to full-scale professional AI solutions.',
    url: 'https://nooncode.dev',
    siteName: 'Noon',
    images: [
      {
        url: '/logometadata.png', // Ruta relativa a /public
        width: 1200,
        height: 630,
        alt: 'Noon | Technology Development Company',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // --- Iconos (Favicon, etc.) ---
  icons: {
    icon: '/metadata-img/favicon.ico',
    shortcut: '/metadata-img/favicon.ico',
    apple: '/metadata-img/apple-touch-icon.png',
  },

  // --- Archivo Manifest (para PWA) ---
  manifest: '/metadata-img/site.webmanifest',

  // --- Robots y Canónicos ---
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/riosark" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased relative h-dvh flex flex-col`}
      >
        <Navbar />

        <ChatProvider>
          <UiGrapper>
            {children}
            <Footer />
          </UiGrapper>
          <GoogleOAuthProvider clientId="401626119144-kjh1sog47377958q8rsusv9393vib6b0.apps.googleusercontent.com">
            <ChatWidget />
          </GoogleOAuthProvider>
        </ChatProvider>
      </body>
    </html>
  );
}
