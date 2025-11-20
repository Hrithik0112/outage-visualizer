"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowLeft, Github } from "lucide-react";
import { SimulationCanvas } from "@/components/simulation/SimulationCanvas";
import { StepController } from "@/components/simulation/StepController";
import { StepIndicator } from "@/components/simulation/StepIndicator";
import { InfrastructureComponent } from "@/components/infrastructure/InfrastructureComponent";
import { ThemeToggle } from "@/components/theme-toggle";
import { OutageIcon } from "@/components/OutageIcon";
import { awsOutageData } from "@/data/outages/aws-oct-2025";

export default function AWSOutagePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const totalSteps = awsOutageData.steps.length;

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

  const currentStepData = awsOutageData.steps[currentStep];
  const { metadata } = awsOutageData;

  return (
    <div className="flex min-h-screen relative max-w-4xl mx-auto">
      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Collapsible Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-background border-r-2 border-foreground z-40 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "320px" }}
      >
        <div className="h-full overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-4 border-b-2 border-foreground pb-3">
            <div className="text-sm font-bold font-mono">TIMELINE</div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="border-2 border-foreground p-1 hover:bg-muted transition-colors"
              aria-label="Close timeline"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
          <StepIndicator
            steps={awsOutageData.steps.map((step) => ({
              title: step.title,
              description: step.timestamp,
            }))}
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-0" : "ml-0"
        }`}
      >
        <div className="container mx-auto py-8 px-4 max-w-7xl">
          {/* Sidebar Toggle Button */}
          {!isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="fixed left-4 top-1/2 -translate-y-1/2 z-30 border-2 border-foreground bg-background p-2 hover:bg-muted transition-colors"
              aria-label="Open timeline"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}

          {/* Header with Logo and GitHub */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 border-2 border-foreground px-4 py-2 hover:bg-muted transition-colors font-mono text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              BACK
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-bold"
              >
                <OutageIcon className="h-5 w-5" />
                OUTAGE VISUALIZER
              </Link>
              <a
                href="https://github.com/hrithikdutta/outage-visualizer"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-foreground p-2 hover:bg-muted transition-colors"
                aria-label="GitHub repository"
              >
                <Github className="h-4 w-4" />
              </a>
              <ThemeToggle />
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold">
                {metadata.provider.toUpperCase()} OUTAGE
              </h1>
              <div className="text-xs font-mono border-2 border-foreground px-2 py-1">
                {metadata.severity.toUpperCase()}
              </div>
            </div>
            <p className="text-muted-foreground text-sm font-mono mb-2">
              {metadata.date}
            </p>
            <p className="text-sm text-muted-foreground font-mono mb-3">
              {metadata.summary}
            </p>
            {metadata.rcaLink && (
              <a
                href={metadata.rcaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-foreground px-4 py-2 hover:bg-muted transition-colors font-mono text-xs"
              >
                READ FULL RCA
                <ArrowLeft className="h-3 w-3 rotate-180" />
              </a>
            )}
          </div>

          {/* Compact Step Controller at Top */}
          <div className="mb-6 border-2 border-foreground p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <div className="text-xs font-mono">
                  STEP {currentStep + 1}/{totalSteps}
                </div>
                <div className="text-sm font-bold font-mono">
                  {currentStepData.title}
                </div>
                {currentStepData.timestamp && (
                  <div className="text-xs text-muted-foreground font-mono">
                    {currentStepData.timestamp}
                  </div>
                )}
              </div>
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
            <div className="text-xs text-muted-foreground font-mono">
              {currentStepData.description}
            </div>
          </div>

          {/* Full Canvas - Main Focus */}
          <div className="mb-6 w-full">
            <SimulationCanvas
              step={currentStepData}
              width={1000}
              height={550}
              className="w-full"
            />
          </div>

          {/* Affected Services */}
          <div className="border-2 border-foreground p-6">
            <div className="text-sm font-bold font-mono mb-4">
              AFFECTED SERVICES
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {metadata.affectedServices.map((service, index) => (
                <div
                  key={index}
                  className="border-2 border-foreground p-4 flex flex-col items-center gap-2"
                >
                  <InfrastructureComponent
                    component={{
                      id: `service-${index}`,
                      type: "cloud",
                      label: service,
                      position: { x: 0, y: 0 },
                      state: "error",
                    }}
                    size={32}
                    className="border-0"
                  />
                  <div className="text-xs font-mono text-center">
                    {service}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

