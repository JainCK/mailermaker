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
      <div className="max-w-4xl mx-auto text-center">
        <Card className="p-12">
          <Mail className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            No Content to Preview
          </h1>
          <p className="text-gray-600 mb-6">
            Create some newsletter content first to see the HTML preview and
            export options.
          </p>
          <Button onClick={() => router.push("/create")} size="lg">
            <Edit className="mr-2 h-5 w-5" />
            Create Content
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto ">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Newsletter Preview & Export
        </h1>
        <p className="text-gray-600">
          Review your newsletter and customize the styling before exporting
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Customization Panel */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Palette className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Customization
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Primary Color
                </label>
                <Select
                  value={newsletter.primaryColor}
                  onValueChange={(value) => dispatch(setPrimaryColor(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: color.value }}
                          />
                          <span>{color.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Font Family
                </label>
                <Select
                  value={newsletter.fontFamily}
                  onValueChange={(value) => dispatch(setFontFamily(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        <span style={{ fontFamily: font.value }}>
                          {font.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Export Options
            </h3>
            <div className="space-y-3">
              <Button
                onClick={handleCopyHTML}
                className="w-full justify-start"
                variant={copied ? "default" : "outline"}
              >
                {copied ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Copied!
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
                className="w-full justify-start"
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Download HTML File
              </Button>

              <Button
                onClick={handleEditContent}
                className="w-full justify-start"
                variant="outline"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Content
              </Button>
            </div>
          </Card>

          <Card className="p-4 bg-green-50 border-green-200">
            <h4 className="text-sm font-medium text-green-900 mb-2">
              ✅ Email Ready
            </h4>
            <p className="text-xs text-green-800">
              Your HTML is optimized for email clients and includes inline
              styles for maximum compatibility.
            </p>
          </Card>
        </div>

        {/* Preview and Code Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={previewMode === "desktop" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPreviewMode("desktop")}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant={previewMode === "mobile" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPreviewMode("mobile")}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div
              className={`mx-auto transition-all duration-300 ${
                previewMode === "mobile" ? "max-w-sm" : "max-w-full"
              }`}
            >
              <div className="border rounded-lg overflow-hidden bg-white">
                <div
                  className="p-4 overflow-auto"
                  style={{
                    maxHeight: "600px",
                    fontSize: previewMode === "mobile" ? "14px" : "16px",
                  }}
                  dangerouslySetInnerHTML={{ __html: generatedHTML }}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <Tabs defaultValue="formatted" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-gray-600" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    HTML Code
                  </h2>
                </div>
                <TabsList>
                  <TabsTrigger value="formatted">Formatted</TabsTrigger>
                  <TabsTrigger value="raw">Raw</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="formatted">
                <div className="relative">
                  <Textarea
                    value={generatedHTML}
                    readOnly
                    className="font-mono text-xs h-64 resize-none"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
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
                  <pre className="bg-gray-50 p-4 rounded text-xs overflow-auto h-64 border">
                    <code>{generatedHTML}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
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
      <Card className="p-6 mt-8 bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          📧 How to Use Your HTML
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Email Platforms</h4>
            <p>
              Copy the HTML and paste it into your email marketing platform
              (Mailchimp, ConvertKit, etc.)
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Direct Email</h4>
            <p>
              Use the HTML directly in email clients that support HTML content
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Web Page</h4>
            <p>
              Save as an HTML file and host on your website as a newsletter
              archive
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
