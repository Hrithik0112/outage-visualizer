import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
};

const ibmMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Outage Visualizer",
    template: "%s - Outage Visualizer",
  },
  description:
    "Interactive visualizations and step-by-step simulations of major cloud infrastructure outages from AWS, Cloudflare, Google Cloud, and more. Understand how outages happen with animated infrastructure diagrams.",
  keywords: [
    "cloud outages",
    "AWS outage",
    "Cloudflare outage",
    "Google Cloud outage",
    "infrastructure visualization",
    "outage simulation",
    "cloud infrastructure",
    "system reliability",
    "post-mortem analysis",
    "incident visualization",
  ],
  authors: [{ name: "Hrithik Dutta", url: "https://hrithikdutta.me" }],
  creator: "Hrithik Dutta",
  publisher: "Hrithik Dutta",
  metadataBase: new URL("https://outage-visualizer.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://outage-visualizer.vercel.app",
    siteName: "Outage Visualizer",
    title: "Outage Visualizer - Interactive Cloud Infrastructure Outage Simulations",
    description:
      "Interactive visualizations and step-by-step simulations of major cloud infrastructure outages from AWS, Cloudflare, Google Cloud, and more.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Outage Visualizer - Cloud Infrastructure Outage Simulations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Outage Visualizer - Interactive Cloud Infrastructure Outage Simulations",
    description:
      "Interactive visualizations and step-by-step simulations of major cloud infrastructure outages.",
    creator: "@hrithikdutta",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${ibmMono.variable} font-mono antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
