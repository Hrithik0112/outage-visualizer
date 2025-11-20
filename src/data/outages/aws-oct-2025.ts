import type { OutageData } from "@/types/outage";

export const awsOutageData: OutageData = {
  metadata: {
    id: "aws-oct-2025",
    slug: "aws-oct-2025",
    provider: "AWS",
    date: "October 19-20, 2025",
    severity: "critical",
    duration: "~15 hours (11:48 PM PDT Oct 19 - 2:20 PM PDT Oct 20)",
    affectedServices: [
      "DynamoDB",
      "EC2",
      "Network Load Balancer",
      "Lambda",
      "ECS/EKS/Fargate",
      "Amazon Connect",
      "STS",
      "AWS Management Console",
      "Redshift",
      "AWS Support Console",
    ],
    rootCause:
      "Latent race condition in DynamoDB DNS management system caused endpoint resolution failures",
    summary:
      "A race condition in DynamoDB's automated DNS management system caused the deletion of DNS records for the regional endpoint, leading to widespread service failures across AWS services in us-east-1 Region.",
    rcaLink: "https://aws.amazon.com/message/101925/",
  },
  steps: [
    {
      stepNumber: 1,
      title: "DNS Planner Creates Plans",
      description:
        "DNS Planner monitors load balancers and creates DNS plans for endpoints",
      timestamp: "11:48 PM PDT Oct 19",
      components: [
        {
          id: "dns-planner",
          type: "query",
          label: "DNS Planner",
          position: { x: 300, y: 240 },
          state: "normal",
          description: "Creating DNS plans",
        },
        {
          id: "load-balancers",
          type: "network",
          label: "Load Balancers",
          position: { x: 700, y: 240 },
          state: "normal",
          description: "Hundreds of thousands of records",
        },
      ],
      connections: [
        {
          from: "dns-planner",
          to: "load-balancers",
          label: "Monitoring",
          active: true,
        },
      ],
      highlights: ["dns-planner"],
    },
    {
      stepNumber: 2,
      title: "DNS Enactor Race Condition",
      description:
        "First Enactor delayed, second Enactor applies newer plan and triggers cleanup",
      timestamp: "11:48 PM PDT Oct 19",
      components: [
        {
          id: "dns-planner",
          type: "query",
          label: "DNS Planner",
          position: { x: 200, y: 240 },
          state: "normal",
        },
        {
          id: "enactor-1",
          type: "module",
          label: "DNS Enactor 1",
          position: { x: 500, y: 150 },
          state: "error",
          description: "Delayed processing",
        },
        {
          id: "enactor-2",
          type: "module",
          label: "DNS Enactor 2",
          position: { x: 500, y: 350 },
          state: "propagating",
          description: "Applying newer plan",
        },
        {
          id: "route53",
          type: "cloud",
          label: "Route53",
          position: { x: 800, y: 350 },
          state: "error",
          description: "DNS records",
        },
      ],
      connections: [
        {
          from: "dns-planner",
          to: "enactor-1",
          label: "Old plan",
          active: true,
        },
        {
          from: "dns-planner",
          to: "enactor-2",
          label: "New plan",
          active: true,
        },
        {
          from: "enactor-2",
          to: "route53",
          label: "Update DNS",
          active: true,
        },
      ],
      highlights: ["enactor-1", "enactor-2"],
    },
    {
      stepNumber: 3,
      title: "Old Plan Overwrites New Plan",
      description:
        "Delayed Enactor 1 applies old plan, overwriting the newer plan in Route53",
      timestamp: "11:48 PM PDT Oct 19",
      components: [
        {
          id: "enactor-1",
          type: "module",
          label: "DNS Enactor 1",
          position: { x: 200, y: 240 },
          state: "error",
          description: "Applies old plan",
        },
        {
          id: "enactor-2",
          type: "module",
          label: "DNS Enactor 2",
          position: { x: 800, y: 240 },
          state: "error",
          description: "Cleanup deletes plan",
        },
        {
          id: "route53",
          type: "cloud",
          label: "Route53",
          position: { x: 500, y: 400 },
          state: "error",
          description: "DNS records deleted",
        },
      ],
      connections: [
        {
          from: "enactor-1",
          to: "route53",
          label: "Overwrites",
          active: true,
        },
        {
          from: "enactor-2",
          to: "route53",
          label: "Deletes plan",
          active: true,
        },
      ],
      highlights: ["route53"],
    },
    {
      stepNumber: 4,
      title: "DynamoDB Endpoint Fails",
      description:
        "DNS records for dynamodb.us-east-1.amazonaws.com deleted, endpoint resolution fails",
      timestamp: "11:48 PM PDT Oct 19",
      components: [
        {
          id: "route53",
          type: "cloud",
          label: "Route53",
          position: { x: 300, y: 150 },
          state: "error",
          description: "Empty DNS record",
        },
        {
          id: "dynamodb-endpoint",
          type: "proxy",
          label: "DynamoDB Endpoint",
          position: { x: 700, y: 150 },
          state: "error",
          description: "dynamodb.us-east-1.amazonaws.com",
        },
        {
          id: "customers",
          type: "cloud",
          label: "Customers & Services",
          position: { x: 500, y: 400 },
          state: "error",
          description: "DNS resolution fails",
        },
      ],
      connections: [
        {
          from: "route53",
          to: "dynamodb-endpoint",
          label: "No DNS records",
          active: true,
        },
        {
          from: "dynamodb-endpoint",
          to: "customers",
          label: "Connection fails",
          active: true,
        },
      ],
      highlights: ["dynamodb-endpoint", "customers"],
    },
    {
      stepNumber: 5,
      title: "Cascading Failures Begin",
      description:
        "Services dependent on DynamoDB begin failing: EC2, Lambda, ECS, Connect, etc.",
      timestamp: "11:48 PM - 2:40 AM PDT Oct 20",
      components: [
        {
          id: "dynamodb-endpoint",
          type: "proxy",
          label: "DynamoDB",
          position: { x: 200, y: 240 },
          state: "error",
        },
        {
          id: "ec2",
          type: "cloud",
          label: "EC2",
          position: { x: 400, y: 100 },
          state: "error",
          description: "Instance launches fail",
        },
        {
          id: "lambda",
          type: "module",
          label: "Lambda",
          position: { x: 400, y: 400 },
          state: "error",
          description: "Function errors",
        },
        {
          id: "nlb",
          type: "network",
          label: "Network Load Balancer",
          position: { x: 650, y: 180 },
          state: "error",
          description: "Health check failures",
        },
        {
          id: "other-services",
          type: "cloud",
          label: "Other Services",
          position: { x: 650, y: 380 },
          state: "error",
          description: "ECS, Connect, STS, etc.",
        },
      ],
      connections: [
        {
          from: "dynamodb-endpoint",
          to: "ec2",
          active: true,
        },
        {
          from: "dynamodb-endpoint",
          to: "lambda",
          active: true,
        },
        {
          from: "dynamodb-endpoint",
          to: "nlb",
          active: true,
        },
        {
          from: "dynamodb-endpoint",
          to: "other-services",
          active: true,
        },
      ],
      highlights: ["ec2", "lambda", "nlb", "other-services"],
    },
    {
      stepNumber: 6,
      title: "DynamoDB DNS Restored",
      description:
        "Engineers identify issue and manually restore DNS records in Route53",
      timestamp: "2:25 AM PDT Oct 20",
      components: [
        {
          id: "engineers",
          type: "query",
          label: "AWS Engineers",
          position: { x: 200, y: 240 },
          state: "normal",
          description: "Manual intervention",
        },
        {
          id: "route53",
          type: "cloud",
          label: "Route53",
          position: { x: 500, y: 240 },
          state: "resolved",
          description: "DNS restored",
        },
        {
          id: "dynamodb-endpoint",
          type: "proxy",
          label: "DynamoDB Endpoint",
          position: { x: 750, y: 240 },
          state: "resolved",
          description: "Endpoint accessible",
        },
      ],
      connections: [
        {
          from: "engineers",
          to: "route53",
          label: "Restore DNS",
          active: true,
        },
        {
          from: "route53",
          to: "dynamodb-endpoint",
          active: false,
        },
      ],
      highlights: ["route53", "dynamodb-endpoint"],
    },
    {
      stepNumber: 7,
      title: "Full Recovery",
      description:
        "All services recover as DNS caches expire and EC2 launches resume",
      timestamp: "1:50 PM - 2:20 PM PDT Oct 20",
      components: [
        {
          id: "dynamodb-endpoint",
          type: "proxy",
          label: "DynamoDB",
          position: { x: 150, y: 240 },
          state: "resolved",
        },
        {
          id: "ec2",
          type: "cloud",
          label: "EC2",
          position: { x: 400, y: 240 },
          state: "resolved",
          description: "Launches resume",
        },
        {
          id: "lambda",
          type: "module",
          label: "Lambda",
          position: { x: 600, y: 240 },
          state: "resolved",
        },
        {
          id: "nlb",
          type: "network",
          label: "Network Load Balancer",
          position: { x: 850, y: 240 },
          state: "resolved",
        },
      ],
      connections: [
        {
          from: "dynamodb-endpoint",
          to: "ec2",
          active: false,
        },
        {
          from: "dynamodb-endpoint",
          to: "lambda",
          active: false,
        },
        {
          from: "dynamodb-endpoint",
          to: "nlb",
          active: false,
        },
      ],
      highlights: ["dynamodb-endpoint", "ec2", "lambda", "nlb"],
    },
  ],
};

