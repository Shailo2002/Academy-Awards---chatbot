import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Envelope - Oscars Chatbot",
  description: "Ask anything about the Oscars.",
  keywords: ["Oscars", "Academy Awards", "Chatbot", "AI", "Movies", "Film"],
  openGraph: {
    title: "The Envelope - Oscars Chatbot",
    description: "Your personalized expert on everything Oscars.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
