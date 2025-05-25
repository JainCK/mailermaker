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
import { ArrowRight, FileText, Type, Eye } from "lucide-react";
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
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create Your Newsletter Content
        </h1>
        <p className="text-gray-600">
          Write your content using Markdown or our rich text editor, then
          generate clean HTML
        </p>
      </div>

      {/* Title Input */}
      <Card className="p-6 mb-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            Newsletter Title/Subject Line
          </label>
          <Input
            id="title"
            type="text"
            placeholder="Enter your newsletter title..."
            value={newsletter.title}
            onChange={handleTitleChange}
            className="text-lg"
          />
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Editor Section */}
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Content Editor
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="lg:hidden"
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
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger
                  value="richtext"
                  className="flex items-center space-x-2"
                >
                  <Type className="h-4 w-4" />
                  <span>Rich Text</span>
                </TabsTrigger>
                <TabsTrigger
                  value="markdown"
                  className="flex items-center space-x-2"
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
              className="flex-1 text-base"
              disabled={!newsletter.title.trim() && !newsletter.content.trim()}
            >
              Generate HTML
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
              className="text-base"
            >
              Clear All
            </Button>
          </div>
        </div>

        {/* Preview Section */}
        <div
          className={`space-y-4 ${showPreview ? "block" : "hidden lg:block"}`}
        >
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Eye className="h-5 w-5 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Live Preview
              </h2>
            </div>

            <div className="border rounded-lg p-4 bg-white min-h-[400px] overflow-auto">
              {newsletter.title && (
                <div className="mb-6 pb-4 border-b">
                  <h1 className="text-2xl font-bold text-gray-900">
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
          <Card className="p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Content Stats
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Characters:</span>
                <span className="ml-2 font-medium">
                  {newsletter.content.length}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Words:</span>
                <span className="ml-2 font-medium">
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
      <Card className="p-6 mt-8 bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          💡 Pro Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <p>
              <strong>Rich Text Editor:</strong> Perfect for visual editing with
              formatting toolbar
            </p>
            <p>
              <strong>Markdown:</strong> Great for those who prefer writing with
              syntax
            </p>
          </div>
          <div>
            <p>
              <strong>Preview:</strong> Check how your newsletter will look
              before exporting
            </p>
            <p>
              <strong>Mobile Friendly:</strong> All generated HTML is responsive
              by default
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
