'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Upload, 
  Database, 
  Terminal, 
  MessageSquare, 
  BarChart2, 
  Code, 
  Cpu, 
  ArrowRight
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  link
}) => (
  <Link href={link} className="block">
    <Card className="h-full group hover:bg-slate-800/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="p-2 rounded-lg bg-slate-800 text-primary-400 group-hover:text-primary-300 transition-colors duration-300">
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="text-lg font-medium text-slate-100">{title}</h3>
            <p className="text-sm text-slate-400">{description}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <span className="text-primary-400 group-hover:text-primary-300 text-sm inline-flex items-center">
            Learn more
            <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
          </span>
        </div>
      </CardContent>
    </Card>
  </Link>
);

const StatCard: React.FC<{ icon: LucideIcon; value: string; label: string }> = ({ 
  icon: Icon, 
  value, 
  label 
}) => (
  <Card className="bg-slate-800/50">
    <CardContent className="p-6">
      <Icon className="w-8 h-8 text-primary-400 mb-2" />
      <div className="space-y-1">
        <p className="text-3xl font-semibold text-slate-100">{value}</p>
        <p className="text-sm text-slate-400">{label}</p>
      </div>
    </CardContent>
  </Card>
);

const Dashboard: React.FC = () => {
  const mainFeatures = [
    {
      title: "Data Upload",
      description: "Upload and manage your datasets with CSV, Excel, and JSON support",
      icon: Upload,
      link: "/upload"
    },
    {
      title: "AI Analysis",
      description: "Get instant insights with GPT-4 powered data analysis",
      icon: Cpu,
      link: "/analyze"
    },
    {
      title: "Document Processing",
      description: "Process and analyze documents with RAG capabilities",
      icon: FileText,
      link: "/documents"
    }
  ];

  const tools = [
    {
      title: "Python Runtime",
      description: "Execute data analysis code in real-time",
      icon: Terminal,
      link: "/analyze"
    },
    {
      title: "Chat Interface",
      description: "Interact with your data using natural language",
      icon: MessageSquare,
      link: "/analyze"
    },
    {
      title: "Visualizations",
      description: "Create interactive charts and graphs",
      icon: BarChart2,
      link: "/visualize"
    },
    {
      title: "Code Generation",
      description: "Auto-generate Python code for analysis tasks",
      icon: Code,
      link: "/analyze"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">

      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-semibold text-slate-100">
          Welcome to <span className="text-primary-400">DataDuck</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Your AI-powered data analysis platform. Ask questions in plain English and get instant insights.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={Database} value="3+" label="File Formats" />
        <StatCard icon={Terminal} value="5+" label="Analysis Tools" />
        <StatCard icon={Cpu} value="10+" label="AI Features" />
      </div>

      {/* Main Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-medium text-slate-100">Main Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mainFeatures.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      {/* Tools Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-medium text-slate-100">Available Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool, index) => (
            <FeatureCard key={index} {...tool} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <Card className="bg-slate-800/50">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-medium text-slate-100 mb-2">Ready to get started?</h3>
              <p className="text-slate-400">Upload your first dataset and begin exploring.</p>
            </div>
            <Button asChild className="bg-primary-500 hover:bg-primary-600">
              <Link href="/upload">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;