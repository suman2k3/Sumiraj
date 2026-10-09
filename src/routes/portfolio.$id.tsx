import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/site/Layout";
import { usePortfolioProjects, getPortfolioProjectById } from "@/lib/portfolioStore";
import { 
  MapPin, 
  ArrowLeft, 
  Building2, 
  Layers, 
  CheckCircle2, 
  Maximize2,
  X
} from "lucide-react";
import { AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/portfolio/$id")({
  head: ({ params }) => {
    const project = getPortfolioProjectById(params.id);
    if (!project) {
      return {
        meta: [{ title: "Project Not Found | Sumiraj" }],
      };
    }
    return {
      meta: [
        { title: `${project.title} | Sumiraj` },
        { name: "description", content: `${project.description.substring(0, 155)}...` },
        { property: "og:title", content: project.title },
        { property: "og:description", content: project.description },
        { property: "og:image", content: project.image },
      ],
    };
  },
  component: ProjectDetails,
});

function ProjectDetails() {
  const { id } = useParams({ from: "/portfolio/$id" });
  const portfolioProjects = usePortfolioProjects();

  const project = useMemo(() => {
    return portfolioProjects.find(
      (p) => 
        p.id === id || 
        p.slug === id || 
        p._id === id || 
        p.id?.toLowerCase() === id?.toLowerCase() ||
        p.slug?.toLowerCase() === id?.toLowerCase()
    ) || getPortfolioProjectById(id);
  }, [portfolioProjects, id]);

  const [activeImage, setActiveImage] = useState<string>("");
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  if (!project) {
    return (
      <Layout>
        <div className="container-x mx-auto max-w-[1200px] py-20 text-center">
          <h1 className="font-display text-2xl font-bold text-slate-900">Project Not Found</h1>
          <p className="mt-2 text-sm text-slate-600">The project you are looking for could not be found.</p>
          <Link to="/portfolio" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-xs font-bold text-white hover:brightness-110 transition">
            <ArrowLeft size={14} /> Back to Portfolio
          </Link>
        </div>
      </Layout>
    );
  }

  const displayedImage = activeImage || project.image;
  const buildingType = project.specifications?.industry || project.category || project.workType || "Industrial PEB";
  const projectArea = project.builtUpArea || project.specifications?.area || "N/A";
  const keyFeatures = project.shortDescription || (project.highlights && project.highlights.length > 0 ? project.highlights[0] : project.description);

  return (
    <Layout>
      <div className="py-8 sm:py-12 bg-white min-h-[70vh]">
        <div className="container-x mx-auto max-w-[1200px]">
          
          {/* Unobtrusive Top Bar: Back Link & Compact Heading */}
          <div className="mb-6 space-y-2">
            <Link 
              to="/portfolio" 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-accent transition"
            >
              <ArrowLeft size={14} /> Back to Portfolio
            </Link>
            
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-b border-slate-150 pb-4">
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {project.title}
              </h1>
              {project.category && (
                <span className="rounded-md bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent border border-accent/20">
                  {project.category}
                </span>
              )}
            </div>
          </div>

          {/* Minimal 2-Column Wireframe Layout: Left Image (~60%), Right 4 Boxes (~40%) */}
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-12 lg:items-stretch">
            
            {/* Left Column — Large Project Image (~60% -> lg:col-span-7) */}
            <div className="lg:col-span-7 flex flex-col space-y-3">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-200/90 shadow-sm relative group">
                <img 
                  src={displayedImage} 
                  alt={project.title} 
                  className="h-full w-full object-cover object-center" 
                />
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="absolute bottom-3 right-3 rounded-lg bg-slate-950/80 hover:bg-slate-950 px-3 py-1.5 text-[11px] font-bold text-white shadow backdrop-blur transition flex items-center gap-1.5 border border-white/10"
                >
                  <Maximize2 size={13} /> Fullscreen
                </button>
              </div>

              {/* Optional Small Gallery Thumbnails if multiple images exist */}
              {project.gallery && project.gallery.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {project.gallery.map((imgUrl, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`aspect-[16/10] w-20 rounded-lg overflow-hidden border-2 bg-slate-900 shrink-0 transition ${
                        displayedImage === imgUrl ? "border-accent scale-95" : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <img src={imgUrl} alt="thumbnail" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column — 4 Vertically Stacked Description Boxes (~40% -> lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-3 sm:space-y-4">
              
              {/* Box 01: Project Location */}
              <div className="flex-1 rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 sm:p-5 flex flex-col justify-center transition hover:border-slate-300 hover:bg-slate-50">
                <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  <MapPin size={14} className="text-accent shrink-0" />
                  <span>01 — Project Location</span>
                </div>
                <div className="mt-1.5 font-display text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {project.location || "Ecotech 11, Greater Noida"}
                </div>
              </div>

              {/* Box 02: Building Type */}
              <div className="flex-1 rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 sm:p-5 flex flex-col justify-center transition hover:border-slate-300 hover:bg-slate-50">
                <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  <Building2 size={14} className="text-accent shrink-0" />
                  <span>02 — Building Type</span>
                </div>
                <div className="mt-1.5 font-display text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {buildingType}
                </div>
              </div>

              {/* Box 03: Project Area */}
              <div className="flex-1 rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 sm:p-5 flex flex-col justify-center transition hover:border-slate-300 hover:bg-slate-50">
                <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  <Layers size={14} className="text-accent shrink-0" />
                  <span>03 — Project Area</span>
                </div>
                <div className="mt-1.5 font-display text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {projectArea}
                </div>
              </div>

              {/* Box 04: Key Features */}
              <div className="flex-1 rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 sm:p-5 flex flex-col justify-center transition hover:border-slate-300 hover:bg-slate-50">
                <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  <CheckCircle2 size={14} className="text-accent shrink-0" />
                  <span>04 — Key Features</span>
                </div>
                <div className="mt-1.5 text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                  {keyFeatures}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Lightbox Modal for Fullscreen View */}
      <AnimatePresence>
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-white bg-slate-800/80 p-3 rounded-full hover:bg-slate-700 transition"
            >
              <X size={22} />
            </button>
            <div className="max-w-5xl max-h-[95vh] overflow-hidden rounded-xl">
              <img src={displayedImage} alt={project.title} className="max-w-full max-h-[90vh] object-contain" />
            </div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
