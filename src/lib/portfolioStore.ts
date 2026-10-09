import { useState, useEffect } from "react";
import { portfolioProjects as initialProjects, Project } from "./portfolioData";
import { API_BASE_URL, getAccessToken } from "./adminAuth";

const STORAGE_KEY = "sumiraj_portfolio_projects";

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizePortfolioProject(raw: any): Project {
  const thumbnail = raw.thumbnail || raw.image || (raw.images && raw.images[0]) || "https://sumiraj.com/public/portfolio/Jalkal_3.jpg";
  const images = Array.isArray(raw.images) && raw.images.length > 0
    ? raw.images
    : Array.isArray(raw.gallery) && raw.gallery.length > 0
    ? raw.gallery
    : [thumbnail];

  return {
    _id: raw._id,
    id: raw.slug || raw._id || raw.id || generateSlug(raw.title || "project"),
    slug: raw.slug || raw.id,
    title: raw.title || "Untitled Project",
    category: raw.category || "Industrial",
    location: raw.location || raw.clientName || "India",
    shortDescription: (raw.shortDescription && raw.shortDescription.trim() !== ",") 
      ? raw.shortDescription.trim() 
      : ((raw.description && raw.description.trim() !== ",") ? raw.description.trim().substring(0, 150) : "Turnkey PEB structural engineering project."),
    description: (raw.description && raw.description.trim() !== ",") 
      ? raw.description.trim() 
      : ((raw.shortDescription && raw.shortDescription.trim() !== ",") ? raw.shortDescription.trim() : "Turnkey structural engineering build."),
    image: thumbnail,
    thumbnail,
    gallery: images,
    images,
    clientName: raw.clientName || "",
    projectUrl: raw.projectUrl || "",
    technologies: Array.isArray(raw.technologies) ? raw.technologies.filter(Boolean) : [],
    featured: raw.featured ?? true,
    isPublished: raw.isPublished ?? true,
    displayOrder: raw.displayOrder ?? 1,
    specifications: {
      process: raw.specifications?.process || (Array.isArray(raw.technologies) && raw.technologies.filter((t: any) => Boolean(t) && t !== ",").length > 0 ? raw.technologies.filter((t: any) => Boolean(t) && t !== ",").join(", ") : "Structural Steel Fabrication"),
      materials: raw.specifications?.materials || "High-tensile structural steel (IS 2062/ASTM A572)",
      industry: raw.specifications?.industry || raw.category || "Industrial Infrastructure",
      area: raw.specifications?.area || "50,000 Sq. Ft.",
    },
    highlights: Array.isArray(raw.highlights) && raw.highlights.filter((h: any) => Boolean(h) && h !== ",").length > 0
      ? raw.highlights.filter((h: any) => Boolean(h) && h !== ",")
      : [(raw.shortDescription && raw.shortDescription.trim() !== ",") ? raw.shortDescription.trim() : "Turnkey PEB structural engineering project."],
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

function getStoredProjects(): Project[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [];
  }
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed.map(normalizePortfolioProject) : [];
  } catch (err) {
    console.error("Failed to parse portfolio projects from localStorage", err);
    return [];
  }
}

function saveProjectsToStorage(projects: Project[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.warn("localStorage quota exceeded or write failed:", err);
  }
  window.dispatchEvent(new Event("portfolio-projects-updated"));
}

export function getPortfolioProjects(): Project[] {
  return getStoredProjects();
}

export function getPortfolioProjectById(id: string): Project | undefined {
  const projects = getStoredProjects();
  const normalizedSearch = id.toLowerCase().trim();
  return projects.find(
    (p) => 
      p.id === id || 
      p.slug === id || 
      p._id === id || 
      p.id?.toLowerCase() === normalizedSearch || 
      p.slug?.toLowerCase() === normalizedSearch ||
      generateSlug(p.title) === normalizedSearch
  );
}

/**
 * Fetch Portfolio Projects from Backend API: GET /portfolio
 */
export async function fetchPortfolioProjectsFromApi(): Promise<Project[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(`${API_BASE_URL}/portfolio`, {
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

      const apiProjects = rawList.map(normalizePortfolioProject);
      saveProjectsToStorage(apiProjects);
      return apiProjects;
    }
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("Failed to fetch portfolio projects from API:", error);
  }
  return getStoredProjects();
}

/**
 * Create Portfolio Project via API: POST /portfolio
 */
