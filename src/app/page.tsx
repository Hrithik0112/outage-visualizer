import Link from "next/link";
import { cloudflareOutageData } from "@/data/outages/cloudflare-nov-2025";

const outages = [
  {
    slug: "cloudflare-nov-2025",
    data: cloudflareOutageData,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-foreground">
        <div className="container mx-auto px-6 py-4 max-w-4xl border border-b-0 border-foreground">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              OUTAGE VISUALIZER
            </Link>
            <div className="text-xs font-mono text-muted-foreground">
              SYSTEM STATUS: OPERATIONAL
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
        <div className="container mx-auto px-6 py-4 max-w-4xl border border-t-0 border-foreground">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <div>© 2025 OUTAGE VISUALIZER</div>
            <div>VERSION 1.0.0</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
