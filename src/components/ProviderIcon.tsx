import { Cloud, Shield, Server } from "lucide-react";

interface ProviderIconProps {
  provider: string;
  className?: string;
  size?: number;
}

export function ProviderIcon({
  provider,
  className,
  size = 24,
}: ProviderIconProps) {
  const providerLower = provider.toLowerCase();

  if (providerLower.includes("cloudflare")) {
    return (
      <Shield
        size={size}
        className={className}
        aria-label={`${provider} icon`}
      />
    );
  }

  if (providerLower.includes("aws") || providerLower.includes("amazon")) {
    return (
      <Server
        size={size}
        className={className}
        aria-label={`${provider} icon`}
      />
    );
  }

  if (
    providerLower.includes("google") ||
    providerLower.includes("gcp") ||
    providerLower.includes("gcloud")
  ) {
    return (
      <Cloud
        size={size}
        className={className}
        aria-label={`${provider} icon`}
      />
    );
  }

  // Default icon
  return (
    <Cloud size={size} className={className} aria-label={`${provider} icon`} />
  );
}

