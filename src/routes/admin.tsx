import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useState } from "react";
import { useAdminAuth, UserProfile } from "@/lib/adminAuth";
import { useBlogPosts, deleteBlogPost } from "@/lib/blogsStore";
import { usePortfolioProjects, deletePortfolioProject } from "@/lib/portfolioStore";
import { BlogPost } from "@/lib/blogsData";
import { Project } from "@/lib/portfolioData";
import { BlogFormModal } from "@/components/admin/BlogFormModal";
import { PortfolioFormModal } from "@/components/admin/PortfolioFormModal";
import {
  Lock,
  Mail,
  User,
  LogOut,
  FileText,
  Building2,
  Plus,
  Edit,
  Trash2,
  Search,
  ExternalLink,
  ShieldAlert,
  Loader2,
  CheckCircle2,
  Shield,
} from "lucide-react";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel | Sumiraj PEB & Steel Structures" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { isAuthenticated, userProfile, login, logout } = useAdminAuth();

  if (!isAuthenticated) {
    return <AdminLoginForm onLogin={login} />;
  }

  return <AdminDashboard userProfile={userProfile} logout={logout} />;
}

/* -------------------------------------------------------------------------- */
/*                               ADMIN LOGIN FORM                             */
/* -------------------------------------------------------------------------- */
interface AdminLoginFormProps {
  onLogin: (
    email: string,
    pass: string
  ) => Promise<{ success: boolean; message: string; user?: UserProfile }>;
}

function AdminLoginForm({ onLogin }: AdminLoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await onLogin(email, password);
    setIsLoading(false);

    if (!result.success) {
      setError(result.message || "Invalid credentials. Please try again.");
    }
  };

  const handleQuickFillDemo = () => {
    setEmail("info@sumiraj.com");
    setPassword("Sumiraj@2026");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-slate-900 border border-slate-800 p-8 shadow-2xl">
        <div className="text-center">
          <div className="inline-block mb-4">
            <Logo lightText />
          </div>
          <div className="flex justify-center my-3">
            <div className="rounded-full bg-accent/15 p-3 text-accent border border-accent/20">
              <Lock size={28} />
            </div>
          </div>
          <h2 className="font-display text-2xl font-extrabold text-white">Admin Control Panel</h2>
          <p className="mt-2 text-xs text-slate-400">
            Sign in to manage Sumiraj Blog articles and Portfolio projects.
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-950/60 border border-red-800/80 p-3 text-center text-xs font-semibold text-red-300 flex items-center justify-center gap-2">
            <ShieldAlert size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="info@sumiraj.com"
                className="w-full rounded-lg border border-slate-700 bg-slate-800/60 pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-lg border border-slate-700 bg-slate-800/60 pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-accent py-3 text-sm font-bold text-white transition duration-300 hover:brightness-110 shadow-lg shadow-accent/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Authenticating...
              </>
            ) : (
              "Authenticate & Login"
            )}
          </button>
        </form>

        

        <div className="text-center pt-2 border-t border-slate-800">
          <Link to="/" className="text-xs font-semibold text-slate-400 hover:text-accent transition">
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              ADMIN DASHBOARD                               */
/* -------------------------------------------------------------------------- */
interface AdminDashboardProps {
  userProfile: UserProfile | null;
  logout: () => void;
}

