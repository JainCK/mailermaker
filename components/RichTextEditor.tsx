"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Image as ImageIcon,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({
  value,
  onChange,
  placeholder,
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
      TextStyle,
      Color,
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px] p-4 bg-gradient-to-br from-purple-50 to-pink-50",
      },
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt("Enter link URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="rich-text-editor border-2 border-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br   ">
      {/* Toolbar */}
      <div className="border-b-2 border-gradient-to-r from-purple-400 to-pink-500 p-3 flex flex-wrap gap-2 bg-gradient-to-r via-pink-600">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-3 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg ${
            editor.isActive("bold")
              ? "bg-yellow-400 text-purple-800 shadow-yellow-300"
              : "bg-white/90 text-purple-700 hover:bg-yellow-300 hover:text-purple-800"
          }`}
          type="button"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-3 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg ${
            editor.isActive("italic")
              ? "bg-cyan-400 text-purple-800 shadow-cyan-300"
              : "bg-white/90 text-purple-700 hover:bg-cyan-300 hover:text-purple-800"
          }`}
          type="button"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-3 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg ${
            editor.isActive("bulletList")
              ? "bg-green-400 text-purple-800 shadow-green-300"
              : "bg-white/90 text-purple-700 hover:bg-green-300 hover:text-purple-800"
          }`}
          type="button"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-3 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg ${
            editor.isActive("orderedList")
              ? "bg-orange-400 text-purple-800 shadow-orange-300"
              : "bg-white/90 text-purple-700 hover:bg-orange-300 hover:text-purple-800"
          }`}
          type="button"
        >
          <ListOrdered size={18} />
        </button>
        <div className="w-px bg-white/30 mx-1"></div>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-3 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg ${
            editor.isActive({ textAlign: "left" })
              ? "bg-blue-400 text-purple-800 shadow-blue-300"
              : "bg-white/90 text-purple-700 hover:bg-blue-300 hover:text-purple-800"
          }`}
          type="button"
        >
          <AlignLeft size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`p-3 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg ${
            editor.isActive({ textAlign: "center" })
              ? "bg-purple-400 text-white shadow-purple-300"
              : "bg-white/90 text-purple-700 hover:bg-purple-300 hover:text-white"
          }`}
          type="button"
        >
          <AlignCenter size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`p-3 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg ${
            editor.isActive({ textAlign: "right" })
              ? "bg-pink-400 text-purple-800 shadow-pink-300"
              : "bg-white/90 text-purple-700 hover:bg-pink-300 hover:text-purple-800"
          }`}
          type="button"
        >
          <AlignRight size={18} />
        </button>
        <div className="w-px bg-white/30 mx-1"></div>
        <button
          onClick={addLink}
          className="p-3 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg bg-white/90 text-purple-700 hover:bg-emerald-300 hover:text-purple-800"
          type="button"
        >
          <Link2 size={18} />
        </button>
        <button
          onClick={addImage}
          className="p-3 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg bg-white/90 text-purple-700 hover:bg-rose-300 hover:text-purple-800"
          type="button"
        >
          <ImageIcon size={18} />
        </button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="min-h-[400px] bg-gradient-to-br from-purple-50/50 via-white to-pink-50/50"
        placeholder={placeholder || "Start writing your newsletter content..."}
      />

      <div className="text-sm text-purple-700 mt-2 p-4 bg-gradient-to-r from-purple-100 via-pink-100 to-cyan-100 border-t-2 border-purple-200">
        <p className="font-semibold">
          ✨{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Rich Text Editor:
          </span>{" "}
          Use the colorful toolbar above to format your content. The generated
          HTML will be optimized for email clients.
        </p>
      </div>
    </div>
  );
};

export default RichTextEditor;
