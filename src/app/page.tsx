import type { Metadata } from "next";
import Link from "next/link";
import { Github } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { OutageIcon } from "@/components/OutageIcon";
import { ProviderIcon } from "@/components/ProviderIcon";
import { cloudflareOutageData } from "@/data/outages/cloudflare-nov-2025";
import { awsOutageData } from "@/data/outages/aws-oct-2025";
import { googleOutageData } from "@/data/outages/google-jun-2025";

export const metadata: Metadata = {
  title: "Home - Outage Visualizer",
  description:
    "Explore interactive visualizations of major cloud infrastructure outages from AWS, Cloudflare, and Google Cloud. Step-by-step simulations showing how outages occurred.",
  openGraph: {
    title: "Outage Visualizer - Interactive Cloud Infrastructure Outage Simulations",
    description:
      "Explore interactive visualizations of major cloud infrastructure outages from AWS, Cloudflare, and Google Cloud.",
  },
  alternates: {
    canonical: "/",
  },
};

const outages = [
  {
    slug: "cloudflare-nov-2025",
    data: cloudflareOutageData,
  },
  {
    slug: "aws-oct-2025",
    data: awsOutageData,
  },
  {
    slug: "google-jun-2025",
    data: googleOutageData,
  },
];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Outage Visualizer",
    description:
      "Interactive visualizations and step-by-step simulations of major cloud infrastructure outages",
    url: "https://outage-visualizer.vercel.app",
    author: {
      "@type": "Person",
      name: "Hrithik Dutta",
      url: "https://hrithikdutta.me",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://outage-visualizer.vercel.app/outages?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="h-screen bg-background flex flex-col overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-foreground" role="banner">
        <div className="container mx-auto px-6 py-4 max-w-4xl border-x border-foreground">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold"
              aria-label="Outage Visualizer Home"
            >
              <OutageIcon className="h-6 w-6" aria-hidden="true" />
              <span>OUTAGE VISUALIZER</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="text-xs font-mono text-muted-foreground">
                SYSTEM STATUS: OPERATIONAL
              </div>
              <a
                href="https://github.com/Hrithik0112/outage-visualizer"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-foreground p-2 hover:bg-muted transition-colors"
                aria-label="GitHub repository"
              >
                <Github className="h-4 w-4" />
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-[40px] pb-[40px] overflow-hidden">
        <div className="h-full container mx-auto py-16 px-6 max-w-4xl border-x border-foreground overflow-y-auto custom-scrollbar">
          <div className="mb-16">
            <h1 className="text-4xl font-bold mb-2">
              Interactive Cloud Infrastructure Outage Visualizations
            </h1>
            <p className="text-sm text-muted-foreground mb-4">
              {outages.length} OUTAGE{outages.length !== 1 ? "S" : ""} AVAILABLE
            </p>
            <p className="text-sm text-muted-foreground">
              Explore step-by-step simulations of major cloud infrastructure
              outages. Understand how incidents occurred through interactive
              visualizations with animated infrastructure diagrams.
            </p>
          </div>

        <div className="space-y-4">
          {outages.map((outage) => {
            const { metadata } = outage.data;
            return (
              <Link
                key={outage.slug}
                href={`/outages/${outage.slug}`}
                className="block border-2 border-foreground bg-background hover:bg-muted transition-colors"
              >
                <article className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <ProviderIcon
                        provider={metadata.provider}
                        size={32}
                        className="text-foreground"
                      />
                      <h2 className="text-2xl font-bold">
                        {metadata.provider.toUpperCase()} Outage
                      </h2>
                    </div>
                    <div className="text-xs font-mono border-2 border-foreground px-2 py-1">
                      {metadata.severity.toUpperCase()}
                    </div>
                  </div>
                  <time className="text-sm mb-4 font-mono block" dateTime={metadata.date}>
                    {metadata.date}
                  </time>
                  <p className="text-sm mb-4 text-muted-foreground">
                    {metadata.summary}
                  </p>
                  <dl className="text-xs space-y-1 font-mono">
                    <div>
                      <dt className="font-semibold inline">DURATION:</dt>
                      <dd className="inline"> {metadata.duration}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold inline">SERVICES:</dt>
                      <dd className="inline"> {metadata.affectedServices.length}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold inline">STEPS:</dt>
                      <dd className="inline"> {outage.data.steps.length}</dd>
                    </div>
                  </dl>
                </article>
              </Link>
            );
          })}
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t  border-foreground" role="contentinfo">
        <div className="container mx-auto px-6 py-4 max-w-4xl border-x border-foreground">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <div>© 2025 OUTAGE VISUALIZER</div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Hrithik0112/outage-visualizer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                GITHUB
              </a>
              <span>|</span>
              <a
                href="https://hrithikdutta.me"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                MADE BY HRITHIK
              </a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}
