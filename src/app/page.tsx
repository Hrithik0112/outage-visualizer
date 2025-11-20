import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cloudflareOutageData } from "@/data/outages/cloudflare-nov-2025";

const outages = [
  {
    slug: "cloudflare-nov-2025",
    data: cloudflareOutageData,
  },
  // AWS outage will be added later
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-12 px-4 max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">Outage Visualizer</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interactive visualizations of major cloud infrastructure outages.
            Explore step-by-step simulations showing how incidents unfolded.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {outages.map((outage) => {
            const { metadata } = outage.data;
            return (
              <Link
                key={outage.slug}
                href={`/outages/${outage.slug}`}
                className="block h-full"
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-2xl">
                        {metadata.provider}
                      </CardTitle>
                      <Badge
                        variant={
                          metadata.severity === "critical"
                            ? "destructive"
                            : metadata.severity === "high"
                              ? "default"
                              : "outline"
                        }
                      >
                        {metadata.severity}
                      </Badge>
                    </div>
                    <CardDescription className="text-base">
                      {metadata.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {metadata.summary}
                    </p>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-semibold">
                          Duration:{" "}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {metadata.duration}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs font-semibold">
                          Affected Services:{" "}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {metadata.affectedServices.length} services
                        </span>
                      </div>
                      <div>
                        <span className="text-xs font-semibold">
                          Simulation Steps:{" "}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {outage.data.steps.length} steps
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {outages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No outages available yet.</p>
          </div>
        )}
      </main>
    </div>
  );
}
