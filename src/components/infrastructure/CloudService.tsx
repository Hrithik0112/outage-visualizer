"use client";

import { Cloud } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ComponentState } from "@/types/outage";

interface CloudServiceProps {
  label: string;
  state: ComponentState;
  size?: number;
  className?: string;
  description?: string;
}

const stateColors = {
  normal: "text-blue-500",
  error: "text-red-500",
  propagating: "text-yellow-500",
  resolved: "text-green-500",
};

const stateBgColors = {
  normal: "bg-blue-50 dark:bg-blue-950",
  error: "bg-red-50 dark:bg-red-950",
  propagating: "bg-yellow-50 dark:bg-yellow-950",
  resolved: "bg-green-50 dark:bg-green-950",
};

const stateBorders = {
  normal: "border-blue-200 dark:border-blue-800",
  error: "border-red-200 dark:border-red-800",
  propagating: "border-yellow-200 dark:border-yellow-800",
  resolved: "border-green-200 dark:border-green-800",
};

export function CloudService({
  label,
  state,
  size = 48,
  className,
  description,
}: CloudServiceProps) {
  return (
    <motion.div
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors",
        stateBgColors[state],
        stateBorders[state],
        className,
      )}
      initial={{ scale: 1 }}
      animate={{
        scale: state === "error" ? [1, 1.05, 1] : 1,
      }}
      transition={{
        duration: 0.5,
        repeat: state === "error" ? Infinity : 0,
        repeatDelay: 1,
      }}
    >
      <motion.div
        animate={{
          y: state === "propagating" ? [0, -5, 0] : 0,
        }}
        transition={{
          duration: 1.5,
          repeat: state === "propagating" ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        <Cloud
          size={size}
          className={cn(stateColors[state], "transition-colors")}
        />
      </motion.div>
      <div className="text-center">
        <div className={cn("text-sm font-semibold", stateColors[state])}>
          {label}
        </div>
        {description && (
          <div className="text-xs text-muted-foreground mt-1">
            {description}
          </div>
        )}
        <div className="text-xs mt-1">
          <span
            className={cn(
              "px-2 py-0.5 rounded-full text-xs font-medium",
              state === "normal" &&
                "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
              state === "error" &&
                "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
              state === "propagating" &&
                "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
              state === "resolved" &&
                "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
            )}
          >
            {state}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
