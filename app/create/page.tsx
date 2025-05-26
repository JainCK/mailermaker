"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { setTitle, setContent, setEditorMode } from "@/store/newsletterSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import MarkdownEditor from "@/components/MarkdownEditor";
import RichTextEditor from "@/components/RichTextEditor";
import { parseMarkdown } from "@/lib/markdownParser";
import {
  ArrowRight,
  FileText,
  Type,
  Eye,
  Trash2,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function CreatePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const newsletter = useSelector((state: RootState) => state.newsletter);
  const [showPreview, setShowPreview] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value));
  };

  const handleContentChange = (content: string) => {
    dispatch(setContent(content));
  };

  const handleEditorModeChange = (mode: "markdown" | "richtext") => {
    dispatch(setEditorMode(mode));
  };

  const handleGenerateHTML = () => {
    if (!newsletter.title.trim() && !newsletter.content.trim()) {
      alert("Please add a title or content before generating HTML.");
      return;
    }
    router.push("/preview");
  };

  const getPreviewContent = () => {
    if (!newsletter.content.trim())
      return "<p>Start writing to see preview...</p>";

    if (newsletter.editorMode === "markdown") {
      return parseMarkdown(newsletter.content);
    }
    return newsletter.content;
  };

  return (
    <div className="max-w-7xl mx-auto bg-gradient-to-br from-purple-50 via-white to-pink-50 min-h-screen">
      <div className="mb-8 text-center pt-8">
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600">
            Create Your Newsletter Content
          </span>
        </h1>
        <p className="text-xl text-gray-700 font-medium">
          Write your content using Markdown or our rich text editor, then
          generate clean HTML ✨
        </p>
      </div>

      {/* Title Input */}
      <Card className="p-6 mb-6 bg-gradient-to-br from-white to-purple-50 border-2 border-purple-200 shadow-xl">
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="text-lg font-bold text-purple-800 flex items-center"
          >
            <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
            Newsletter Title/Subject Line
          </label>
          <Input
            id="title"
            type="text"
            placeholder="Enter your newsletter title..."
            value={newsletter.title}
            onChange={handleTitleChange}
            className="text-lg border-2 border-purple-300 focus:border-pink-400 bg-gradient-to-r from-purple-50 to-pink-50"
          />
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Editor Section */}
        <div className="space-y-4">
          <Card className="p-6 bg-gradient-to-br from-white to-cyan-50 border-2 border-cyan-200 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Content Editor
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="lg:hidden border-2 border-purple-400 text-purple-700 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-400 hover:text-white font-bold transform hover:scale-105 transition-all duration-200"
              >
                <Eye className="h-4 w-4 mr-2" />
                {showPreview ? "Hide Preview" : "Show Preview"}
              </Button>
            </div>

            <Tabs
              value={newsletter.editorMode}
              onValueChange={(value) =>
                handleEditorModeChange(value as "markdown" | "richtext")
              }
              className="space-y-4"
            >
              <TabsList className="grid w-full grid-cols-2 mb-4 bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300">
                <TabsTrigger
                  value="richtext"
                  className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-orange-400 data-[state=active]:text-purple-800 font-bold"
                >
                  <Type className="h-4 w-4" />
                  <span>Rich Text</span>
                </TabsTrigger>
                <TabsTrigger
                  value="markdown"
                  className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-400 data-[state=active]:to-blue-400 data-[state=active]:text-purple-800 font-bold"
                >
                  <FileText className="h-4 w-4" />
                  <span>Markdown</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="richtext" className="space-y-4">
                <RichTextEditor
                  value={newsletter.content}
                  onChange={handleContentChange}
                  placeholder="Start writing your newsletter content..."
                />
              </TabsContent>

              <TabsContent value="markdown" className="space-y-4">
                <MarkdownEditor
                  value={newsletter.content}
                  onChange={handleContentChange}
                  placeholder="# Welcome to My Newsletter

Write your newsletter content here using **Markdown**...

## Features
- Easy to use
- Clean HTML output
- Email optimized

[Learn more](https://example.com)"
                />
              </TabsContent>
            </Tabs>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleGenerateHTML}
              size="lg"
              className="flex-1 text-lg px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold shadow-2xl transform hover:scale-105 transition-all duration-200"
              disabled={!newsletter.title.trim() && !newsletter.content.trim()}
            >
              Generate HTML ✨
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                if (confirm("Are you sure you want to clear all content?")) {
                  dispatch(setTitle(""));
                  dispatch(setContent(""));
                }
              }}
              className="text-lg border-2 border-red-400 text-red-700 hover:bg-gradient-to-r hover:from-red-400 hover:to-pink-400 hover:text-white font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Trash2 className="mr-2 h-5 w-5" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Preview Section */}
        <div
          className={`space-y-4 ${showPreview ? "block" : "hidden lg:block"}`}
        >
          <Card className="p-6 bg-gradient-to-br from-white to-green-50 border-2 border-green-200 shadow-xl">
            <div className="flex items-center space-x-2 mb-4">
              <Eye className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                Live Preview
              </h2>
            </div>

            <div className="border-2 border-green-300 rounded-xl p-4 bg-gradient-to-br from-green-50/50 via-white to-emerald-50/50 min-h-[400px] overflow-auto shadow-inner">
              {newsletter.title && (
                <div className="mb-6 pb-4 border-b-2 border-purple-200">
                  <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-700">
                    {newsletter.title}
                  </h1>
                </div>
              )}

              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html: getPreviewContent(),
                }}
              />
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-4 bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-300 shadow-lg">
            <h3 className="text-lg font-bold text-orange-800 mb-3 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-yellow-600" />
              Content Stats
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm font-bold">
              <div className="bg-white/70 p-3 rounded-lg">
                <span className="text-orange-700">Characters:</span>
                <span className="ml-2 text-purple-800 text-lg">
                  {newsletter.content.length}
                </span>
              </div>
              <div className="bg-white/70 p-3 rounded-lg">
                <span className="text-orange-700">Words:</span>
                <span className="ml-2 text-purple-800 text-lg">
                  {newsletter.content.trim()
                    ? newsletter.content.trim().split(/\s+/).length
                    : 0}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Tips Section */}
      <Card className="p-6 mt-8 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 border-2 border-blue-300 shadow-xl">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 mb-4 flex items-center">
          💡 Pro Tips
          <Sparkles className="h-6 w-6 ml-2 text-yellow-500" />
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-base font-medium">
          <div className="space-y-3">
            <div className="bg-white/70 p-4 rounded-lg border-l-4 border-purple-500">
              <p className="text-purple-800">
                <strong className="text-purple-900">Rich Text Editor:</strong>{" "}
                Perfect for visual editing with formatting toolbar ✨
              </p>
            </div>
            <div className="bg-white/70 p-4 rounded-lg border-l-4 border-cyan-500">
              <p className="text-cyan-800">
                <strong className="text-cyan-900">Markdown:</strong> Great for
                those who prefer writing with syntax 📝
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-white/70 p-4 rounded-lg border-l-4 border-green-500">
              <p className="text-green-800">
                <strong className="text-green-900">Preview:</strong> Check how
                your newsletter will look before exporting 👀
              </p>
            </div>
            <div className="bg-white/70 p-4 rounded-lg border-l-4 border-pink-500">
              <p className="text-pink-800">
                <strong className="text-pink-900">Mobile Friendly:</strong> All
                generated HTML is responsive by default 📱
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
