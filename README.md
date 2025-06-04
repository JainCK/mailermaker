# ✉️ Newsletter HTML Generator

A lightweight, elegant, and mobile-friendly 3-page web application for generating email-ready HTML content from **Markdown** and **Rich Text** inputs — no authentication, no backend storage, just pure client-side functionality.

---

### 🔗 Live Preview

[View App](#https://mailermaker.vercel.app/)

---

## 📌 Project Overview

**Newsletter HTML Generator** helps users create clean, professional HTML email content effortlessly. The app offers dual editor modes (Markdown & Rich Text), a real-time preview (optional), and export capabilities for raw HTML. Designed with accessibility, responsiveness, and speed in mind.

---

## 🖼 Pages Breakdown

### 1. `/` Landing Page

- **Purpose**: Introduces the tool and its benefits.
- **Features**:
  - Headline: “Effortless Newsletter Content Creation”
  - Subheading: “Convert Markdown and Rich Text into Clean HTML for your Email Campaigns”
  - Call-to-Action: “Start Creating Your Newsletter” → Navigates to `/create`
  - Responsive layout with TailwindCSS
  - Visual preview (animation or screenshot)

---

### 2. `/create` Content Creation Page

- **Purpose**: Primary interface to build newsletter content.
- **Features**:

  - Newsletter **Title** input
  - **Toggle Editor Mode**: Switch between Markdown & Rich Text
  - **Editor Area**:
    - Markdown mode: Plain text input parsed with `marked`/`remark`
    - Rich Text mode: Integrated editor (`react-quill`, `tiptap`, or `tinymce`)
  - **Real-Time Preview** (Optional)
  - **Dynamic Sections** (Optional): Add multiple editable blocks
  - **Generate HTML**: Navigate to `/preview`

- **State Management**:
  - Uses Redux Toolkit to store newsletter data: title, content, mode, styling preferences

---

### 3. `/preview` HTML Output & Export Page

- **Purpose**: Review and export the final HTML
- **Features**:

  - **Rendered Preview**: Simulates email layout
  - **Raw HTML Code View**
  - **Actions**:
    - "Copy HTML" to clipboard
    - "Download .html" file
    - "Edit Content" → navigates back to `/create`
  - **Styling Controls** (Optional):
    - Basic color and font selectors for inline styling

- **Security Note**: For personal use only; content is user-generated so XSS concerns are minimal

---

## ⚙️ Tech Stack

| Purpose                                                       | Tech Used                      |
| ------------------------------------------------------------- | ------------------------------ |
| Framework                                                     | Next.js (TypeScript)           |
| State Management                                              | Redux Toolkit                  |
| Styling                                                       | Tailwind CSS, Shadcn UI        |
| Markdown Parsing                                              | marked / remark                |
| Rich Text Editing                                             | react-quill / tiptap / tinymce |
| UI & Animation                                                | Shadcn, Tailwind               |
| Clipboard / File Download                                     | ``, Blob                       |
| ------------------------------------------------------------- |

## 💡 Features at a Glance

- ✅ Toggle between Markdown and Rich Text
- ✅ Clean HTML output
- ✅ Redux-based content persistence
- ✅ Copy and download newsletter HTML
- ✅ Mobile-first responsive layout
- ✅ Modern and accessible UI (Shadcn + Tailwind)

---

## 📈 Potential Enhancements

- [ ] Add block-based content creation
- [ ] Add email-safe inline style options
- [ ] Import/export JSON templates
- [ ] Authentication and newsletter history saving
- [ ] Theming with saved presets

---

## 🛠 Development Notes

- Purely frontend, stateless app
- Ideal for marketers, indie creators, or small businesses
- Built with performance, accessibility, and maintainability in mind

---

## 🧑‍💻 Author

Built by [JainCK](https://github.com/JainCK) — feel free to contribute or fork!
