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
    },
    {
      icon: Heading2,
      action: () => insertMarkdown("## ", "", "Heading 2"),
      title: "Heading 2",
    },
    {
      icon: Bold,
      action: () => insertMarkdown("**", "**", "bold text"),
      title: "Bold",
    },
    {
      icon: Italic,
      action: () => insertMarkdown("_", "_", "italic text"),
      title: "Italic",
    },
    {
      icon: Link2,
      action: () => insertMarkdown("[", "](url)", "link text"),
      title: "Link",
    },
    {
      icon: Quote,
      action: () => insertMarkdown("> ", "", "quote"),
      title: "Quote",
    },
    {
      icon: Code,
      action: () => insertMarkdown("`", "`", "code"),
      title: "Inline Code",
    },
    {
      icon: List,
      action: () => insertMarkdown("- ", "", "list item"),
      title: "List",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 rounded-lg border">
        {toolbarButtons.map((button, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={button.action}
            title={button.title}
            className="h-8 w-8 p-0"
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>

      <Textarea
        id="markdown-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          placeholder || "Write your newsletter content in Markdown..."
        }
        className="min-h-[400px] font-mono text-sm resize-none"
      />

      <div className="text-xs text-gray-500 space-y-1">
        <p>
          <strong>Markdown Tips:</strong>
        </p>
        <p>**bold** *italic* [link](url) `code` &gt; quote</p>
        <p># H1 ## H2 ### H3 - list item</p>
      </div>
    </div>
  );
};

export default MarkdownEditor;
