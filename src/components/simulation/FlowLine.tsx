"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlowLineProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  active: boolean;
  label?: string;
  className?: string;
}

export function FlowLine({
  fromX,
  fromY,
  toX,
  toY,
  active,
  label,
  className,
}: FlowLineProps) {
  // Calculate line properties
  const dx = toX - fromX;
  const dy = toY - fromY;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  // Calculate midpoint for label
  const midX = (fromX + toX) / 2;
  const midY = (fromY + toY) / 2;

  return (
    <g className={cn("flow-line", className)}>
      {/* Base line */}
      <line
        x1={fromX}
        y1={fromY}
        x2={toX}
        y2={toY}
        stroke={active ? "#fbbf24" : "#9ca3af"}
        strokeWidth={active ? 3 : 2}
        strokeDasharray={active ? "5,5" : "none"}
        opacity={active ? 1 : 0.3}
        className="transition-all duration-300"
      />

      {/* Animated flow indicator */}
      {active && (
        <motion.g
          initial={{ x: fromX, y: fromY }}
          animate={{ x: toX, y: toY }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <circle r={6} fill="#fbbf24" />
        </motion.g>
      )}

      {/* Arrow head */}
      <polygon
        points={`${toX},${toY} ${toX - 10},${toY - 5} ${toX - 10},${toY + 5}`}
        fill={active ? "#fbbf24" : "#9ca3af"}
        opacity={active ? 1 : 0.3}
        transform={`rotate(${angle} ${toX} ${toY})`}
        className="transition-all duration-300"
      />

      {/* Label */}
      {label && (
        <text
          x={midX}
          y={midY - 10}
          textAnchor="middle"
          fill={active ? "#92400e" : "#6b7280"}
          fontSize="12"
          fontWeight="500"
          className="pointer-events-none"
        >
          {label}
        </text>
      )}
    </g>
  );
}
