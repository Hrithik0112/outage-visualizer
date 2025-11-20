"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: Array<{ title: string; description?: string }>;
  currentStep: number;
  className?: string;
  onStepClick?: (step: number) => void;
}

export function StepIndicator({
  steps,
  currentStep,
  className,
  onStepClick,
}: StepIndicatorProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isUpcoming = index > currentStep;

        return (
          <div
            key={index}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors",
              isCurrent && "bg-primary/10 border border-primary/20",
              !isCurrent && "hover:bg-accent",
              onStepClick && "cursor-pointer",
            )}
            onClick={() => onStepClick?.(index)}
          >
            {/* Step number/icon */}
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-colors shrink-0",
                isCompleted && "bg-primary text-primary-foreground",
                isCurrent &&
                  "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2",
                isUpcoming && "bg-muted text-muted-foreground",
              )}
            >
              {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
            </div>

            {/* Step content */}
            <div className="flex-1 min-w-0">
              <div
                className={cn(
                  "text-sm font-medium",
                  isCurrent && "text-primary",
                  isCompleted && "text-foreground",
                  isUpcoming && "text-muted-foreground",
                )}
              >
                {step.title}
              </div>
              {step.description && (
                <div className="text-xs text-muted-foreground mt-1">
                  {step.description}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
