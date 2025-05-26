"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  Link2,
  Quote,
  Code,
  Heading1,
  Heading2,
} from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const MarkdownEditor = ({
  value,
  onChange,
  placeholder,
}: MarkdownEditorProps) => {
  const insertMarkdown = (
    before: string,
    after: string = "",
    placeholder: string = ""
  ) => {
    const textarea = document.getElementById(
      "markdown-textarea"
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const textToInsert = selectedText || placeholder;

    const newValue =
      value.substring(0, start) +
      before +
      textToInsert +
      after +
      value.substring(end);
    onChange(newValue);

    // Set cursor position
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + textToInsert.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const toolbarButtons = [
    {
      icon: Heading1,
      action: () => insertMarkdown("# ", "", "Heading 1"),
      title: "Heading 1",
      color: "from-yellow-400 to-orange-400",
    },
    {
      icon: Heading2,
      action: () => insertMarkdown("## ", "", "Heading 2"),
      title: "Heading 2",
      color: "from-cyan-400 to-blue-400",
    },
    {
      icon: Bold,
      action: () => insertMarkdown("**", "**", "bold text"),
      title: "Bold",
      color: "from-green-400 to-emerald-400",
    },
    {
      icon: Italic,
      action: () => insertMarkdown("_", "_", "italic text"),
      title: "Italic",
      color: "from-pink-400 to-red-400",
    },
    {
      icon: Link2,
      action: () => insertMarkdown("[", "](url)", "link text"),
      title: "Link",
      color: "from-purple-400 to-indigo-400",
    },
    {
      icon: Quote,
      action: () => insertMarkdown("> ", "", "quote"),
      title: "Quote",
      color: "from-orange-400 to-red-400",
    },
    {
      icon: Code,
      action: () => insertMarkdown("`", "`", "code"),
      title: "Inline Code",
      color: "from-teal-400 to-cyan-400",
    },
    {
      icon: List,
      action: () => insertMarkdown("- ", "", "list item"),
      title: "List",
      color: "from-lime-400 to-green-400",
    },
  ];

  return (
    <div className="space-y-4 border-2 border-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br">
      <div className="flex flex-wrap gap-2 p-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600">
        {toolbarButtons.map((button, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={button.action}
            title={button.title}
            className={`h-10 w-10 p-0 font-bold transition-all duration-200 transform hover:scale-105 shadow-lg bg-white/90 text-purple-700 hover:bg-gradient-to-r hover:${button.color} hover:text-white`}
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>

      <div className="p-4">
        <Textarea
          id="markdown-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            placeholder || "Write your newsletter content in Markdown..."
          }
          className="min-h-[400px] font-mono text-sm resize-none border-2 border-purple-200 focus:border-pink-400 bg-gradient-to-br from-purple-50/50 via-white to-pink-50/50"
        />
      </div>

      <div className="text-sm text-purple-700 p-4 bg-gradient-to-r from-purple-100 via-pink-100 to-cyan-100 border-t-2 border-purple-200">
        <p className="font-bold mb-2">
          ✨{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Markdown Tips:
          </span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          <p>
            <code className="bg-yellow-200 px-1 rounded">**bold**</code>{" "}
            <code className="bg-cyan-200 px-1 rounded">*italic*</code>{" "}
            <code className="bg-green-200 px-1 rounded">[link](url)</code>
          </p>
          <p>
            <code className="bg-pink-200 px-1 rounded">`code`</code>{" "}
            <code className="bg-purple-200 px-1 rounded">&gt; quote</code>
          </p>
          <p>
            <code className="bg-orange-200 px-1 rounded"># H1</code>{" "}
            <code className="bg-blue-200 px-1 rounded">## H2</code>{" "}
            <code className="bg-emerald-200 px-1 rounded">- list item</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
