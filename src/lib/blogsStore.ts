import { useState, useEffect } from "react";
import { blogPosts as initialBlogPosts, BlogPost } from "./blogsData";
import { API_BASE_URL, getAccessToken } from "./adminAuth";

const STORAGE_KEY = "sumiraj_blog_posts";

function formatDate(dateStr?: string): string {
  if (!dateStr) return "08 Sep 2026";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = String(d.getDate()).padStart(2, "0");
    const month = d.toLocaleString("en-US", { month: "short" });
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  } catch {
    return dateStr;
  }
}

function estimateReadingTime(text?: string): string {
  if (!text) return "3 min read";
  const words = text.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min read`;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeBlogPost(raw: any): BlogPost {
  const image = raw.featuredImage || raw.image || "https://sumiraj.com/public/blogs/top-benefits-of-pre-engineered-buildings-sumiraj_webp.png";
  return {
    _id: raw._id,
    slug: raw.slug || generateSlug(raw.title || "untitled"),
    title: raw.title || "Untitled Article",
    date: raw.date || (raw.createdAt ? formatDate(raw.createdAt) : "08 Sep 2026"),
    author: raw.author || "Sumiraj",
    category: raw.category || "PEB Systems",
    content: raw.content || "",
    shortDescription: raw.shortDescription || (raw.content ? raw.content.substring(0, 150) : ""),
    image,
    featuredImage: image,
    readingTime: raw.readingTime || estimateReadingTime(raw.content),
    metaTitle: raw.metaTitle || raw.title || "",
    metaDescription: raw.metaDescription || raw.shortDescription || "",
    isPublished: raw.isPublished ?? true,
    fontStyle: raw.fontStyle || "Inter (Sans-Serif)",
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

function getStoredPosts(): BlogPost[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [];
  }
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed.map(normalizeBlogPost) : [];
  } catch (err) {
    console.error("Failed to parse blog posts from localStorage", err);
    return [];
  }
}

function savePostsToStorage(posts: BlogPost[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (err) {
    console.warn("localStorage quota exceeded or write failed:", err);
  }
  window.dispatchEvent(new Event("blog-posts-updated"));
}

export function getBlogPosts(): BlogPost[] {
  return getStoredPosts();
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const posts = getStoredPosts();
  return posts.find((p) => p.slug === slug || p._id === slug);
}

function mergePostsWithLocal(apiPosts: BlogPost[]): BlogPost[] {
  const localPosts = getStoredPosts();
  if (!localPosts || localPosts.length === 0) {
    return apiPosts;
  }

  const localMap = new Map<string, BlogPost>();
  localPosts.forEach((p) => {
    if (p.slug) localMap.set(p.slug, p);
    if (p._id) localMap.set(p._id, p);
  });

  const merged = apiPosts.map((apiP) => {
    const localP = localMap.get(apiP.slug) || (apiP._id ? localMap.get(apiP._id) : undefined);
    if (localP) {
      if (localP.content && (localP.content.includes("<") || localP.content !== apiP.content)) {
        return { ...apiP, ...localP };
      }
    }
    return apiP;
  });

  localPosts.forEach((localP) => {
    const exists = merged.some((m) => m.slug === localP.slug || (localP._id && m._id === localP._id));
    if (!exists) {
      merged.unshift(localP);
    }
  });

  return merged;
}

/**
 * Fetch Blog Posts from Backend API: GET /blog
 */
export async function fetchBlogPostsFromApi(): Promise<BlogPost[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(`${API_BASE_URL}/blog`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const resData = await res.json();

    if (res.ok && resData.success && resData.data) {
      let rawList: any[] = [];
      if (Array.isArray(resData.data)) {
        rawList = resData.data;
      } else if (resData.data.data && Array.isArray(resData.data.data)) {
        rawList = resData.data.data;
      }

      const apiPosts = rawList.map(normalizeBlogPost);
      const mergedPosts = mergePostsWithLocal(apiPosts);
      savePostsToStorage(mergedPosts);
      return mergedPosts;
    }
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("Failed to fetch blog posts from API:", error);
  }
  return getStoredPosts();
}

/**
 * Create Blog Post via API: POST /blog
 */
export async function addBlogPost(post: BlogPost): Promise<{ success: boolean; message: string; post?: BlogPost }> {
  const token = getAccessToken();

  const payload = {
    title: post.title,
    shortDescription: post.shortDescription || post.content.substring(0, 160),
    content: post.content,
    featuredImage: post.featuredImage || post.image,
    metaTitle: post.metaTitle || post.title,
    metaDescription: post.metaDescription || post.shortDescription || "",
    author: post.author || "Sumiraj",
    date: post.date,
    category: post.category,
    fontStyle: post.fontStyle,
    isPublished: post.isPublished ?? true,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(`${API_BASE_URL}/blog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    let resData: any = {};
    try {
      resData = await response.json();
    } catch {
      // response might not be JSON (e.g. 413 Payload Too Large)
    }

    if (response.ok && resData.success && resData.data) {
      const createdPost = normalizeBlogPost(resData.data);
      const current = getStoredPosts();
      const updated = [createdPost, ...current.filter((p) => p.slug !== createdPost.slug)];
      savePostsToStorage(updated);
      return { success: true, message: resData.message || "Blog post created successfully", post: createdPost };
    } else {
      // If API returned error (like 401 or 400 or payload too large), fallback locally
      const current = getStoredPosts();
      const newPosts = [post, ...current.filter((p) => p.slug !== post.slug)];
      savePostsToStorage(newPosts);
      return { success: true, message: resData.message || "Blog post saved locally", post };
    }
  } catch (err: any) {
    clearTimeout(timeoutId);
    console.error("Error creating blog post on API:", err);
    const current = getStoredPosts();
    const newPosts = [post, ...current.filter((p) => p.slug !== post.slug)];
    savePostsToStorage(newPosts);
    return { success: true, message: "Blog post saved locally (offline mode)", post };
  }
}

