import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/site/Layout";
import { portfolioProjects, Project } from "@/lib/portfolioData";
import { MapPin, ArrowLeft, ArrowRight, CheckCircle2, Ruler, ShieldCheck, Factory, HardHat } from "lucide-react";

export const Route = createFileRoute("/portfolio/$id")({
  head: ({ params }) => {
    const project = portfolioProjects.find((p) => p.id === params.id);
    if (!project) {
      return {
        meta: [{ title: "Project Not Found | Sumiraj" }],
      };
    }
    return {
      meta: [
        { title: `${project.title} | Completed PEB Project | Sumiraj` },
        { name: "description", content: `${project.description.substring(0, 155)}...` },
        { property: "og:title", content: project.title },
        { property: "og:description", content: project.description },
        { property: "og:image", content: project.image },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: ProjectDetails,
});

function ProjectDetails() {
  const { id } = useParams({ from: "/portfolio/$id" });

  const project = useMemo(() => {
    return portfolioProjects.find((p) => p.id === id);
  }, [id]);

  const relatedProjects = useMemo(() => {
    if (!project) return [];
    return portfolioProjects.filter((p) => p.id !== project.id);
  }, [project]);

  const [activeImage, setActiveImage] = useState<string>("");

  if (!project) {
    return (
      <Layout>
        <div className="container-x mx-auto py-24 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Project Not Found</h1>
          <p className="mt-4 text-slate-650">The portfolio project you are looking for does not exist.</p>
          <Link to="/portfolio" className="mt-6 inline-flex items-center gap-2 rounded bg-accent px-5 py-2.5 text-xs font-bold text-white">
            <ArrowLeft size={14} /> Back to Portfolio
          </Link>
        </div>
      </Layout>
    );
  }

  // fallback for active image state initialization
  const displayedImage = activeImage || project.image;

  return (
    <Layout>
      {/* Breadcrumb Row */}
      <div className="bg-slate-50 border-b border-slate-150 py-4">
        <div className="container-x mx-auto max-w-[1400px] flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span>/</span>
            <Link to="/portfolio" className="hover:text-accent">Portfolio</Link>
            <span>/</span>
            <span className="text-slate-800 font-medium truncate max-w-[180px] sm:max-w-xs">{project.title}</span>
          </div>
          <Link to="/portfolio" className="inline-flex items-center gap-1 hover:text-accent font-bold">
            <ArrowLeft size={12} /> Back to Portfolio
          </Link>
        </div>
      </div>

      {/* Main Showcase Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-x mx-auto max-w-[1400px]">
          
          {/* Project Title Block */}
          <div className="max-w-4xl mb-10">
            <span className="rounded bg-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
              {project.category}
            </span>
            <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-500">
              <MapPin size={16} className="text-accent" />
              <span>{project.location}</span>
            </div>
          </div>

          {/* Project Image Gallery Block */}
          <div className="space-y-4 mb-14">
            <div className="aspect-[21/9] w-full overflow-hidden rounded-xl bg-slate-100 border shadow-sm relative">
              <img 
                src={displayedImage} 
                alt={`${project.title} featured image`} 
                className="h-full w-full object-cover transition-all duration-300" 
              />
            </div>
            {project.gallery.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {project.gallery.map((imgUrl, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`aspect-[16/10] w-32 rounded-lg overflow-hidden border-2 bg-slate-50 shrink-0 transition-all ${
                      displayedImage === imgUrl ? "border-accent shadow-sm scale-95" : "border-slate-200 hover:border-accent/50"
                    }`}
                  >
                    <img src={imgUrl} alt={`gallery thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Core Project Details Layout */}
          <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:items-start">
            
            {/* Left Column: Description & Highlights */}
            <div className="space-y-10 min-w-0">
              <div>
                <h2 className="font-display text-2xl font-extrabold text-slate-900 border-b border-slate-100 pb-3 mb-4">
                  Project Overview
                </h2>
                <p className="text-slate-650 leading-relaxed text-base sm:text-lg">
                  {project.description}
                </p>
                <p className="mt-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                  Every structural component was engineered and manufactured in-house at Sumiraj's specialized facility in Greater Noida. The layout design matches heavy machinery load requirements, localized wind/seismic regulations, and optimizes structural efficiency to achieve a cost-effective, high-durability space.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                  <ShieldCheck size={22} className="text-accent" /> Key Engineering Highlights
                </h3>
                <ul className="space-y-4">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" />
                      <span className="text-slate-650 text-sm sm:text-base leading-relaxed">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Specification Cards Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-24">
              
              {/* Technical Specifications */}
              <div className="rounded-xl border border-slate-150 p-6 bg-slate-50 shadow-sm">
                <h4 className="font-display text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-200 pb-3 flex items-center gap-2 mb-5">
                  <Factory size={16} className="text-accent" /> Technical Specifications
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Manufacturing Process</span>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">{project.specifications.process}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Materials Used</span>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">{project.specifications.materials}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Industry Served</span>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">{project.specifications.industry}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Covered Area</span>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">{project.specifications.area}</p>
                  </div>
                </div>
              </div>

              {/* Sidebar Consult CTA */}
              <div className="rounded-xl bg-slate-950 p-6 text-white border border-slate-800 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent flex items-center gap-1"><Ruler size={12} /> Design Assessment</span>
                <h4 className="font-display text-xl font-bold mt-2 text-white">Have a similar build requirement?</h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  Our engineering team can evaluate your preliminary warehouse or commercial drawings, providing cost estimations and structural reviews within 48 hours.
                </p>
                <div className="mt-6">
                  <Link 
                    to="/contact" 
                    className="inline-flex w-full items-center justify-center gap-2 rounded bg-accent py-3 text-xs font-bold text-white hover:brightness-110 transition shadow-lg shadow-accent/15"
                  >
                    Submit Drawing Files <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Projects Carousel Section */}
      {relatedProjects.length > 0 && (
        <section className="bg-slate-50 py-20 border-t border-slate-200/50">
          <div className="container-x mx-auto max-w-[1400px]">
            <span className="eyebrow">Visual Tour</span>
            <h3 className="mt-3 font-display text-3xl font-extrabold text-slate-900 mb-10">Other Completed Projects</h3>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-4xl">
              {relatedProjects.map((proj) => (
                <article 
                  key={proj.id}
                  className="group flex flex-col overflow-hidden rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300"
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img 
                      src={proj.image} 
                      alt={proj.title} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                      <span className="text-accent">{proj.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><MapPin size={10} /> {proj.location.split(',')[0]}</span>
                    </div>
                    <h4 className="mt-3 font-display text-base font-bold leading-snug text-slate-900 group-hover:text-accent transition duration-300 flex-1 line-clamp-1">
                      <Link to={`/portfolio/${proj.id}`}>
                        {proj.title}
                      </Link>
                    </h4>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-slate-400">
                        Area: {proj.specifications.area}
                      </span>
                      <Link 
                        to={`/portfolio/${proj.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:text-orange-600 transition"
                      >
                        Explore Project <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quote Banner CTA */}
      <section className="bg-accent py-16 text-white">
        <div className="container-x mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <h2 className="font-display text-2xl font-bold md:text-3xl">Want a customized PEB proposal?</h2>
            <p className="mt-2 max-w-xl text-white/85 text-xs sm:text-sm">Connect directly with our sales and technical consultants to outline your steel structures requirements.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 rounded bg-slate-900 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-black transition-all duration-300 shadow-lg"
            >
              Get Free Estimate <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
