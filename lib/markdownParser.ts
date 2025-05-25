import { marked } from "marked";

// Configure marked for email-safe HTML
marked.setOptions({
  breaks: true,
  gfm: true,
});

export const parseMarkdown = (markdown: string): string => {
  if (!markdown.trim()) return "";

  try {
    const html = marked(markdown);
    return typeof html === "string" ? html : "";
  } catch (error) {
    console.error("Error parsing markdown:", error);
    return markdown; // Return original text if parsing fails
  }
};

export const generateEmailHTML = (
  title: string,
  content: string,
  isMarkdown: boolean,
  primaryColor: string = "#3b82f6",
  fontFamily: string = "Arial, sans-serif"
): string => {
  const processedContent = isMarkdown ? parseMarkdown(content) : content;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title || "Newsletter"}</title>
    <style>
        body {
            font-family: ${fontFamily};
            line-height: 1.6;
            color: #333333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
        }
        h1, h2, h3, h4, h5, h6 {
            color: ${primaryColor};
            margin-top: 1.5em;
            margin-bottom: 0.5em;
        }
        h1 {
            border-bottom: 2px solid ${primaryColor};
            padding-bottom: 10px;
        }
        a {
            color: ${primaryColor};
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        blockquote {
            border-left: 4px solid ${primaryColor};
            margin: 1em 0;
            padding-left: 1em;
            font-style: italic;
            background-color: #f8f9fa;
            padding: 1em;
        }
        code {
            background-color: #f1f3f4;
            padding: 2px 4px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        pre {
            background-color: #f1f3f4;
            padding: 1em;
            border-radius: 5px;
            overflow-x: auto;
        }
        img {
            max-width: 100%;
            height: auto;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 1em 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: ${primaryColor};
            color: white;
        }
        .header {
            text-align: center;
            margin-bottom: 2em;
        }
        .footer {
            margin-top: 2em;
            padding-top: 1em;
            border-top: 1px solid #eee;
            font-size: 0.9em;
            color: #666;
            text-align: center;
        }
    </style>
</head>
<body>
    ${title ? `<div class="header"><h1>${title}</h1></div>` : ""}
    <div class="content">
        ${processedContent}
    </div>
    <div class="footer">
        <p>Generated with Newsletter Creator</p>
    </div>
</body>
</html>`;
};
