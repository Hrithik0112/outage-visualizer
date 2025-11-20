"use client";

import { Database } from "./Database";
import { CloudService } from "./CloudService";
import { Network } from "./Network";
import { Proxy as ProxyComponent } from "./Proxy";
import { ConfigFile } from "./ConfigFile";
import { Query } from "./Query";
import { Module } from "./Module";
import type { InfrastructureComponent as InfrastructureComponentType } from "@/types/outage";

interface InfrastructureComponentProps {
  component: InfrastructureComponentType;
  size?: number;
  className?: string;
}

export function InfrastructureComponent({
  component,
  size,
  className,
}: InfrastructureComponentProps) {
  const commonProps = {
    label: component.label,
    state: component.state,
    size,
    className,
    description: component.description,
  };

  switch (component.type) {
    case "database":
      return <Database {...commonProps} />;
    case "cloud":
      return <CloudService {...commonProps} />;
    case "network":
      return <Network {...commonProps} />;
    case "proxy":
      return <ProxyComponent {...commonProps} />;
    case "config":
      return <ConfigFile {...commonProps} />;
    case "query":
      return <Query {...commonProps} />;
    case "module":
      return <Module {...commonProps} />;
    default:
      return (
        <div className="p-4 border rounded-lg">
          Unknown component type: {component.type}
        </div>
      );
  }
}
