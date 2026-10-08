import React, { useState, useEffect, useRef, useMemo } from "react";
import { BlogPost } from "@/lib/blogsData";
import { addBlogPost, updateBlogPost } from "@/lib/blogsStore";
import {
  X,
  Sparkles,
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  Eye,
  Loader2,
  CheckCircle2,
  Trash2,
  Tag,
} from "lucide-react";

import { MarkdownRenderer, getFontStyleClass } from "@/routes/blog.$slug";

interface BlogFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  postToEdit?: BlogPost | null;
  onSuccess: () => void;
}

const categories = ["PEB Systems", "Engineering", "Manufacturing", "Cold Storage", "Cost Guide"] as const;

export const fontStyles = [
  { label: "Inter (Modern Sans-Serif)", value: "Inter (Sans-Serif)", sample: "Clean modern sans-serif typography" },
  { label: "Playfair / Merriweather (Classic Serif)", value: "Playfair (Classic Serif)", sample: "Editorial classic serif typography" },
  { label: "Poppins / Outfit (Geometric Sans)", value: "Poppins (Clean Sans)", sample: "Bold geometric clean typography" },
  { label: "Space Grotesk / Tech (Display)", value: "Space Grotesk (Tech)", sample: "Industrial technical display typography" },
  { label: "Fira Code / Consolas (Monospace)", value: "Fira Code (Monospace)", sample: "Technical monospace code typography" },
] as const;

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDate(d: Date): string {
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

function parseFormattedDateToInput(dateStr?: string): string {
  if (!dateStr) return new Date().toISOString().split("T")[0];
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  } catch {}
  return new Date().toISOString().split("T")[0];
}

function convertInputToFormattedDate(isoDate: string): string {
  if (!isoDate) return formatDate(new Date());
  try {
    const [year, month, day] = isoDate.split("-").map(Number);
    if (year && month && day) {
      const d = new Date(year, month - 1, day);
      return formatDate(d);
    }
  } catch {}
  return formatDate(new Date());
}

function ensureExplicitTagsInContent(contentStr: string): string {
  if (!contentStr) return "";

  const lines = contentStr.split("\n");
  const processedLines = lines.map((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) return line;

    // Check if line already has an explicit tag (HTML or Markdown)
    const hasTag = /^<[a-z1-6]+[^>]*>/i.test(trimmed) || /^#{1-6}\s/i.test(trimmed) || /^[-*]\s/i.test(trimmed) || /^>/i.test(trimmed);

    if (hasTag) {
      return line;
    }

    // Line 0 or short standalone heading/title question line -> H1 Heading tag
    if (idx === 0 || (trimmed.length < 65 && (trimmed.endsWith("?") || (/^[A-Z0-9\s-]+$/i.test(trimmed) && !trimmed.endsWith("."))))) {
      return `<h1>${trimmed}</h1>`;
    }

    // Standard paragraph line -> <p> tag
    return `<p>${trimmed}</p>`;
  });

  return processedLines.join("\n");
}

