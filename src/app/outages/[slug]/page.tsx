import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cloudflareOutageData } from "@/data/outages/cloudflare-nov-2025";
import { awsOutageData } from "@/data/outages/aws-oct-2025";
import { googleOutageData } from "@/data/outages/google-jun-2025";
import OutagePageClient from "./OutagePageClient";

const outages = {
  "cloudflare-nov-2025": cloudflareOutageData,
  "aws-oct-2025": awsOutageData,
  "google-jun-2025": googleOutageData,
};

export async function generateStaticParams() {
  return Object.keys(outages).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const outage = outages[params.slug as keyof typeof outages];

  if (!outage) {
    return {
      title: "Outage Not Found",
    };
  }

  const { metadata: outageMetadata } = outage;

  const pageTitle = `${outageMetadata.provider} Outage - ${outageMetadata.date}`;

  return {
    title: pageTitle,
    description: `${outageMetadata.summary} Explore the step-by-step simulation of this ${outageMetadata.severity} severity outage that affected ${outageMetadata.affectedServices.length} services.`,
    keywords: [
      `${outageMetadata.provider} outage`,
      `${outageMetadata.provider} incident`,
      "cloud outage",
      "infrastructure outage",
      outageMetadata.rootCause,
      ...outageMetadata.affectedServices,
    ],
    openGraph: {
      title: pageTitle,
      description: outageMetadata.summary,
      type: "article",
      publishedTime: outageMetadata.date,
      authors: ["Hrithik Dutta"],
      tags: [
        outageMetadata.provider,
        "cloud outage",
        "infrastructure",
        outageMetadata.severity,
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: outageMetadata.summary,
    },
    alternates: {
      canonical: `/outages/${params.slug}`,
    },
  };
}

export default function OutagePage({ params }: { params: { slug: string } }) {
  const outage = outages[params.slug as keyof typeof outages];

  if (!outage) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${outage.metadata.provider} Outage - ${outage.metadata.date}`,
    description: outage.metadata.summary,
    datePublished: outage.metadata.date,
    author: {
      "@type": "Person",
      name: "Hrithik Dutta",
      url: "https://hrithikdutta.me",
    },
    publisher: {
      "@type": "Organization",
      name: "Outage Visualizer",
      url: "https://outage-visualizer.vercel.app",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://outage-visualizer.vercel.app/outages/${params.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <OutagePageClient outage={outage} slug={params.slug} />
    </>
  );
}

