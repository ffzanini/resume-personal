import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import AppProvider from "@/providers/AppProvider";
import { ScrollToTopButton, SetInitialLanguage } from "@/components";

import { fontMavenPro } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://resume.ffzanini.dev"),
  title: "Felipe Frant Zanini | Software Engineer",
  description:
    "Software Engineer, Writer and Screenwriter, Indie Game Developer, Jiu Jitsu Brown Belt",
  icons: "/favicon.ico",
  openGraph: {
    type: "website",
    url: "https://resume.ffzanini.dev",
    title: "Felipe Frant Zanini | Software Engineer",
    description:
      "Software Engineer, Writer and Screenwriter, Indie Game Developer, Jiu Jitsu Brown Belt",
    images: [
      {
        url: "/images/visit-card.png",
        width: 1120,
        height: 630,
        alt: "Felipe Frant Zanini | Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Felipe Frant Zanini | Software Engineer",
    description:
      "Software Engineer, Writer and Screenwriter, Indie Game Developer, Jiu Jitsu Brown Belt",
    images: ["/images/visit-card.png"],
  },
  other: {
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Felipe Frant Zanini",
      url: "https://resume.ffzanini.dev",
      jobTitle: "Software Engineer",
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
          <SetInitialLanguage />
          {children}
          <Analytics mode="production" />
          <SpeedInsights />
          <ScrollToTopButton />
        </AppProvider>
      </body>
    </html>
  );
}