export function BlogFormModal({ isOpen, onClose, postToEdit, onSuccess }: BlogFormModalProps) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [category, setCategory] = useState<string>("PEB Systems");
  const [author, setAuthor] = useState("Sumiraj");
  const [date, setDate] = useState("");
  const [dateInput, setDateInput] = useState(new Date().toISOString().split("T")[0]);
  const [fontStyle, setFontStyle] = useState<string>("Inter (Sans-Serif)");
  const [readingTime, setReadingTime] = useState("5 min read");
  const [featuredImage, setFeaturedImage] = useState("");
  const [imageFileName, setImageFileName] = useState("");
  const [imageTab, setImageTab] = useState<"upload" | "url">("upload");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [editorMode, setEditorMode] = useState<"edit" | "preview">("edit");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isEditing = Boolean(postToEdit);

  useEffect(() => {
    if (isOpen) {
      const origOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = origOverflow;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title || "");
      setSlug(postToEdit.slug || "");
      setShortDescription(postToEdit.shortDescription || "");
      setCategory(postToEdit.category || "PEB Systems");
      setAuthor(postToEdit.author || "Sumiraj");
      const dStr = postToEdit.date || formatDate(new Date());
      setDate(dStr);
      setDateInput(parseFormattedDateToInput(dStr));
      setFontStyle(postToEdit.fontStyle || "Inter (Sans-Serif)");
      setReadingTime(postToEdit.readingTime || "5 min read");
      const img = postToEdit.featuredImage || postToEdit.image || "";
      setFeaturedImage(img);
      setImageFileName(img.startsWith("data:") ? "Uploaded Image" : "");
      setImageTab(img.startsWith("http") ? "url" : "upload");
      const rawContent = postToEdit.content || "";
      setContent(ensureExplicitTagsInContent(rawContent));
      setMetaTitle(postToEdit.metaTitle || postToEdit.title || "");
      setMetaDescription(postToEdit.metaDescription || postToEdit.shortDescription || "");
      setIsPublished(postToEdit.isPublished ?? true);
    } else {
      setTitle("");
      setSlug("");
      setShortDescription("");
      setCategory("PEB Systems");
      setAuthor("Sumiraj");
      const dStr = formatDate(new Date());
      setDate(dStr);
      setDateInput(parseFormattedDateToInput(dStr));
      setFontStyle("Inter (Sans-Serif)");
      setReadingTime("5 min read");
      setFeaturedImage("");
      setImageFileName("");
      setImageTab("upload");
      setContent("");
      setMetaTitle("");
      setMetaDescription("");
      setIsPublished(true);
    }
    setError("");
    setImageError(false);
  }, [postToEdit, isOpen]);

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isoVal = e.target.value;
    setDateInput(isoVal);
    setDate(convertInputToFormattedDate(isoVal));
  };

  const insertTag = (startTag: string, endTag: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setContent((prev) => prev + `\n${startTag}Sample Text${endTag}`);
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    if (selectedText.length > 0) {
      const replacement = `${startTag}${selectedText}${endTag}`;
      const newContent = content.substring(0, start) + replacement + content.substring(end);
      setContent(newContent);
      setTimeout(() => {
        textarea.focus({ preventScroll: true });
        textarea.setSelectionRange(start + startTag.length, start + startTag.length + selectedText.length);
      }, 30);
    } else {
      const lines = content.split("\n");
      let currentPos = 0;
      let lineIndex = 0;
      for (let i = 0; i < lines.length; i++) {
        const lineLen = lines[i].length + 1;
        if (start >= currentPos && start <= currentPos + lines[i].length) {
          lineIndex = i;
          break;
        }
        currentPos += lineLen;
      }

      const targetLine = lines[lineIndex] ?? "";
      const cleanLine = targetLine
        .replace(/^(<h[1-6][^>]*>|#{1-6}\s*|<p[^>]*>|<blockquote[^>]*>)/i, "")
        .replace(/(<\/h[1-6]>|<\/p>|<\/blockquote>)$/i, "")
        .trim();

      lines[lineIndex] = `${startTag}${cleanLine || "Sample Text"}${endTag}`;
      const newContent = lines.join("\n");
      setContent(newContent);

      setTimeout(() => {
        textarea.focus({ preventScroll: true });
      }, 30);
    }
  };

  const applyTagToSpecificLine = (lineIdx: number, startTag: string, endTag: string = "") => {
    const lines = content.split("\n");
    if (lineIdx < 0 || lineIdx >= lines.length) return;

    const targetLine = lines[lineIdx];
    const cleanLine = targetLine
      .replace(/^(<h[1-6][^>]*>|#{1-6}\s*|<p[^>]*>|<blockquote[^>]*>)/i, "")
      .replace(/(<\/h[1-6]>|<\/p>|<\/blockquote>)$/i, "")
      .trim();

    lines[lineIdx] = `${startTag}${cleanLine}${endTag}`;
    setContent(lines.join("\n"));
  };

  const analyzedLines = useMemo(() => {
    if (!content) return [];
    return content.split("\n").map((line, idx) => {
      const trimmed = line.trim();
      let tagType = "plain";
      let label = "Plain Text";

      if (/^<h1[^>]*>|^\#\s/i.test(trimmed)) {
        tagType = "h1";
        label = "<h1> H1 Heading";
      } else if (/^<h2[^>]*>|^\#\#\s/i.test(trimmed)) {
        tagType = "h2";
        label = "<h2> H2 Heading";
      } else if (/^<h3[^>]*>|^\#\#\#\s/i.test(trimmed)) {
        tagType = "h3";
        label = "<h3> H3 Heading";
      } else if (/^<h4[^>]*>|^\#\#\#\#\s/i.test(trimmed)) {
        tagType = "h4";
        label = "<h4> H4 Heading";
      } else if (/^<h[5-6][^>]*>|^\#{5,6}\s/i.test(trimmed)) {
        tagType = "h5";
        label = "<h5/6> Heading";
      } else if (/^<p[^>]*>/i.test(trimmed)) {
        tagType = "p";
        label = "<p> Paragraph";
      } else if (/^<blockquote[^>]*>|^\>/i.test(trimmed)) {
        tagType = "quote";
        label = "<blockquote> Quote";
      } else if (/^[-*]\s|<li[^>]*>/i.test(trimmed)) {
        tagType = "list";
        label = "• Bullet Item";
      }

      const hasHighlight = /<mark[^>]*>|==/i.test(trimmed);
      const hasBold = /<strong[^>]*>|<b[^>]*>|\*\*/i.test(trimmed);

      return {
        index: idx,
        rawLine: line,
        trimmed,
        tagType,
        label,
        hasHighlight,
        hasBold,
      };
    });
  }, [content]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isEditing) {
      setSlug(generateSlug(val));
      setMetaTitle(val);
    }
  };

  const handleShortDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setShortDescription(val);
    if (!isEditing) {
      setMetaDescription(val);
    }
  };

  const compressImageFile = (file: File, maxWidth = 1200, maxHeight = 1200, quality = 0.8): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            if (width / height > maxWidth / maxHeight) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", quality);
          resolve(dataUrl);
        };
        img.onerror = () => resolve(e.target?.result as string);
        img.src = e.target?.result as string;
      };
      reader.onerror = () => resolve("");
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("Image size should be less than 10MB.");
        return;
      }
      setImageFileName(file.name);
      try {
        const compressedDataUrl = await compressImageFile(file);
        setFeaturedImage(compressedDataUrl);
        setImageError(false);
      } catch {
        setError("Failed to process image file. Please try another image or image URL.");
      }
    }
  };

  const handleRemoveImage = () => {
    setFeaturedImage("");
    setImageFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Title and Content are required fields.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const postData: BlogPost = {
        _id: postToEdit?._id,
        slug: slug.trim() || generateSlug(title),
        title: title.trim(),
        shortDescription: shortDescription.trim() || content.substring(0, 160),
        content: content,
        image: featuredImage.trim() || "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d",
        featuredImage: featuredImage.trim() || "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d",
        date: date.trim() || formatDate(new Date()),
        author: author.trim() || "Sumiraj",
        category,
        fontStyle,
        readingTime: readingTime.trim() || "5 min read",
        metaTitle: metaTitle.trim() || title.trim(),
        metaDescription: metaDescription.trim() || shortDescription.trim(),
        isPublished,
      };

      let result;
      if (isEditing && postToEdit) {
        result = await updateBlogPost(postToEdit._id || postToEdit.slug, postData);
      } else {
        result = await addBlogPost(postData);
      }

      if (result.success) {
        onSuccess();
        onClose();
      } else {
        setError(result.message || "Operation failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Error creating/updating blog post:", err);
      setError(err?.message || "An unexpected error occurred while saving.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-3 sm:p-6 overflow-hidden">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-150 px-6 py-4 bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-accent" />
            <h3 className="font-display text-lg font-bold text-slate-900">
              {isEditing ? "Edit Blog Article" : "Create New Blog Article"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 min-h-0">
          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 p-3 text-xs font-semibold text-red-600">
              {error}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Article Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. Best Web Design Trends for Modern Businesses"
                className="w-full rounded-md border border-slate-200 px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Short Description
              </label>
              <textarea
                rows={2}
                value={shortDescription}
                onChange={handleShortDescChange}
                placeholder="Explore the latest web design trends that help businesses create modern experiences..."
                className="w-full rounded-md border border-slate-200 px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                URL Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. best-web-design-trends-for-modern-businesses"
                className="w-full rounded-md border border-slate-200 px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* DATE OF BLOG POST & FONT STYLE SELECTOR */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Date of Blog Post *
              </label>
              <input
                type="date"
                required
                value={dateInput}
                onChange={handleDateInputChange}
                className="w-full rounded-md border border-slate-200 px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 bg-white"
              />
              <p className="mt-1 text-[10px] text-slate-400 font-medium">
                Formatted Output: <strong className="text-slate-700">{date}</strong>
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Article Font Style (Public Website) *
              </label>
              <select
                value={fontStyle}
                onChange={(e) => setFontStyle(e.target.value)}
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 bg-white font-medium"
              >
                {fontStyles.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-[10px] text-slate-400 font-medium truncate">
                Renders on public website with chosen typography style.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Author Name
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Sumiraj"
                className="w-full rounded-md border border-slate-200 px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Estimated Reading Time
              </label>
              <input
                type="text"
                value={readingTime}
                onChange={(e) => setReadingTime(e.target.value)}
                placeholder="5 min read"
                className="w-full rounded-md border border-slate-200 px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </div>

            {/* FEATURED IMAGE UPLOAD & PREVIEW UI */}
            <div className="sm:col-span-2 rounded-xl border border-slate-200 p-4 bg-slate-50/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <ImageIcon size={16} className="text-accent" /> Featured Image
                </label>

                {/* Tab Switcher */}
                <div className="flex bg-slate-200/80 p-0.5 rounded-lg text-[11px] font-semibold">
                  <button
                    type="button"
                    onClick={() => setImageTab("upload")}
                    className={`px-3 py-1 rounded-md transition ${
                      imageTab === "upload" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Upload Image File
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageTab("url")}
                    className={`px-3 py-1 rounded-md transition ${
                      imageTab === "url" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Image URL Link
                  </button>
                </div>
              </div>

              {/* UPLOAD FILE TAB */}
              {imageTab === "upload" ? (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="blog-image-file"
                  />
                  <label
                    htmlFor="blog-image-file"
                    className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 hover:border-accent rounded-xl bg-white cursor-pointer transition text-center group"
                  >
                    <div className="h-10 w-10 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-2 group-hover:scale-110 transition">
                      <Upload size={20} />
                    </div>
                    <p className="text-xs font-bold text-slate-800">
                      Click to browse and upload image file
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Supports PNG, JPG, JPEG, WEBP (Max 5MB)
                    </p>
                  </label>
                </div>
              ) : (
                /* URL LINK TAB */
                <div className="relative">
                  <input
                    type="url"
                    value={featuredImage}
                    onChange={(e) => {
                      setFeaturedImage(e.target.value);
                      setImageError(false);
                    }}
                    placeholder="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d"
                    className="w-full rounded-md border border-slate-300 bg-white pl-9 pr-4 py-2.5 text-xs text-slate-900 font-mono outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                  />
                  <LinkIcon className="absolute left-3 top-3 text-slate-400" size={14} />
                </div>
              )}

              {/* LIVE IMAGE PREVIEW CARD */}
              {featuredImage ? (
                <div className="relative rounded-lg border border-slate-200 bg-white p-2.5 flex items-center gap-4 shadow-sm">
                  <div className="h-20 w-32 rounded-md overflow-hidden bg-slate-100 border relative shrink-0">
                    <img
                      src={featuredImage}
                      alt="Featured image preview"
                      className="h-full w-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  </div>
                  <div className="flex-1 text-xs space-y-1 overflow-hidden">
                    <p className="font-bold text-slate-800 flex items-center gap-1.5">
                      {imageError ? (
                        <span className="text-red-500 font-normal text-[11px]">⚠️ Image failed to load</span>
                      ) : (
                        <span className="text-emerald-600 font-semibold flex items-center gap-1 text-[11px]">
                          <CheckCircle2 size={12} /> Image Loaded & Ready
                        </span>
                      )}
                    </p>
                    <p className="text-[11px] text-slate-600 font-medium truncate">
                      {imageFileName || "Featured Image Preview"}
                    </p>
                    <p className="text-[10px] text-slate-400">Image will be rendered on the blog card and article header.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-lg transition"
                    title="Remove Image"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ) : null}
            </div>

            {/* CONTENT EDITOR WITH LIVE PREVIEW SWITCHER */}
            <div className="sm:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-1 border-b border-slate-200">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-800">
                  Article Content (HTML & Markdown Tags Supported) *
                </label>

                {/* View Mode Switcher */}
                <div className="flex bg-slate-200/80 p-0.5 rounded-lg text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setEditorMode("edit")}
                    className={`px-3 py-1 rounded-md transition ${
                      editorMode === "edit" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    ✏️ Edit Content & Tags
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorMode("preview")}
                    className={`px-3 py-1 rounded-md transition flex items-center gap-1.5 ${
                      editorMode === "preview" ? "bg-white text-accent shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Eye size={13} className="text-accent" /> Live Website Preview
                  </button>
                </div>
              </div>

              {editorMode === "edit" ? (
                <div>
                  {/* Enhanced Explicit Tag Toolbar */}
                  <div className="p-2.5 bg-slate-100/90 border border-slate-200 rounded-t-lg text-xs space-y-2">
                    {/* Headings Tags */}
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mr-1">HTML Headings:</span>
                      {[
                        { label: "<h1> H1", tag: "<h1>", end: "</h1>" },
                        { label: "<h2> H2", tag: "<h2>", end: "</h2>" },
                        { label: "<h3> H3", tag: "<h3>", end: "</h3>" },
                        { label: "<h4> H4", tag: "<h4>", end: "</h4>" },
                        { label: "<h5> H5", tag: "<h5>", end: "</h5>" },
                        { label: "<h6> H6", tag: "<h6>", end: "</h6>" },
                      ].map((h) => (
                        <button
                          key={h.label}
                          type="button"
                          onClick={() => insertTag(h.tag, h.end)}
                          className="px-2 py-1 rounded bg-white hover:bg-slate-200 border border-slate-300 font-mono font-bold text-[11px] text-slate-800 transition"
                          title={`Wrap line/selection in ${h.tag}`}
                        >
                          {h.label}
                        </button>
                      ))}
                    </div>

                    {/* Inline Formatting Tags */}
                    <div className="flex flex-wrap items-center gap-1 pt-1 border-t border-slate-200">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mr-1">Tags & Formatting:</span>
                      <button
                        type="button"
                        onClick={() => insertTag("<mark>", "</mark>")}
                        className="px-2 py-0.5 rounded bg-amber-200 hover:bg-amber-300 border border-amber-300 font-mono font-bold text-[11px] text-slate-900 transition"
                        title="Highlight text with <mark>"
                      >
                        ✨ &lt;mark&gt; Highlight
                      </button>
                      <button
                        type="button"
                        onClick={() => insertTag("<strong>", "</strong>")}
                        className="px-2 py-0.5 rounded bg-white hover:bg-slate-200 border border-slate-300 font-mono font-bold text-[11px] text-slate-900 transition"
                        title="Bold text with <strong>"
                      >
                        &lt;strong&gt; Bold
                      </button>
                      <button
                        type="button"
                        onClick={() => insertTag("<em>", "</em>")}
                        className="px-2 py-0.5 rounded bg-white hover:bg-slate-200 border border-slate-300 font-mono italic text-[11px] text-slate-900 transition"
                        title="Italic text with <em>"
                      >
                        &lt;em&gt; Italic
                      </button>
                      <button
                        type="button"
                        onClick={() => insertTag("<u>", "</u>")}
                        className="px-2 py-0.5 rounded bg-white hover:bg-slate-200 border border-slate-300 font-mono underline text-[11px] text-slate-900 transition"
                        title="Underline text with <u>"
                      >
                        &lt;u&gt; Underline
                      </button>
                      <button
                        type="button"
                        onClick={() => insertTag("<p>", "</p>")}
                        className="px-2 py-0.5 rounded bg-white hover:bg-slate-200 border border-slate-300 font-mono text-[11px] text-slate-800 transition"
                        title="Wrap paragraph with <p>"
                      >
                        &lt;p&gt; Paragraph
                      </button>
                      <button
                        type="button"
                        onClick={() => insertTag("<ul>\n  <li>", "</li>\n</ul>")}
                        className="px-2 py-0.5 rounded bg-white hover:bg-slate-200 border border-slate-300 font-mono text-[11px] text-slate-800 transition"
                        title="Insert <ul><li> list"
                      >
                        • &lt;ul&gt; List
                      </button>
                      <button
                        type="button"
                        onClick={() => insertTag("<blockquote>", "</blockquote>")}
                        className="px-2 py-0.5 rounded bg-white hover:bg-slate-200 border border-slate-300 font-mono text-[11px] text-slate-800 transition"
                        title="Insert <blockquote>"
                      >
                        " &lt;quote&gt;
                      </button>
                      <button
                        type="button"
                        onClick={() => insertTag('<a href="https://sumiraj.com">', "</a>")}
                        className="px-2 py-0.5 rounded bg-white hover:bg-slate-200 border border-slate-300 font-mono text-[11px] text-slate-800 transition"
                        title="Insert <a href='...'>"
                      >
                        🔗 &lt;a&gt; Link
                      </button>
                    </div>
                  </div>

                  <textarea
                    ref={textareaRef}
                    rows={10}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Type or edit article content here... Click tag buttons above to add <h1>, <h2>, <mark>, <strong>, etc. Tags will be explicitly visible right inside this box!"
                    className="w-full border border-t-0 border-slate-200 p-3.5 text-sm text-slate-900 outline-none font-mono focus:border-accent focus:ring-2 focus:ring-accent/15 leading-relaxed whitespace-pre-wrap rounded-b-none"
                  />

                  {/* VISUAL TAG INSPECTOR & LINE STRUCTURE LIST */}
                  <div className="rounded-b-lg border border-t-0 border-slate-200 bg-slate-50 p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <Tag size={13} className="text-accent" /> Document Tag Inspector ({analyzedLines.filter(l => l.trimmed).length} lines detected)
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">Click line buttons to tag any plain line instantly</span>
                    </div>

                    <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1 text-xs">
                      {analyzedLines.map((item) => {
                        if (!item.trimmed) return null;
                        return (
                          <div key={item.index} className="flex flex-wrap items-center justify-between gap-2 p-1.5 bg-white rounded border border-slate-200 text-xs">
                            <div className="flex items-center gap-2 overflow-hidden flex-1">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                                item.tagType === 'h1' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                                item.tagType === 'h2' ? 'bg-blue-100 text-blue-900 border border-blue-300' :
                                item.tagType === 'h3' ? 'bg-purple-100 text-purple-900 border border-purple-300' :
                                item.tagType === 'quote' ? 'bg-emerald-100 text-emerald-900' :
                                item.tagType === 'p' ? 'bg-slate-100 text-slate-800' :
                                'bg-slate-100 text-slate-500 italic'
                              }`}>
                                {item.label}
                              </span>
                              {item.hasHighlight && <span className="px-1.5 py-0.5 rounded bg-amber-200 text-slate-900 text-[10px] font-bold shrink-0">✨ Mark</span>}
                              {item.hasBold && <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-900 text-[10px] font-bold shrink-0">B Bold</span>}
                              <span className="font-mono text-slate-800 text-[11px] truncate">{item.trimmed}</span>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => applyTagToSpecificLine(item.index, "<h1>", "</h1>")}
                                className="px-1.5 py-0.5 rounded bg-amber-50 hover:bg-amber-100 border border-amber-200 text-[10px] font-bold font-mono text-amber-800 transition"
                                title="Tag line as <h1>"
                              >
                                + &lt;h1&gt;
                              </button>
                              <button
                                type="button"
                                onClick={() => applyTagToSpecificLine(item.index, "<h2>", "</h2>")}
                                className="px-1.5 py-0.5 rounded bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[10px] font-bold font-mono text-blue-800 transition"
                                title="Tag line as <h2>"
                              >
                                + &lt;h2&gt;
                              </button>
                              <button
                                type="button"
                                onClick={() => applyTagToSpecificLine(item.index, "<mark>", "</mark>")}
                                className="px-1.5 py-0.5 rounded bg-yellow-100 hover:bg-yellow-200 border border-yellow-300 text-[10px] font-bold font-mono text-slate-900 transition"
                                title="Highlight line"
                              >
                                + &lt;mark&gt;
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                /* LIVE WEBSITE PREVIEW CARD */
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm min-h-[280px] max-h-[450px] overflow-y-auto space-y-4">
                  <div className="border-b border-slate-150 pb-3 flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1 text-slate-700">
                      <Eye size={14} className="text-accent" /> Public Website Preview ({fontStyle})
                    </span>
                    <span>Date: {date}</span>
                  </div>

                  {title ? (
                    <h1 className={`text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight ${getFontStyleClass(fontStyle)}`}>
                      {title}
                    </h1>
                  ) : null}

                  <div className="border-t border-slate-100 pt-4">
                    {content.trim() ? (
                      <MarkdownRenderer content={content} fontClass={getFontStyleClass(fontStyle)} />
                    ) : (
                      <p className="text-slate-400 italic text-xs">No article content written yet. Switch to Edit Content tab to type text.</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* SEO META FIELDS */}
            <div className="sm:col-span-2 rounded-xl border border-slate-200 p-4 bg-slate-50 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1.5">
                SEO Metadata
              </h4>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Meta Title</label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="e.g. Best Web Design Trends"
                    className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-xs text-slate-900 bg-white outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Meta Description</label>
                  <input
                    type="text"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="e.g. Explore modern web design trends for businesses."
                    className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-xs text-slate-900 bg-white outline-none focus:border-accent"
                  />
                </div>
              </div>
            </div>

            {/* PUBLISHED SWITCH */}
            <div className="sm:col-span-2 flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="isPublished"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent cursor-pointer"
              />
              <label htmlFor="isPublished" className="text-xs font-bold text-slate-800 cursor-pointer">
                Publish Article Immediately (Visible on Public Website)
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-150 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-md bg-accent px-5 py-2 text-xs font-bold text-white hover:brightness-110 transition shadow-md shadow-accent/15 flex items-center gap-1.5 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Saving...
                </>
              ) : isEditing ? (
                "Update Article"
              ) : (
                "Publish Article"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
