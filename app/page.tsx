"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Zap,
  Code,
  Eye,
  Smartphone,
  ArrowRight,
  CheckCircle,
  FileText,
  Mail,
  Palette,
} from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: Zap,
      title: "Simplified Workflow",
      description:
        "Create beautiful newsletters in minutes, not hours. No technical expertise required.",
    },
    {
      icon: Code,
      title: "Clean HTML Output",
      description:
        "Generate email-optimized HTML that works perfectly across all email clients.",
    },
    {
      icon: Eye,
      title: "Visual Editing",
      description:
        "Switch between Markdown and rich text editing with real-time preview.",
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description:
        "Create responsive newsletters that look great on any device.",
    },
  ];

  const steps = [
    {
      number: 1,
      icon: FileText,
      title: "Create Content",
      description:
        "Write your newsletter using Markdown or our rich text editor",
    },
    {
      number: 2,
      icon: Palette,
      title: "Customize Style",
      description: "Choose colors and fonts to match your brand",
    },
    {
      number: 3,
      icon: Mail,
      title: "Export HTML",
      description: "Get clean, email-ready HTML code to use anywhere",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16 px-4">
        <div className="mb-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Effortless Newsletter
            <span className="text-blue-600 block">Content Creation</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Convert Markdown and Rich Text into Clean HTML for your Email
            Campaigns. No backend required, works entirely in your browser.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link href="/create">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-3">
              Start Creating Your Newsletter
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto text-lg px-8 py-3"
          >
            View Demo
          </Button>
        </div>

        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            No Registration Required
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            Works Offline
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            Instant Export
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose Our Newsletter Generator?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4 flex justify-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="relative">
                  <div className="p-4 bg-blue-600 rounded-full">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-white border-2 border-blue-600 rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">
                      {step.number}
                    </span>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Create Amazing Newsletters?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of content creators who trust our newsletter generator
        </p>
        <Link href="/create">
          <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
            Get Started Now - It's Free!
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
