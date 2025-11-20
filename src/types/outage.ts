/**
 * Component states in the simulation
 */
export type ComponentState = "normal" | "error" | "propagating" | "resolved";

/**
 * Types of infrastructure components
 */
export type ComponentType =
  | "database"
  | "cloud"
  | "network"
  | "proxy"
  | "config"
  | "query"
  | "module";

/**
 * Position of a component on the canvas
 */
export interface ComponentPosition {
  x: number;
  y: number;
}

/**
 * An infrastructure component in the simulation
 */
export interface InfrastructureComponent {
  id: string;
  type: ComponentType;
  label: string;
  position: ComponentPosition;
  state: ComponentState;
  description?: string;
}

/**
 * A flow connection between components
 */
export interface FlowConnection {
  from: string; // component id
  to: string; // component id
  label?: string;
  active: boolean;
}

/**
 * A single step in the simulation
 */
export interface SimulationStep {
  stepNumber: number;
  title: string;
  description: string;
  timestamp?: string;
  components: InfrastructureComponent[];
  connections: FlowConnection[];
  highlights?: string[]; // component ids to highlight
}

/**
 * Outage metadata
 */
export interface OutageMetadata {
  id: string;
  slug: string;
  provider: string;
  date: string;
  severity: "low" | "medium" | "high" | "critical";
  duration: string;
  affectedServices: string[];
  rootCause: string;
  summary: string;
  rcaLink?: string;
}

/**
 * Complete outage data structure
 */
export interface OutageData {
  metadata: OutageMetadata;
  steps: SimulationStep[];
}
