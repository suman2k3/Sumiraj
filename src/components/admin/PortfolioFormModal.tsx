import React, { useState, useEffect, useRef } from "react";
import { Project } from "@/lib/portfolioData";
import { addPortfolioProject, updatePortfolioProject } from "@/lib/portfolioStore";
import {
  X,
  Building2,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  CheckCircle2,
  Loader2,
  Trash2,
} from "lucide-react";

interface PortfolioFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectToEdit?: Project | null;
  onSuccess: () => void;
}

const categories = ["Industrial", "Commercial", "Manufacturing", "Warehousing", "Heavy Engineering"] as const;

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function PortfolioFormModal({
  isOpen,
  onClose,
  projectToEdit,
  onSuccess,
}: PortfolioFormModalProps) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<string>("Industrial");
  const [location, setLocation] = useState("");
  const [workType, setWorkType] = useState("");
  const [builtUpArea, setBuiltUpArea] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState("Completed");

  // Thumbnail / Cover Image state
  const [thumbnail, setThumbnail] = useState("");
  const [thumbFileName, setThumbFileName] = useState("");
  const [imageTab, setImageTab] = useState<"upload" | "url">("upload");

  // UI status
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEditing = Boolean(projectToEdit);

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
    if (projectToEdit) {
      setTitle(projectToEdit.title || "");
      setSlug(projectToEdit.id || projectToEdit.slug || "");
      setCategory(projectToEdit.category || "Industrial");
      setLocation(projectToEdit.location || "");
      setWorkType(projectToEdit.workType || projectToEdit.specifications?.process || "PEB Fabrication & Erection");
      setBuiltUpArea(projectToEdit.builtUpArea || projectToEdit.specifications?.area || "50,000 Sq. Ft.");
      setDuration(projectToEdit.duration || projectToEdit.specifications?.duration || "4 Months");
      setStatus(projectToEdit.status || projectToEdit.specifications?.status || "Completed");

      const thumb = projectToEdit.thumbnail || projectToEdit.image || "";
      setThumbnail(thumb);
      setThumbFileName(thumb.startsWith("data:") ? "Uploaded Image File" : "");
      setImageTab(thumb.startsWith("http") ? "url" : "upload");
    } else {
      setTitle("");
      setSlug("");
      setCategory("Industrial");
      setLocation("Pune, Maharashtra");
      setWorkType("PEB Fabrication & Erection");
      setBuiltUpArea("50,000 Sq. Ft.");
      setDuration("4 Months");
      setStatus("Completed");
      setThumbnail("");
      setThumbFileName("");
      setImageTab("upload");
    }
    setError("");
    setImageError(false);
  }, [projectToEdit, isOpen]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isEditing) {
      setSlug(generateSlug(val));
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
        setError("Image file size should be less than 10MB.");
        return;
      }
      setThumbFileName(file.name);
      try {
        const compressedDataUrl = await compressImageFile(file);
        setThumbnail(compressedDataUrl);
        setImageError(false);
      } catch {
        setError("Failed to process image file. Please try another image.");
      }
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnail("");
    setThumbFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Project Title is required.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const projectData: Project = {
        _id: projectToEdit?._id,
        id: slug.trim() || generateSlug(title),
        slug: slug.trim() || generateSlug(title),
        title: title.trim(),
        category: category.trim() || "Industrial",
        location: location.trim() || "India",
        workType: workType.trim() || "PEB Fabrication & Erection",
        builtUpArea: builtUpArea.trim() || "50,000 Sq. Ft.",
        duration: duration.trim() || "4 Months",
        status: status.trim() || "Completed",
        shortDescription: `${workType.trim() || 'PEB Project'} completed${location.trim() ? ` at ${location.trim()}` : ' in India'}.`,
        description: `Turnkey ${category.trim() || 'Industrial'} project (${title.trim()})${workType.trim() ? ` involving ${workType.trim()}` : ''}${builtUpArea.trim() ? ` covering ${builtUpArea.trim()}` : ''}${location.trim() ? ` at ${location.trim()}` : ''}. Status: ${status.trim() || 'Completed'}.`,
        image: thumbnail.trim() || "https://sumiraj.com/public/portfolio/Jalkal_3.jpg",
        thumbnail: thumbnail.trim() || "https://sumiraj.com/public/portfolio/Jalkal_3.jpg",
        gallery: [thumbnail.trim()],
        images: [thumbnail.trim()],
        featured: true,
        isPublished: true,
        displayOrder: 1,
        specifications: {
          process: workType.trim() || "PEB Fabrication & Erection",
          materials: "High-tensile structural steel (IS 2062/ASTM A572)",
          industry: category.trim() || "Industrial",
          area: builtUpArea.trim() || "50,000 Sq. Ft.",
          duration: duration.trim() || "4 Months",
          status: status.trim() || "Completed",
        },
        highlights: [
          `Work Type: ${workType.trim()}`,
          `Built-up Area: ${builtUpArea.trim()}`,
          `Duration: ${duration.trim()}`,
        ],
      };

      let result;
      if (isEditing && projectToEdit) {
        result = await updatePortfolioProject(projectToEdit._id || projectToEdit.id, projectData);
      } else {
        result = await addPortfolioProject(projectData);
      }

      if (result.success) {
        onSuccess();
        onClose();
      } else {
        setError(result.message || "Failed to save portfolio project.");
      }
    } catch (err: any) {
      console.error("Error creating/updating portfolio project:", err);
      setError(err?.message || "An unexpected error occurred while saving.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-3 sm:p-6 overflow-hidden">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <Building2 size={20} className="text-accent" />
            <h3 className="font-display text-lg font-bold text-slate-900">
              {isEditing ? "Edit Portfolio Project" : "Create New Portfolio Project"}
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
            {/* 1. Project Title */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. Modern Industrial PEB Warehouse"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </div>

            {/* 2. Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 bg-white cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Location */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Pune, Maharashtra"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </div>

            {/* 4. Work Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Work Type
              </label>
              <input
                type="text"
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                placeholder="e.g. PEB Fabrication & Erection"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </div>

            {/* 5. Built-up Area */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Built-up Area
              </label>
              <input
                type="text"
                value={builtUpArea}
                onChange={(e) => setBuiltUpArea(e.target.value)}
                placeholder="e.g. 50,000 Sq. Ft."
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </div>

            {/* 6. Duration */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Duration
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 4 Months"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </div>

            {/* 7. Status */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-bold text-emerald-700 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 bg-white cursor-pointer"
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Upcoming">Upcoming</option>
              </select>
            </div>

            {/* 8. IMAGE FILE UPLOAD UI */}
            <div className="sm:col-span-2 rounded-2xl border border-slate-200 p-4 bg-slate-50/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <ImageIcon size={16} className="text-accent" /> Cover Image *
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
                    Upload Image
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageTab("url")}
                    className={`px-3 py-1 rounded-md transition ${
                      imageTab === "url" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Image Link URL
                  </button>
                </div>
              </div>

              {imageTab === "upload" ? (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="portfolio-thumb-file"
                  />
                  <label
                    htmlFor="portfolio-thumb-file"
                    className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-slate-300 hover:border-accent rounded-xl bg-white cursor-pointer transition text-center group"
                  >
                    <div className="h-9 w-9 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-1.5 group-hover:scale-110 transition">
                      <Upload size={18} />
                    </div>
                    <p className="text-xs font-bold text-slate-800">
                      Click to upload project cover image file
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Supports PNG, JPG, JPEG, WEBP (Max 10MB)
                    </p>
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="url"
                    value={thumbnail}
                    onChange={(e) => {
                      setThumbnail(e.target.value);
                      setImageError(false);
                    }}
                    placeholder="https://example.com/project-image.jpg"
                    className="w-full rounded-xl border border-slate-300 bg-white pl-9 pr-4 py-2.5 text-xs text-slate-900 font-mono outline-none focus:border-accent"
                  />
                  <LinkIcon className="absolute left-3 top-3 text-slate-400" size={14} />
                </div>
              )}

              {/* LIVE THUMBNAIL PREVIEW CARD */}
              {thumbnail ? (
                <div className="relative rounded-xl border border-slate-200 bg-white p-2.5 flex items-center gap-4 shadow-sm">
                  <div className="h-20 w-32 rounded-lg overflow-hidden bg-slate-950 border relative shrink-0">
                    <img
                      src={thumbnail}
                      alt="Thumbnail preview"
                      className="h-full w-full object-cover object-center"
                      onError={() => setImageError(true)}
                    />
                  </div>
                  <div className="flex-1 text-xs space-y-1 overflow-hidden">
                    <p className="font-bold text-slate-800 flex items-center gap-1.5">
                      {imageError ? (
                        <span className="text-red-500 font-normal text-[11px]">⚠️ Image failed to load</span>
                      ) : (
                        <span className="text-emerald-600 font-semibold flex items-center gap-1 text-[11px]">
                          <CheckCircle2 size={12} /> Image Ready
                        </span>
                      )}
                    </p>
                    <p className="text-[11px] text-slate-600 font-medium truncate">
                      {thumbFileName || "Cover Image"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveThumbnail}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-lg transition"
                    title="Remove Image"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-150 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-accent px-6 py-2.5 text-xs font-bold text-white hover:brightness-110 transition shadow-md shadow-accent/15 flex items-center gap-1.5 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Saving...
                </>
              ) : isEditing ? (
                "Update Project"
              ) : (
                "Create Project"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
