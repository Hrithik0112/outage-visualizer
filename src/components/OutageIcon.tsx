export function OutageIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Network nodes */}
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <circle cx="12" cy="12" r="2" />
      {/* Connections */}
      <line x1="6" y1="6" x2="12" y2="12" />
      <line x1="18" y1="6" x2="12" y2="12" />
      <line x1="6" y1="18" x2="12" y2="12" />
      <line x1="18" y1="18" x2="12" y2="12" />
      {/* Alert indicator */}
      <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.2" />
      <line x1="12" y1="8" x2="12" y2="10" strokeWidth="3" />
      <line x1="12" y1="14" x2="12" y2="16" strokeWidth="3" />
    </svg>
  );
}