function AdminDashboard({ userProfile, logout }: AdminDashboardProps) {
  const blogPosts = useBlogPosts();
  const portfolioProjects = usePortfolioProjects();

  const [activeTab, setActiveTab] = useState<"blogs" | "portfolio">("blogs");

  // Modal states
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [blogToEdit, setBlogToEdit] = useState<BlogPost | null>(null);

  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [portfolioToEdit, setPortfolioToEdit] = useState<Project | null>(null);

  // Search filter state
  const [searchQuery, setSearchQuery] = useState("");

  // Delete handlers
  const handleDeleteBlog = async (post: BlogPost) => {
    if (window.confirm(`Are you sure you want to delete the blog post "${post.title}"?`)) {
      const target = post._id || post.slug;
      await deleteBlogPost(target);
    }
  };

  const handleDeletePortfolio = async (project: Project) => {
    if (window.confirm(`Are you sure you want to delete the project "${project.title}"?`)) {
      const target = project._id || project.id;
      await deletePortfolioProject(target);
    }
  };

  // Filtered lists
  const filteredBlogs = blogPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPortfolio = portfolioProjects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-6 py-4">
        <div className="mx-auto max-w-[1400px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo lightText />
            <span className="hidden sm:inline-block rounded-full bg-accent/20 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-accent border border-accent/30">
              Admin Panel
            </span>
          </div>

          <div className="flex items-center gap-4">
            {userProfile && (
              <div className="hidden sm:flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-slate-300">
                <div className="h-7 w-7 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                  {userProfile.name ? userProfile.name.charAt(0) : "A"}
                </div>
                <div>
                  <p className="font-bold text-white leading-none">{userProfile.name || "Admin"}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{userProfile.email}</p>
                </div>
              </div>
            )}

            <Link
              to="/"
              target="_blank"
              className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"
            >
              View Site <ExternalLink size={14} />
            </Link>

            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-lg bg-red-950/50 hover:bg-red-900/60 border border-red-800/60 px-3.5 py-2 text-xs font-bold text-red-300 transition"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 mx-auto max-w-[1400px] w-full p-6 space-y-8">
        {/* Profile Details Banner */}
        {userProfile && (
          <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
                <Shield size={20} />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  Logged in as {userProfile.name}
                  {userProfile.role && (
                    <span className="rounded bg-accent/20 px-2 py-0.5 text-[10px] uppercase font-bold text-accent border border-accent/30">
                      {userProfile.role}
                    </span>
                  )}
                </h4>
                <p className="text-xs text-slate-400">{userProfile.email}</p>
              </div>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Base API: <span className="text-accent">https://sumiraj-backend.vercel.app/api</span>
            </div>
          </div>
        )}

        {/* Overview Stat Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl bg-slate-950 border border-slate-800 p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Blog Articles</p>
              <h3 className="text-3xl font-extrabold text-white mt-1">{blogPosts.length}</h3>
            </div>
            <div className="h-12 w-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <FileText size={24} />
            </div>
          </div>

          <div className="rounded-xl bg-slate-950 border border-slate-800 p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Portfolio Projects</p>
              <h3 className="text-3xl font-extrabold text-white mt-1">{portfolioProjects.length}</h3>
            </div>
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Building2 size={24} />
            </div>
          </div>

          <div className="sm:col-span-2 lg:col-span-1 rounded-xl bg-gradient-to-r from-accent/20 to-slate-950 border border-accent/30 p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-accent">Quick Actions</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => {
                    setBlogToEdit(null);
                    setIsBlogModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 rounded bg-accent px-3 py-2 text-xs font-bold text-white hover:brightness-110 transition"
                >
                  <Plus size={14} /> Add Blog
                </button>
                <button
                  onClick={() => {
                    setPortfolioToEdit(null);
                    setIsPortfolioModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 rounded border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold text-white hover:bg-white/20 transition"
                >
                  <Plus size={14} /> Add Project
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation & Search */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-4">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setActiveTab("blogs");
                setSearchQuery("");
              }}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold transition ${
                activeTab === "blogs"
                  ? "bg-accent text-white shadow-md shadow-accent/20"
                  : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              <FileText size={16} /> Manage Blogs ({blogPosts.length})
            </button>

            <button
              onClick={() => {
                setActiveTab("portfolio");
                setSearchQuery("");
              }}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold transition ${
                activeTab === "portfolio"
                  ? "bg-accent text-white shadow-md shadow-accent/20"
                  : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              <Building2 size={16} /> Manage Portfolio ({portfolioProjects.length})
            </button>
          </div>

          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder={`Search ${activeTab === "blogs" ? "articles..." : "projects..."}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-accent"
            />
            <Search className="absolute left-3.5 top-2.5 text-slate-500" size={14} />
          </div>
        </div>

        {/* Tab 1: BLOGS MANAGEMENT */}
        {activeTab === "blogs" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-white">Blog Articles Listing</h3>
              <button
                onClick={() => {
                  setBlogToEdit(null);
                  setIsBlogModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-bold text-white hover:brightness-110 transition shadow-md shadow-accent/15"
              >
                <Plus size={16} /> Create New Article
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 shadow-md">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-800 bg-slate-900/60 uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="px-6 py-4">Article Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Reading Time</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredBlogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                        No blog articles found.
                      </td>
                    </tr>
                  ) : (
                    filteredBlogs.map((post) => (
                      <tr key={post.slug} className="hover:bg-slate-900/40 transition">
                        <td className="px-6 py-4">
                          <div className="font-bold text-white">{post.title}</div>
                          <div className="text-[11px] font-mono text-slate-500 mt-0.5">/{post.slug}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="rounded bg-accent/15 px-2.5 py-1 text-[10px] font-bold text-accent border border-accent/20">
                            {post.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-300">{post.date}</td>
                        <td className="px-6 py-4 text-slate-400">{post.readingTime}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Link
                            to={`/blog/${post.slug}`}
                            target="_blank"
                            className="inline-flex p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                            title="View Public Post"
                          >
                            <ExternalLink size={14} />
                          </Link>
                          <button
                            onClick={() => {
                              setBlogToEdit(post);
                              setIsBlogModalOpen(true);
                            }}
                            className="inline-flex p-1.5 rounded bg-blue-950/60 hover:bg-blue-900/80 text-blue-300 transition border border-blue-800/50"
                            title="Edit Post"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(post)}
                            className="inline-flex p-1.5 rounded bg-red-950/60 hover:bg-red-900/80 text-red-300 transition border border-red-800/50"
                            title="Delete Post"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: PORTFOLIO MANAGEMENT */}
        {activeTab === "portfolio" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-white">Portfolio Projects Listing</h3>
              <button
                onClick={() => {
                  setPortfolioToEdit(null);
                  setIsPortfolioModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-bold text-white hover:brightness-110 transition shadow-md shadow-accent/15"
              >
                <Plus size={16} /> Create New Project
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 shadow-md">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-800 bg-slate-900/60 uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="px-6 py-4">Project Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Area</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredPortfolio.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                        No portfolio projects found.
                      </td>
                    </tr>
                  ) : (
                    filteredPortfolio.map((project) => (
                      <tr key={project.id} className="hover:bg-slate-900/40 transition">
                        <td className="px-6 py-4">
                          <div className="font-bold text-white">{project.title}</div>
                          <div className="text-[11px] font-mono text-slate-500 mt-0.5">ID: {project.id}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`rounded px-2.5 py-1 text-[10px] font-bold border ${
                              project.category === "Industrial"
                                ? "bg-amber-950/60 text-amber-400 border-amber-800/50"
                                : "bg-blue-950/60 text-blue-400 border-blue-800/50"
                            }`}
                          >
                            {project.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-300">{project.location}</td>
                        <td className="px-6 py-4 text-slate-400">{project.specifications?.area || "N/A"}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Link
                            to="/portfolio"
                            target="_blank"
                            className="inline-flex p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                            title="View Public Portfolio"
                          >
                            <ExternalLink size={14} />
                          </Link>
                          <button
                            onClick={() => {
                              setPortfolioToEdit(project);
                              setIsPortfolioModalOpen(true);
                            }}
                            className="inline-flex p-1.5 rounded bg-blue-950/60 hover:bg-blue-900/80 text-blue-300 transition border border-blue-800/50"
                            title="Edit Project"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDeletePortfolio(project)}
                            className="inline-flex p-1.5 rounded bg-red-950/60 hover:bg-red-900/80 text-red-300 transition border border-red-800/50"
                            title="Delete Project"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <BlogFormModal
        isOpen={isBlogModalOpen}
        onClose={() => setIsBlogModalOpen(false)}
        postToEdit={blogToEdit}
        onSuccess={() => setIsBlogModalOpen(false)}
      />

      <PortfolioFormModal
        isOpen={isPortfolioModalOpen}
        onClose={() => setIsPortfolioModalOpen(false)}
        projectToEdit={portfolioToEdit}
        onSuccess={() => setIsPortfolioModalOpen(false)}
      />
    </div>
  );
}
