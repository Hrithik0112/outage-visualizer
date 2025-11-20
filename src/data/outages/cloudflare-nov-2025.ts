import type { OutageData } from "@/types/outage";

export const cloudflareOutageData: OutageData = {
  metadata: {
    id: "cloudflare-nov-2025",
    slug: "cloudflare-nov-2025",
    provider: "Cloudflare",
    date: "November 18, 2025",
    severity: "critical",
    duration: "~6 hours (11:20 UTC - 17:06 UTC)",
    affectedServices: [
      "Core CDN and security services",
      "Turnstile",
      "Workers KV",
      "Dashboard",
      "Email Security",
      "Access",
    ],
    rootCause:
      "Database permissions change caused malformed Bot Management configuration file",
    summary:
      "A change to ClickHouse database permissions caused duplicate feature rows, doubling the Bot Management feature file size. This exceeded the 200-feature limit, causing the core proxy to panic and return 5xx errors globally.",
  },
  steps: [
    {
      stepNumber: 1,
      title: "Database Permissions Change Deployed",
      description:
        "Database access control change deployed to ClickHouse cluster",
      timestamp: "11:05 UTC",
      components: [
        {
          id: "clickhouse-db",
          type: "database",
          label: "ClickHouse Database",
          position: { x: 500, y: 240 },
          state: "normal",
          description: "Database cluster with updated permissions",
        },
      ],
      connections: [],
      highlights: ["clickhouse-db"],
    },
    {
      stepNumber: 2,
      title: "Query Generates Duplicate Features",
      description:
        "Query running on updated cluster nodes generates duplicate feature rows",
      timestamp: "11:20 UTC",
      components: [
        {
          id: "clickhouse-db",
          type: "database",
          label: "ClickHouse Database",
          position: { x: 300, y: 240 },
          state: "error",
          description: "Generating duplicate rows",
        },
        {
          id: "query-process",
          type: "query",
          label: "Feature Query",
          position: { x: 700, y: 240 },
          state: "error",
          description: "Query generating duplicates",
        },
      ],
      connections: [
        {
          from: "clickhouse-db",
          to: "query-process",
          label: "Query execution",
          active: true,
        },
      ],
      highlights: ["clickhouse-db", "query-process"],
    },
    {
      stepNumber: 3,
      title: "Feature File Doubles in Size",
      description:
        "Feature configuration file grows from ~60 to over 200 features",
      timestamp: "11:20 UTC",
      components: [
        {
          id: "clickhouse-db",
          type: "database",
          label: "ClickHouse Database",
          position: { x: 150, y: 240 },
          state: "error",
        },
        {
          id: "query-process",
          type: "query",
          label: "Feature Query",
          position: { x: 450, y: 240 },
          state: "error",
        },
        {
          id: "feature-file",
          type: "config",
          label: "Feature File",
          position: { x: 800, y: 240 },
          state: "error",
          description: "Size: 200+ features (limit: 200)",
        },
      ],
      connections: [
        {
          from: "clickhouse-db",
          to: "query-process",
          active: true,
        },
        {
          from: "query-process",
          to: "feature-file",
          label: "Generate file",
          active: true,
        },
      ],
      highlights: ["feature-file"],
    },
    {
      stepNumber: 4,
      title: "Large File Propagates to Network",
      description:
        "Oversized feature file propagates to all edge servers across the network",
      timestamp: "11:20-14:24 UTC",
      components: [
        {
          id: "feature-file",
          type: "config",
          label: "Feature File",
          position: { x: 300, y: 250 },
          state: "propagating",
          description: "Propagating globally",
        },
        {
          id: "edge-network-1",
          type: "network",
          label: "Edge Server 1",
          position: { x: 550, y: 100 },
          state: "propagating",
        },
        {
          id: "edge-network-2",
          type: "network",
          label: "Edge Server 2",
          position: { x: 550, y: 450 },
          state: "propagating",
        },
        {
          id: "edge-network-3",
          type: "network",
          label: "Edge Server 3",
          position: { x: 750, y: 200 },
          state: "propagating",
        },
        {
          id: "edge-network-4",
          type: "network",
          label: "Edge Server 4",
          position: { x: 750, y: 400 },
          state: "propagating",
        },
      ],
      connections: [
        {
          from: "feature-file",
          to: "edge-network-1",
          active: true,
        },
        {
          from: "feature-file",
          to: "edge-network-2",
          active: true,
        },
        {
          from: "feature-file",
          to: "edge-network-3",
          active: true,
        },
        {
          from: "feature-file",
          to: "edge-network-4",
          active: true,
        },
      ],
      highlights: [
        "feature-file",
        "edge-network-1",
        "edge-network-2",
        "edge-network-3",
        "edge-network-4",
      ],
    },
    {
      stepNumber: 5,
      title: "Bot Management Module Panics",
      description:
        "Module receives oversized file, hits 200-feature limit, and panics",
      timestamp: "11:20 UTC",
      components: [
        {
          id: "edge-network-1",
          type: "network",
          label: "Edge Server 1",
          position: { x: 300, y: 150 },
          state: "error",
        },
        {
          id: "edge-network-2",
          type: "network",
          label: "Edge Server 2",
          position: { x: 700, y: 150 },
          state: "error",
        },
        {
          id: "bot-module",
          type: "module",
          label: "Bot Management",
          position: { x: 500, y: 400 },
          state: "error",
          description: "Panic: limit exceeded",
        },
      ],
      connections: [
        {
          from: "edge-network-1",
          to: "bot-module",
          active: true,
        },
        {
          from: "edge-network-2",
          to: "bot-module",
          active: true,
        },
      ],
      highlights: ["bot-module"],
    },
    {
      stepNumber: 6,
      title: "Core Proxy Returns 5xx Errors",
      description:
        "Core proxy (FL) fails and returns HTTP 5xx errors to users globally",
      timestamp: "11:20-14:30 UTC",
      components: [
        {
          id: "bot-module",
          type: "module",
          label: "Bot Management",
          position: { x: 150, y: 250 },
          state: "error",
        },
        {
          id: "core-proxy",
          type: "proxy",
          label: "Core Proxy (FL)",
          position: { x: 500, y: 250 },
          state: "error",
          description: "Returning 5xx errors",
        },
        {
          id: "users",
          type: "cloud",
          label: "Users",
          position: { x: 800, y: 250 },
          state: "error",
          description: "Receiving errors",
        },
      ],
      connections: [
        {
          from: "bot-module",
          to: "core-proxy",
          label: "Module failure",
          active: true,
        },
        {
          from: "core-proxy",
          to: "users",
          label: "5xx errors",
          active: true,
        },
      ],
      highlights: ["core-proxy", "users"],
    },
    {
      stepNumber: 7,
      title: "Rollback and Recovery",
      description: "Stop propagation, deploy known-good file, restart services",
      timestamp: "14:24-17:06 UTC",
      components: [
        {
          id: "feature-file",
          type: "config",
          label: "Feature File",
          position: { x: 200, y: 200 },
          state: "resolved",
          description: "Rolled back to good version",
        },
        {
          id: "edge-network-1",
          type: "network",
          label: "Edge Server 1",
          position: { x: 450, y: 100 },
          state: "resolved",
        },
        {
          id: "edge-network-2",
          type: "network",
          label: "Edge Server 2",
          position: { x: 450, y: 250 },
          state: "resolved",
        },
        {
          id: "bot-module",
          type: "module",
          label: "Bot Management",
          position: { x: 450, y: 400 },
          state: "resolved",
        },
        {
          id: "core-proxy",
          type: "proxy",
          label: "Core Proxy (FL)",
          position: { x: 650, y: 400 },
          state: "resolved",
        },
        {
          id: "users",
          type: "cloud",
          label: "Users",
          position: { x: 900, y: 400 },
          state: "resolved",
          description: "Services restored",
        },
      ],
      connections: [
        {
          from: "feature-file",
          to: "edge-network-1",
          active: false,
        },
        {
          from: "feature-file",
          to: "edge-network-2",
          active: false,
        },
        {
          from: "edge-network-1",
          to: "bot-module",
          active: false,
        },
        {
          from: "bot-module",
          to: "core-proxy",
          active: false,
        },
        {
          from: "core-proxy",
          to: "users",
          active: false,
        },
      ],
      highlights: ["feature-file", "core-proxy", "users"],
    },
  ],
};
