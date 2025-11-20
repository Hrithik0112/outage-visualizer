import Link from "next/link";
import { Github } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { OutageIcon } from "@/components/OutageIcon";
import { cloudflareOutageData } from "@/data/outages/cloudflare-nov-2025";
import { awsOutageData } from "@/data/outages/aws-oct-2025";
import { googleOutageData } from "@/data/outages/google-jun-2025";

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
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-foreground">
        <div className="container mx-auto px-6 py-4 max-w-4xl border border-y-0 border-foreground">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <OutageIcon className="h-6 w-6" />
              OUTAGE VISUALIZER
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

      <main className="container mx-auto py-16 px-6 max-w-4xl flex-1 border-x border-foreground">
        <div className="mb-16">
          <h1 className="text-4xl font-bold mb-2">OUTAGE VISUALIZER</h1>
          <div className="text-sm text-muted-foreground">
            {outages.length} OUTAGE{outages.length !== 1 ? "S" : ""} AVAILABLE
          </div>
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
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold">
                      {metadata.provider.toUpperCase()}
                    </div>
                    <div className="text-xs font-mono border-2 border-foreground px-2 py-1">
                      {metadata.severity.toUpperCase()}
                    </div>
                  </div>
                  <div className="text-sm mb-4 font-mono">
                    {metadata.date}
                  </div>
                  <div className="text-xs space-y-1 font-mono">
                    <div>
                      <span className="font-semibold">DURATION:</span>{" "}
                      {metadata.duration}
                    </div>
                    <div>
                      <span className="font-semibold">SERVICES:</span>{" "}
                      {metadata.affectedServices.length}
                    </div>
                    <div>
                      <span className="font-semibold">STEPS:</span>{" "}
                      {outage.data.steps.length}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <footer className="border-t border-foreground mt-auto">
        <div className="container mx-auto px-6 py-4 max-w-4xl border border-y-0 border-foreground">
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
  );
}
