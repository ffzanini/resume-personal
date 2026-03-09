import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import AppProvider from "@/providers/AppProvider";
import { ScrollToTopButton } from "@/components";

import { fontMavenPro } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://resume.ffzanini.dev"),
  title: "Felipe Frantz Zanini | Senior Software Engineer & Frontend Architecture",
  description:
    "Senior Software Engineer & Frontend Architecture, Writer and Screenwriter, Indie Game Developer, Jiu Jitsu Brown Belt",
  icons: "/favicon.ico",
  openGraph: {
    type: "website",
    url: "https://resume.ffzanini.dev",
    title:
      "Felipe Frantz Zanini | Senior Software Engineer & Frontend Architecture",
    description:
      "Senior Software Engineer & Frontend Architecture, Writer and Screenwriter, Indie Game Developer, Jiu Jitsu Brown Belt",
    images: [
      {
        url: "/images/visit-card.png",
        width: 1120,
        height: 630,
        alt: "Felipe Frantz Zanini | Senior Software Engineer & Frontend Architecture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Felipe Frantz Zanini | Senior Software Engineer & Frontend Architecture",
    description:
      "Senior Software Engineer & Frontend Architecture, Writer and Screenwriter, Indie Game Developer, Jiu Jitsu Brown Belt",
    images: ["/images/visit-card.png"],
  },
  other: {
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Felipe Frantz Zanini",
      url: "https://resume.ffzanini.dev",
      jobTitle: "Senior Software Engineer & Frontend Architecture",
      sameAs: [
        "https://github.com/ffzanini",
        "https://linkedin.com/in/ffzanini",
      ],
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" translate="no" suppressHydrationWarning>
      <meta name="google" content="notranslate" />
      <body className={`${fontMavenPro.className} antialiased`}>
        <AppProvider>
          {children}
          <Analytics mode="production" />
          <SpeedInsights />
          <ScrollToTopButton />
        </AppProvider>
      </body>
    </html>
  );
}