export async function addPortfolioProject(
  projectData: Project
): Promise<{ success: boolean; message: string; project?: Project }> {
  const token = getAccessToken();

  const payload = {
    title: projectData.title,
    category: projectData.category || "Industrial",
    shortDescription: projectData.shortDescription || projectData.description.substring(0, 150),
    description: projectData.description,
    thumbnail: projectData.thumbnail || projectData.image,
    images: projectData.images && projectData.images.length > 0 ? projectData.images : projectData.gallery || [projectData.image],
    clientName: projectData.clientName || projectData.location || "Client",
    projectUrl: projectData.projectUrl || "https://sumiraj.com",
    technologies: projectData.technologies && projectData.technologies.length > 0 ? projectData.technologies : ["React", "Node.js", "PEB Engineering"],
    featured: projectData.featured ?? true,
    isPublished: projectData.isPublished ?? true,
    displayOrder: projectData.displayOrder ?? 1,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(`${API_BASE_URL}/portfolio`, {
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
    } catch {}

    if (response.ok && resData.success && resData.data) {
      const createdProject = normalizePortfolioProject(resData.data);
      const current = getStoredProjects();
      const updated = [createdProject, ...current.filter((p) => p.id !== createdProject.id && p._id !== createdProject._id)];
      saveProjectsToStorage(updated);
      return {
        success: true,
        message: resData.message || "Portfolio item created successfully",
        project: createdProject,
      };
    } else {
      // Fallback local save if API failed
      const current = getStoredProjects();
      const updated = [projectData, ...current.filter((p) => p.id !== projectData.id)];
      saveProjectsToStorage(updated);
      return {
        success: true,
        message: resData.message || "Portfolio item saved locally",
        project: projectData,
      };
    }
  } catch (err: any) {
    clearTimeout(timeoutId);
    console.error("Error creating portfolio item on API:", err);
    // Offline fallback
    const current = getStoredProjects();
    const updated = [projectData, ...current.filter((p) => p.id !== projectData.id)];
    saveProjectsToStorage(updated);
    return { success: true, message: "Saved locally (offline mode)", project: projectData };
  }
}

/**
 * Update Portfolio Project via API: PATCH /portfolio/:id
 */
export async function updatePortfolioProject(
  targetIdentifier: string,
  updatedData: Project
): Promise<{ success: boolean; message: string; project?: Project }> {
  const token = getAccessToken();
  const current = getStoredProjects();
  const existing = current.find((p) => p.id === targetIdentifier || p.slug === targetIdentifier || p._id === targetIdentifier);
  const targetId = existing?._id || targetIdentifier;

  const payload = {
    title: updatedData.title,
    category: updatedData.category,
    shortDescription: updatedData.shortDescription || updatedData.description.substring(0, 150),
    description: updatedData.description,
    thumbnail: updatedData.thumbnail || updatedData.image,
    images: updatedData.images && updatedData.images.length > 0 ? updatedData.images : updatedData.gallery || [updatedData.image],
    clientName: updatedData.clientName || updatedData.location || "Client",
    projectUrl: updatedData.projectUrl || "https://sumiraj.com",
    technologies: updatedData.technologies || ["PEB Engineering"],
    featured: updatedData.featured ?? true,
    isPublished: updatedData.isPublished ?? true,
    displayOrder: updatedData.displayOrder ?? 1,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/portfolio/${targetId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });

    const resData = await response.json();

    if (response.ok && resData.success && resData.data) {
      const savedProject = normalizePortfolioProject(resData.data);
      const index = current.findIndex((p) => p.id === targetIdentifier || p._id === targetIdentifier);
      if (index !== -1) {
        current[index] = savedProject;
      } else {
        current.unshift(savedProject);
      }
      saveProjectsToStorage(current);
      return { success: true, message: resData.message || "Portfolio item updated successfully", project: savedProject };
    }
  } catch (err) {
    console.error("Error updating portfolio project on API:", err);
  }

  // Local fallback
  const index = current.findIndex((p) => p.id === targetIdentifier || p._id === targetIdentifier);
  if (index !== -1) {
    current[index] = updatedData;
    saveProjectsToStorage(current);
    return { success: true, message: "Portfolio item updated locally", project: updatedData };
  }

  return { success: false, message: "Portfolio item not found" };
}

/**
 * Delete Portfolio Project via API: DELETE /portfolio/:id
 */
export async function deletePortfolioProject(targetIdentifier: string): Promise<{ success: boolean; message: string }> {
  const token = getAccessToken();
  const current = getStoredProjects();
  const existing = current.find((p) => p.id === targetIdentifier || p.slug === targetIdentifier || p._id === targetIdentifier);
  const targetId = existing?._id || targetIdentifier;

  try {
    const response = await fetch(`${API_BASE_URL}/portfolio/${targetId}`, {
      method: "DELETE",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const resData = await response.json();

    if (response.ok && resData.success) {
      const filtered = current.filter((p) => p.id !== targetIdentifier && p._id !== targetId);
      saveProjectsToStorage(filtered);
      return { success: true, message: resData.message || "Portfolio item deleted successfully" };
    }
  } catch (err) {
    console.error("Error deleting portfolio project on API:", err);
  }

  // Local fallback
  const filtered = current.filter((p) => p.id !== targetIdentifier && p._id !== targetId);
  saveProjectsToStorage(filtered);
  return { success: true, message: "Portfolio item deleted locally" };
}

export function usePortfolioProjects(): Project[] {
  const [projects, setProjects] = useState<Project[]>(getStoredProjects());

  useEffect(() => {
    let isMounted = true;

    // Fetch initial API list and update state immediately when data arrives
    fetchPortfolioProjectsFromApi().then((fresh) => {
      if (isMounted && fresh && fresh.length > 0) {
        setProjects(fresh);
      }
    });

    const handleUpdate = () => {
      if (isMounted) {
        setProjects(getStoredProjects());
      }
    };

    window.addEventListener("portfolio-projects-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener("portfolio-projects-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return projects;
}

// Prefetch portfolio projects immediately on module initialization
fetchPortfolioProjectsFromApi();
