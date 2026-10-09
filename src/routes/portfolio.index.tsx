import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { usePortfolioProjects } from "@/lib/portfolioStore";
import heroImg from "@/assets/hero-gallery.jpg";
import { 
  MapPin, 
  ArrowRight, 
  Building2, 
  Layers, 
  CalendarRange, 
  Search, 
  LayoutGrid, 
  List, 
  SlidersHorizontal, 
  HardHat,
  X
} from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Our Portfolio | Completed PEB & Steel Projects | Sumiraj" },
      { name: "description", content: "Explore Sumiraj's portfolio of over 300+ prestigious pre-engineered steel buildings, warehouses, and industrial plants across India." },
      { property: "og:title", content: "Sumiraj PEB Projects Portfolio" },
      { property: "og:description", content: "300+ projects completed covering 20M+ square feet of premium industrial and commercial space." },
    ],
  }),
  component: PortfolioListing,
});

function PortfolioListing() {
  const portfolioProjects = usePortfolioProjects();
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Extract unique categories dynamically + standard tags
  const categories = useMemo(() => {
    const cats = new Set<string>(["All"]);
    portfolioProjects.forEach(p => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats);
  }, [portfolioProjects]);

  const filteredProjects = useMemo(() => {
    return portfolioProjects.filter((p) => {
      const matchesCategory = activeFilter === "All" || p.category.toLowerCase() === activeFilter.toLowerCase();
      const matchesSearch = 
        searchQuery.trim() === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.specifications?.industry?.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [portfolioProjects, activeFilter, searchQuery]);

  const stats = [
    { value: "300+", label: "Projects Delivered", desc: "Across 15+ States", icon: Building2 },
    { value: "20M+", label: "Area Erected (Sq. Ft.)", desc: "Precision Fabrication", icon: Layers },
    { value: "9+", label: "Years Engineering", desc: "ISO 9001 Certified", icon: CalendarRange },
    { value: "100%", label: "On-Time Erection", desc: "Zero Safety Incidents", icon: HardHat }
  ];

  return (
    <Layout>
      {/* Dynamic Hero Section */}
      <PageHero
        image={heroImg}
        breadcrumb="Portfolio"
        eyebrow="Architectural Excellence & PEB Engineering"
        title={<>Forging Landmarks for<br />Modern Industry.</>}
        subtitle="Explore our portfolio of 100+ turnkey pre-engineered steel buildings, heavy industrial plants, and logistics parks engineered for maximum load efficiency and lifetime durability."
      />

      {/* Stats Spotlight Counter */}
      <section className="relative z-10 -mt-10 mb-8 container-x mx-auto max-w-[1400px]">
        <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xl p-6 sm:p-8 backdrop-blur-md">
          <div className="grid gap-6 grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {stats.map((s, idx) => (
              <div key={idx} className={`flex items-center gap-4 ${idx > 0 ? "pt-4 sm:pt-0 sm:pl-6" : ""}`}>
                <div className="h-12 w-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 shadow-sm">
                  <s.icon size={22} />
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">{s.label}</div>
                  <div className="text-[11px] text-slate-400 font-medium">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Portfolio Explorer Section */}
      <section className="bg-slate-50/70 py-16">
        <div className="container-x mx-auto max-w-[1400px]">
          
          {/* Interactive Control Header & Filter Controls */}
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 mb-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-accent flex items-center gap-1.5">
                  <SlidersHorizontal size={14} /> Structural Catalog
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Browse Structural Works
                </h2>
              </div>

              {/* View Switcher & Counter Badge */}
              <div className="flex items-center gap-3 self-start md:self-auto">
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                  Showing <strong className="text-slate-900">{filteredProjects.length}</strong> of {portfolioProjects.length} Projects
                </span>

                <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    title="Grid View"
                    className={`p-1.5 rounded-md transition ${viewMode === "grid" ? "bg-white text-accent shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
                  >
                    <LayoutGrid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    title="List View"
                    className={`p-1.5 rounded-md transition ${viewMode === "list" ? "bg-white text-accent shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Bar & Search Field */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-4 border-t border-slate-100">
              
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`rounded-xl px-4 py-2 text-xs font-bold tracking-wide transition-all duration-300 ${
                      activeFilter.toLowerCase() === cat.toLowerCase()
                        ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full lg:w-72">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search projects, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-9 py-2 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-accent focus:bg-white focus:outline-none transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Grid View Mode */}
          {viewMode === "grid" ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => {
                const projectSlug = project.slug || project.id;

                return (
                  <motion.article 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={project.id}
                    className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 relative border-t-4 border-t-accent"
                  >
                    {/* Image Link Frame */}
                    <Link 
                      to="/portfolio/$id" 
                      params={{ id: projectSlug }}
                      className="aspect-[16/9] w-full bg-slate-950 flex items-center justify-center relative overflow-hidden rounded-t-xl border-b border-slate-800 block cursor-pointer"
                    >
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </Link>

                    {/* Card Body */}
                    <div className="p-5 flex flex-col justify-between flex-1 bg-white space-y-4">
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 group-hover:text-accent transition duration-300 leading-snug flex-1">
                            <Link to="/portfolio/$id" params={{ id: projectSlug }}>
                              {project.title}
                            </Link>
                          </h3>
                          <span className="rounded-md bg-accent/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-accent border border-accent/20 shrink-0">
                            {project.category}
                          </span>
                        </div>

                        {project.location && (
                          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mt-2">
                            <MapPin size={13} className="text-accent shrink-0" />
                            <span className="truncate">{project.location}</span>
                          </div>
                        )}
                      </div>

                      {/* View Details Action Button */}
                      <div className="pt-3 border-t border-slate-100">
                        <Link
                          to="/portfolio/$id"
                          params={{ id: projectSlug }}
                          className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent px-4 py-2.5 text-xs font-bold text-white hover:brightness-110 transition duration-200 shadow-sm shadow-accent/15"
                        >
                          View Details <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          ) : (
            /* List View Mode */
            <div className="space-y-4">
              {filteredProjects.map((project) => {
                const projectSlug = project.slug || project.id;

                return (
                  <motion.article 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={project.id}
                    className="group flex flex-col md:flex-row items-center rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition p-4 md:p-5 gap-6 border-l-4 border-l-accent"
                  >
                    <Link 
                      to="/portfolio/$id" 
                      params={{ id: projectSlug }}
                      className="w-full md:w-64 aspect-[16/9] rounded-xl overflow-hidden relative bg-slate-950 shrink-0 flex items-center justify-center block cursor-pointer"
                    >
                      <img src={project.image} alt={project.title} className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
                    </Link>

                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-accent transition">
                          <Link to="/portfolio/$id" params={{ id: projectSlug }}>
                            {project.title}
                          </Link>
                        </h3>
                        <span className="rounded-md bg-accent/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-accent border border-accent/20">
                          {project.category}
                        </span>
                      </div>

                      {project.location && (
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                          <MapPin size={13} className="text-accent shrink-0" />
                          <span>{project.location}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center shrink-0 w-full md:w-auto justify-end border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                      <Link
                        to="/portfolio/$id"
                        params={{ id: projectSlug }}
                        className="inline-flex w-full md:w-auto items-center justify-center gap-1.5 rounded-xl bg-accent px-5 py-2.5 text-xs font-bold text-white hover:brightness-110 transition shadow shadow-accent/15"
                      >
                        View Details <ArrowRight size={14} />
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center max-w-lg mx-auto my-12">
              <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-4">
                <Search size={24} />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900">No Projects Found</h3>
              <p className="mt-2 text-xs text-slate-500">We couldn't find any completed projects matching your search term "{searchQuery}".</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("All");
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-bold text-white"
              >
                Reset Search Filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Turnkey Call to Action */}
      <section className="bg-slate-950 py-20 text-white border-t border-slate-800">
        <div className="container-x mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow text-accent">Turnkey Structural Engineering</span>
              <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl text-white">
                Have a Custom Building Requirement?
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
                Partner with India's trusted pre-engineered building experts. We provide end-to-end design, automated steel fabrication, and certified installation for commercial, industrial, and warehousing projects.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-start lg:justify-end">
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-7 py-4 text-sm font-semibold text-white hover:brightness-110 transition duration-300 shadow-lg shadow-accent/15"
              >
                Request Free Quote <ArrowRight size={16} />
              </Link>
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold text-white hover:bg-white/10 transition duration-300"
              >
                Contact Engineering Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