/**
 * Update Blog Post via API: PATCH /blog/:id
 */
export async function updateBlogPost(targetIdentifier: string, updatedPost: BlogPost): Promise<{ success: boolean; message: string; post?: BlogPost }> {
  const token = getAccessToken();
  const current = getStoredPosts();
  const existing = current.find((p) => p.slug === targetIdentifier || p._id === targetIdentifier);
  const targetId = existing?._id || targetIdentifier;

  const payload = {
    title: updatedPost.title,
    shortDescription: updatedPost.shortDescription || updatedPost.content.substring(0, 160),
    content: updatedPost.content,
    featuredImage: updatedPost.featuredImage || updatedPost.image,
    metaTitle: updatedPost.metaTitle || updatedPost.title,
    metaDescription: updatedPost.metaDescription || updatedPost.shortDescription || "",
    author: updatedPost.author || "Sumiraj",
    date: updatedPost.date,
    category: updatedPost.category,
    fontStyle: updatedPost.fontStyle,
    isPublished: updatedPost.isPublished ?? true,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(`${API_BASE_URL}/blog/${targetId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    let resData: any = {};
    try {
      resData = await response.json();
    } catch {}

    if (response.ok && resData.success && resData.data) {
      const savedPost = normalizeBlogPost(resData.data);
      const index = current.findIndex((p) => p.slug === targetIdentifier || p._id === targetIdentifier);
      if (index !== -1) {
        current[index] = savedPost;
      } else {
        current.unshift(savedPost);
      }
      savePostsToStorage(current);
      return { success: true, message: resData.message || "Blog post updated successfully", post: savedPost };
    }
  } catch (err) {
    clearTimeout(timeoutId);
    console.error("Error updating blog post on API:", err);
  }

  // Local fallback
  const index = current.findIndex((p) => p.slug === targetIdentifier || p._id === targetIdentifier);
  if (index !== -1) {
    current[index] = updatedPost;
    savePostsToStorage(current);
    return { success: true, message: "Blog post updated locally", post: updatedPost };
  } else {
    current.unshift(updatedPost);
    savePostsToStorage(current);
    return { success: true, message: "Blog post saved locally", post: updatedPost };
  }
}

/**
 * Delete Blog Post via API: DELETE /blog/:id
 */
export async function deleteBlogPost(targetIdentifier: string): Promise<{ success: boolean; message: string }> {
  const token = getAccessToken();
  const current = getStoredPosts();
  const existing = current.find((p) => p.slug === targetIdentifier || p._id === targetIdentifier);
  const targetId = existing?._id || targetIdentifier;

  try {
    const response = await fetch(`${API_BASE_URL}/blog/${targetId}`, {
      method: "DELETE",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const resData = await response.json();

    if (response.ok && resData.success) {
      const filtered = current.filter((p) => p.slug !== targetIdentifier && p._id !== targetId);
      savePostsToStorage(filtered);
      return { success: true, message: resData.message || "Blog post deleted successfully" };
    }
  } catch (err) {
    console.error("Error deleting blog post on API:", err);
  }

  // Local fallback
  const filtered = current.filter((p) => p.slug !== targetIdentifier && p._id !== targetId);
  savePostsToStorage(filtered);
  return { success: true, message: "Blog post deleted locally" };
}

export function useBlogPosts(): BlogPost[] {
  const [posts, setPosts] = useState<BlogPost[]>(getStoredPosts());

  useEffect(() => {
    let isMounted = true;

    // Fetch API list and update React state immediately when response arrives
    fetchBlogPostsFromApi().then((fresh) => {
      if (isMounted && fresh && fresh.length > 0) {
        setPosts(fresh);
      }
    });

    const handleUpdate = () => {
      if (isMounted) {
        setPosts(getStoredPosts());
      }
    };

    window.addEventListener("blog-posts-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener("blog-posts-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return posts;
}

// Prefetch blog posts immediately on module initialization
fetchBlogPostsFromApi();
