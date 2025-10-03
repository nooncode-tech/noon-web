import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import UiGrapper from "@/components/layout/UiGrapper";
import ChatWidget from "@/components/chatbot/chatbot";
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
  title: "NOON",
  description:
    "At Noon, we turn your idea into code with the highest quality, record-fast delivery, and the best pricing in the market. Whether it's a simple website or a full-scale professional Al solution—we've got you covered.",
  openGraph: {
    title: "NOON",
    description:
      "At Noon, we turn your idea into code with the highest quality, record-fast delivery, and the best pricing in the market.",
    url: "https://yourdomain.com",
    siteName: "NOON",
    images: [
      {
        url: "https://yourdomain.com/og-image.png", // Cambia por la URL real de tu imagen
        width: 1200,
        height: 630,
        alt: "NOON - We turn your idea into code",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOON",
    description:
      "At Noon, we turn your idea into code with top quality and record-fast delivery.",
    images: ["https://yourdomain.com/og-image.png"], // Cambia por la URL real de tu imagen
    creator: "@YourTwitterHandle", // Opcional, si tienes Twitter
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://yourdomain.com"),
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
