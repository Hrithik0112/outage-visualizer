"use client";

import { InfrastructureComponent } from "../infrastructure/InfrastructureComponent";
import { FlowLine } from "./FlowLine";
import type { SimulationStep } from "@/types/outage";

interface SimulationCanvasProps {
  step: SimulationStep;
  width?: number;
  height?: number;
  className?: string;
}

export function SimulationCanvas({
  step,
  width = 1200,
  height = 800,
  className,
}: SimulationCanvasProps) {
  // Helper to get component center position
  const getComponentCenter = (componentId: string) => {
    const component = step.components.find((c) => c.id === componentId);
    if (!component) return { x: 0, y: 0 };
    // Approximate center of component (component is ~100px wide, 120px tall)
    return {
      x: component.position.x,
      y: component.position.y,
    };
  };

  return (
    <div
      className={`relative border rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden ${className || ""}`}
      style={{ width, height, minHeight: height }}
    >
      {/* SVG overlay for flow lines */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={width}
        height={height}
      >
        {step.connections.map((connection, index) => {
          const from = getComponentCenter(connection.from);
          const to = getComponentCenter(connection.to);
          return (
            <FlowLine
              key={`${connection.from}-${connection.to}-${index}`}
              fromX={from.x}
              fromY={from.y}
              toX={to.x}
              toY={to.y}
              active={connection.active}
              label={connection.label}
            />
          );
        })}
      </svg>

      {/* Infrastructure components */}
      {step.components.map((component) => (
        <div
          key={component.id}
          className="absolute"
          style={{
            left: `${component.position.x}px`,
            top: `${component.position.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <InfrastructureComponent component={component} />
        </div>
      ))}
    </div>
  );
}
