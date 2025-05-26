"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RootState } from "@/store/store";
import { setPrimaryColor, setFontFamily } from "@/store/newsletterSlice";
import { generateEmailHTML } from "@/lib/markdownParser";
import { copyToClipboard, downloadFile } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Copy,
  Download,
  Edit,
  Eye,
  Code,
  Palette,
  Type,
  CheckCircle,
  Mail,
  Smartphone,
  Monitor,
  Sparkles,
  Star,
} from "lucide-react";

export default function PreviewPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const newsletter = useSelector((state: RootState) => state.newsletter);
  const [copied, setCopied] = useState(false);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">(
    "desktop"
  );

  const colorOptions = [
    { value: "#3b82f6", label: "Blue" },
    { value: "#10b981", label: "Green" },
    { value: "#f59e0b", label: "Yellow" },
    { value: "#ef4444", label: "Red" },
    { value: "#8b5cf6", label: "Purple" },
    { value: "#06b6d4", label: "Cyan" },
    { value: "#84cc16", label: "Lime" },
    { value: "#f97316", label: "Orange" },
  ];

  const fontOptions = [
    { value: "Arial, sans-serif", label: "Arial" },
    { value: "Georgia, serif", label: "Georgia" },
    { value: '"Times New Roman", serif', label: "Times New Roman" },
    {
      value: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      label: "Helvetica",
    },
    { value: "Verdana, sans-serif", label: "Verdana" },
  ];

  const generatedHTML = generateEmailHTML(
    newsletter.title,
    newsletter.content,
    newsletter.editorMode === "markdown",
    newsletter.primaryColor,
    newsletter.fontFamily
  );

  const handleCopyHTML = async () => {
    const success = await copyToClipboard(generatedHTML);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadHTML = () => {
    const filename = newsletter.title
      ? `${newsletter.title.toLowerCase().replace(/\s+/g, "-")}.html`
      : "newsletter.html";
    downloadFile(generatedHTML, filename);
  };

  const handleEditContent = () => {
    router.push("/create");
  };

  if (!newsletter.title.trim() && !newsletter.content.trim()) {
    return (
      <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-purple-50 via-white to-pink-50 min-h-screen pt-16">
        <Card className="p-12 bg-gradient-to-br from-white to-purple-50 border-2 border-purple-300 shadow-2xl">
          <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <Mail className="h-12 w-12 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              No Content to Preview
            </span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 font-medium">
            Create some newsletter content first to see the HTML preview and
            export options. ✨
          </p>
          <Button
            onClick={() => router.push("/create")}
            size="lg"
            className="text-lg px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold shadow-2xl transform hover:scale-105 transition-all duration-200"
          >
            <Edit className="mr-2 h-5 w-5" />
            Create Content
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-min-screen mx-auto bg-gradient-to-br from-purple-50 via-white to-pink-50 min-h-screen px-4 lg:px-6 xl:px-8">
      <div className="mb-8 text-center pt-8">
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600">
            Newsletter Preview & Export
          </span>
        </h1>
        <p className="text-xl text-gray-700 font-medium">
          Review your newsletter and customize the styling before exporting ✨
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 max-w-screen">
        {/* Customization Panel */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="p-6 bg-gradient-to-br from-white to-purple-50 border-2 border-purple-200 shadow-xl">
            <div className="flex items-center space-x-2 mb-4">
              <Palette className="h-6 w-6 text-purple-600" />
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Customization
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-purple-800 mb-2 block items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                  Primary Color
                </label>
                <Select
                  value={newsletter.primaryColor}
                  onValueChange={(value) => dispatch(setPrimaryColor(value))}
                >
                  <SelectTrigger className="border-2 border-purple-300 focus:border-pink-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-4 h-4 rounded border"
                            style={{ backgroundColor: color.value }}
                          />
                          <span className="font-medium">{color.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-bold text-purple-800 mb-2 block items-center">
                  <Type className="h-4 w-4 mr-1 text-cyan-500" />
                  Font Family
                </label>
                <Select
                  value={newsletter.fontFamily}
                  onValueChange={(value) => dispatch(setFontFamily(value))}
                >
                  <SelectTrigger className="border-2 border-purple-300 focus:border-pink-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        <span
                          style={{ fontFamily: font.value }}
                          className="font-medium"
                        >
                          {font.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-white to-cyan-50 border-2 border-cyan-200 shadow-xl">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 mb-4 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
              Export Options
            </h3>
            <div className="space-y-3">
              <Button
                onClick={handleCopyHTML}
                className={`w-full justify-start text-base font-bold shadow-lg transform hover:scale-105 transition-all duration-200 ${
                  copied
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                    : "bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-800 hover:from-yellow-500 hover:to-orange-500"
                }`}
              >
                {copied ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Copied! ✨
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy HTML
                  </>
                )}
              </Button>

              <Button
                onClick={handleDownloadHTML}
                className="w-full justify-start text-base font-bold shadow-lg transform hover:scale-105 transition-all duration-200 bg-gradient-to-r from-cyan-400 to-blue-400 text-white hover:from-cyan-500 hover:to-blue-500"
              >
                <Download className="mr-2 h-4 w-4" />
                Download HTML File
              </Button>

              <Button
                onClick={handleEditContent}
                className="w-full justify-start text-base font-bold shadow-lg transform hover:scale-105 transition-all duration-200 bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Content
              </Button>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 shadow-lg">
            <h4 className="text-base font-bold text-green-800 mb-2 flex items-center">
              ✅ Email Ready
              <Sparkles className="h-4 w-4 ml-2 text-yellow-500" />
            </h4>
            <p className="text-sm text-green-700 font-medium">
              Your HTML is optimized for email clients and includes inline
              styles for maximum compatibility. 🚀
            </p>
          </Card>
        </div>

        {/* Preview and Code Section */}
        <div className="xl:col-span-2 space-y-6">
          <Card className="p-6 bg-gradient-to-br from-white to-green-50 border-2 border-green-200 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Eye className="h-6 w-6 text-green-600" />
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                  Preview
                </h2>
              </div>
            </div>

            <div className="border-2 border-green-3300 rounded-xl overflow-hidden bg-white shadow-xl">
              <div className="p-5 overflow-auto bg-gradient-to-br from-green-50/30 via-white to-cyan-50/30">
                <div
                  className="w-full"
                  style={{
                    maxWidth: "100%",
                    overflow: "hidden",
                    wordWrap: "break-word",
                    display: "block",
                  }}
                >
                  <iframe
                    srcDoc={generatedHTML}
                    className="w-full h-96 border-0"
                    style={{
                      width: "100%",
                      minHeight: "400px",
                      border: "none",
                    }}
                    sandbox="allow-same-origin allow-scripts"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 shadow-xl">
            <Tabs defaultValue="formatted" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Code className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    HTML Code
                  </h2>
                </div>
                <TabsList className="bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-300">
                  <TabsTrigger
                    value="formatted"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-400 data-[state=active]:to-purple-400 data-[state=active]:text-white font-bold"
                  >
                    Formatted
                  </TabsTrigger>
                  <TabsTrigger
                    value="raw"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-400 data-[state=active]:to-blue-400 data-[state=active]:text-white font-bold"
                  >
                    Raw
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="formatted">
                <div className="relative">
                  <Textarea
                    value={generatedHTML}
                    readOnly
                    className="font-mono text-xs h-64 resize-none border-2 border-blue-300 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50"
                  />
                  <Button
                    size="sm"
                    className={`absolute top-2 right-4 font-bold shadow-lg transition-all duration-200 transform hover:scale-105 ${
                      copied
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                        : "bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-800 hover:from-yellow-500 hover:to-orange-500"
                    }`}
                    onClick={handleCopyHTML}
                  >
                    {copied ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="raw">
                <div className="relative">
                  <pre className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded text-xs overflow-auto h-64 border-2 border-gray-300">
                    <code>{generatedHTML}</code>
                  </pre>
                  <Button
                    size="sm"
                    className={`absolute top-2 right-4 font-bold shadow-lg transition-all duration-200 transform hover:scale-105 ${
                      copied
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                        : "bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-800 hover:from-yellow-500 hover:to-orange-500"
                    }`}
                    onClick={handleCopyHTML}
                  >
                    {copied ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>

      {/* Usage Instructions */}
      <Card className="p-6 mt-8 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 border-2 border-blue-300 shadow-xl">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 mb-4 flex items-center">
          📧 How to Use Your HTML
          <Sparkles className="h-6 w-6 ml-2 text-yellow-500" />
        </h3>
        <div className="grid md:grid-cols-3 gap-6 text-base font-medium">
          <div className="bg-white/70 p-4 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold mb-2 text-blue-800">Email Platforms 📨</h4>
            <p className="text-blue-700">
              Copy the HTML and paste it into your email marketing platform
              (Mailchimp, ConvertKit, etc.)
            </p>
          </div>
          <div className="bg-white/70 p-4 rounded-lg border-l-4 border-purple-500">
            <h4 className="font-bold mb-2 text-purple-800">Direct Email 💌</h4>
            <p className="text-purple-700">
              Use the HTML directly in email clients that support HTML content
            </p>
          </div>
          <div className="bg-white/70 p-4 rounded-lg border-l-4 border-pink-500">
            <h4 className="font-bold mb-2 text-pink-800">Web Page 🌐</h4>
            <p className="text-pink-700">
              Save as an HTML file and host on your website as a newsletter
              archive
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
