"use client";

import { useState, useEffect } from "react";
import { SimulationCanvas } from "@/components/simulation/SimulationCanvas";
import { StepController } from "@/components/simulation/StepController";
import { StepIndicator } from "@/components/simulation/StepIndicator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cloudflareOutageData } from "@/data/outages/cloudflare-nov-2025";

export default function CloudflareOutagePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const totalSteps = cloudflareOutageData.steps.length;

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= totalSteps - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 3000); // 3 seconds per step

    return () => clearInterval(interval);
  }, [isPlaying, totalSteps]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setIsPlaying(false);
    }
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
    setIsPlaying(false);
  };

  const currentStepData = cloudflareOutageData.steps[currentStep];
  const { metadata } = cloudflareOutageData;

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold">{metadata.provider} Outage</h1>
          <Badge
            variant={
              metadata.severity === "critical" ? "destructive" : "default"
            }
          >
            {metadata.severity}
          </Badge>
        </div>
        <p className="text-muted-foreground text-lg">{metadata.date}</p>
        <p className="text-muted-foreground mt-2">{metadata.summary}</p>
      </div>

      <Separator className="my-6" />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Simulation Canvas - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{currentStepData.title}</CardTitle>
              <CardDescription>
                {currentStepData.description}
                {currentStepData.timestamp && (
                  <span className="ml-2 text-xs">
                    ({currentStepData.timestamp})
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <SimulationCanvas
                  step={currentStepData}
                  width={1000}
                  height={600}
                />
              </div>
            </CardContent>
          </Card>

          {/* Step Controller */}
          <div className="mt-4 flex justify-center">
            <StepController
              currentStep={currentStep}
              totalSteps={totalSteps}
              isPlaying={isPlaying}
              onPlay={handlePlay}
              onPause={handlePause}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          </div>
        </div>

        {/* Step Indicator - Takes 1 column */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
              <CardDescription>Step-by-step progression</CardDescription>
            </CardHeader>
            <CardContent>
              <StepIndicator
                steps={cloudflareOutageData.steps.map((step) => ({
                  title: step.title,
                  description: step.timestamp,
                }))}
                currentStep={currentStep}
                onStepClick={handleStepClick}
              />
            </CardContent>
          </Card>

          {/* Outage Details */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Outage Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-semibold mb-1">Duration</div>
                <div className="text-sm text-muted-foreground">
                  {metadata.duration}
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold mb-1">Root Cause</div>
                <div className="text-sm text-muted-foreground">
                  {metadata.rootCause}
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold mb-2">
                  Affected Services
                </div>
                <div className="flex flex-wrap gap-2">
                  {metadata.affectedServices.map((service) => (
                    <Badge key={service} variant="outline">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
