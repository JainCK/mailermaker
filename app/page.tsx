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
    <div className="max-w-6xl mx-auto bg-gradient-to-br from-purple-50 via-white to-pink-50 min-h-screen">
      {/* Hero Section */}
      <div className="text-center mb-16 px-4 pt-8">
        <div className="mb-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600">
              Effortless Newsletter
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 block">
              Content Creation
            </span>
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
            Convert Markdown and Rich Text into Clean HTML for your Email
            Campaigns. No backend required, works entirely in your browser.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link href="/create">
            <Button
              size="lg"
              className="w-full sm:w-auto text-lg px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              Start Creating Your Newsletter
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto text-lg px-8 py-4 border-2 border-purple-400 text-purple-700 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-400 hover:text-white font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            View Demo
          </Button>
        </div>

        <div className="flex items-center justify-center space-x-6 text-sm text-purple-700 font-semibold">
          <div className="flex items-center bg-green-100 px-3 py-2 rounded-full">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            No Registration Required
          </div>
          <div className="flex items-center bg-blue-100 px-3 py-2 rounded-full">
            <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
            Works Offline
          </div>
          <div className="flex items-center bg-yellow-100 px-3 py-2 rounded-full">
            <CheckCircle className="h-4 w-4 text-yellow-500 mr-2" />
            Instant Export
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Why Choose Our Newsletter Generator?
          </span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-purple-50 border-2 border-purple-200"
            >
              <div className="mb-4 flex justify-center">
                <div
                  className={`p-4 rounded-full shadow-lg ${
                    index === 0
                      ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                      : index === 1
                      ? "bg-gradient-to-r from-cyan-400 to-blue-400"
                      : index === 2
                      ? "bg-gradient-to-r from-green-400 to-emerald-400"
                      : "bg-gradient-to-r from-pink-400 to-red-400"
                  }`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-purple-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Steps Section */}
      <div className="mb-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600">
            How It Works
          </span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center transform hover:scale-105 transition-all duration-200"
            >
              <div className="mb-4 flex justify-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-2xl ${
                    index === 0
                      ? "bg-gradient-to-r from-purple-500 to-pink-500"
                      : index === 1
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                      : "bg-gradient-to-r from-green-500 to-emerald-500"
                  }`}
                >
                  {step.number}
                </div>
              </div>
              <div className="mb-4 flex justify-center">
                <div
                  className={`p-3 rounded-full shadow-lg ${
                    index === 0
                      ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                      : index === 1
                      ? "bg-gradient-to-r from-cyan-400 to-blue-400"
                      : "bg-gradient-to-r from-green-400 to-emerald-400"
                  }`}
                >
                  <step.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-purple-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mx-4 mb-8">
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl p-12 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Create Amazing Newsletters?
          </h2>
          <p className="text-xl mb-8 opacity-90 font-medium">
            Join thousands of content creators who trust our newsletter
            generator
          </p>
          <Link href="/create">
            <Button
              size="lg"
              className="text-lg px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-800 hover:from-yellow-500 hover:to-orange-500 font-bold shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              Get Started Now - It's Free!
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
