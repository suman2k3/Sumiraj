import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { portfolioProjects, Project } from "@/lib/portfolioData";
import heroImg from "@/assets/hero-gallery.jpg"; // reuse beautiful gallery hero background
import { MapPin, ArrowRight, Building2, Layers, CalendarRange, Users, Construction } from "lucide-react";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Our Portfolio | Completed PEB & Steel Projects | Sumiraj" },
      { name: "description", content: "Explore Sumiraj's portfolio of over 100+ prestigious pre-engineered steel buildings, warehouses, and industrial plants across India." },
      { property: "og:title", content: "Sumiraj PEB Projects Portfolio" },
      { property: "og:description", content: "100+ projects completed covering 20M+ square feet of premium industrial and commercial space." },
    ],
  }),
  component: PortfolioListing,
});

type CategoryFilter = "All" | "Industrial" | "Commercial";

function PortfolioListing() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return portfolioProjects;
    return portfolioProjects.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  const stats = [
    { value: "100+", label: "Projects Completed", icon: Building2 },
    { value: "20M+", label: "Area Covered (Sq. Ft.)", icon: Layers },
    { value: "10+", label: "Years of Experience", icon: CalendarRange },
    { value: "1K+", label: "Strong Team", icon: Users }
  ];

  return (
    <Layout>
      <PageHero
        image={heroImg}
        breadcrumb="Portfolio"
        eyebrow="Visual Showcase"
        title={<>Forging Spaces for<br />Industry Leaders.</>}
        subtitle="Explore our prestigious completed projects. As designers, fabricators, and installers, we deliver certified high-strength structural solutions tailored for industrial and commercial development."
      />

      {/* Statistics Section */}
      <section className="bg-white border-b border-slate-100 py-16">
        <div className="container-x mx-auto max-w-[1400px]">
          <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
            {stats.map((s, idx) => (
              <div 
                key={idx} 
                className="relative overflow-hidden rounded-xl bg-slate-55/30 border border-slate-100 p-6 sm:p-8 flex flex-col items-center text-center shadow-sm hover:shadow transition duration-300"
              >
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4 shrink-0">
                  <s.icon size={22} />
                </div>
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {s.value}
                </span>
                <span className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Listing Grid Section */}
      <section className="bg-slate-50/70 py-20">
        <div className="container-x mx-auto max-w-[1400px]">
          
          {/* Header & Category Filters */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-slate-200 pb-8 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent flex items-center gap-1.5 mb-2">
                <Construction size={14} /> Completed Works
              </span>
              <h2 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Featured Projects
              </h2>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {(["All", "Industrial", "Commercial"] as CategoryFilter[]).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-accent text-white shadow-md shadow-accent/15"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-accent/40"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <article 
                key={project.id}
                className="group flex flex-col overflow-hidden rounded-xl bg-white border border-slate-100 shadow-md hover:shadow-xl transition-all duration-500"
              >
                {/* Image Wrap */}
                <div className="aspect-[4/3] overflow-hidden relative bg-slate-100">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Hover Overlay for Desktop */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 hidden md:flex">
                    <span className="inline-block self-start rounded bg-accent/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white mb-3">
                      {project.category}
                    </span>
                    <h3 className="font-display text-xl font-bold text-white leading-tight">
                      {project.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                      <MapPin size={12} className="text-accent" />
                      {project.location}
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <Link 
                        to={`/portfolio/${project.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-white transition duration-300"
                      >
                        View Project Details <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Card Info Body (Always visible, great for Mobile/Accessibility) */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                    <span className="text-accent">{project.category}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {project.location.split(',')[0]}</span>
                  </div>
                  
                  <h3 className="mt-3 font-display text-lg font-bold text-slate-900 group-hover:text-accent transition duration-300">
                    <Link to={`/portfolio/${project.id}`}>
                      {project.title}
                    </Link>
                  </h3>
                  
                  <p className="mt-2 text-sm text-slate-650 line-clamp-3 flex-1 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                      Area: {project.specifications.area}
                    </span>
                    <Link 
                      to={`/portfolio/${project.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:text-orange-600 transition"
                    >
                      View Details <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* Turnkey Call to Action */}
      <section className="bg-slate-950 py-20 text-white border-t border-slate-800">
        <div className="container-x mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow text-accent">Turnkey Project Engineering</span>
              <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl text-white">
                Have a Manufacturing or PEB Requirement?
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
                Partner with India's trusted pre-engineered building experts. We offer complete custom design, automated steel fabrication, and certified installation services across commercial, warehousing, and heavy industrial domains.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-start lg:justify-end">
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded bg-accent px-7 py-4 text-sm font-semibold text-white hover:brightness-110 transition duration-300 shadow-lg shadow-accent/15"
              >
                Request Free Quote <ArrowRight size={16} />
              </Link>
              <Link 
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded border border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold text-white hover:bg-white/10 transition duration-300"
              >
                Contact Our Engineering Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
