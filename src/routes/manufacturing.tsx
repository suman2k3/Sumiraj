import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { QualityProcess } from "@/components/site/QualityProcess";
import heroImg from "@/assets/hero-manufacturing.jpg";
import cncImg from "@/assets/img-cnc.jpg";
import cncPlasmaImg from "@/assets/cnc-plasma-cutting-machine.png";
import robotImg from "@/assets/img-robot.jpg";
import welderImg from "@/assets/img-welder.jpg";
import hbeamWeldingImg from "@/assets/hbeam-welding-line.png";
import { HardHat, ShieldAlert, Flame, Wrench, Timer, Ruler, Recycle, ShieldCheck, CalendarCheck, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/manufacturing")({
  head: () => ({
    meta: [
      { title: "Manufacturing Capabilities — Forging, Machining, Welding | Sumiraj" },
      { name: "description", content: "Vertically integrated manufacturing: forging, CNC machining, robotic welding and finishing across two integrated plants." },
      { property: "og:title", content: "Sumiraj Manufacturing" },
      { property: "og:description", content: "How we build — process, machines, production lines and safety standards." },
      { property: "og:url", content: "https://www.sumiraj.com/manufacturing" },
    ],
    links: [
      { rel: "canonical", href: "https://www.sumiraj.com/manufacturing" },
    ],
  }),
  component: Manufacturing,
});

const manufacturingGallery = [
  {
    id: "g1",
    category: "Steel Cutting",
    title: "Precision CNC Plasma Cutting",
    desc: "Automated high-definition plasma cutting of heavy steel plates.",
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=900&auto=format&fit=crop",
    alt: "CNC plasma cutting steel plate with sparks in manufacturing facility"
  },
  {
    id: "g2",
    category: "Welding",
    title: "Robotic Structural Welding",
    desc: "Continuous automatic welding of primary structural H-beams.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=900&auto=format&fit=crop",
    alt: "Industrial welding with bright arc light on steel member"
  },
  {
    id: "g3",
    category: "Fabrication",
    title: "Fabricated Frame Assembly",
    desc: "Precision fit-up and assembly of built-up steel rafters.",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=900&auto=format&fit=crop",
    alt: "Engineers inspecting heavy steel structure fabrication"
  },
  {
    id: "g4",
    category: "Steel Cutting",
    title: "Heavy Plate Shearing & Profiling",
    desc: "High-speed laser and oxy-fuel cutting according to shop drawings.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=900&auto=format&fit=crop",
    alt: "Industrial steel cutting machine with laser precision"
  },
  {
    id: "g5",
    category: "Welding",
    title: "Submerged Arc Column Welding",
    desc: "High-penetration welding for primary column flange and web connections.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=900&auto=format&fit=crop",
    alt: "Welder fabricating structural steel component"
  },
  {
    id: "g6",
    category: "Fabrication",
    title: "Secondary Framing & Purlin Production",
    desc: "Cold-formed C and Z purlin roll forming and punching.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=900&auto=format&fit=crop",
    alt: "Automated roll forming line for secondary steel framing"
  },
  {
    id: "g7",
    category: "Steel Cutting",
    title: "Band Saw Beam Sectioning",
    desc: "Automated high-capacity band saw cutting for hot-rolled sections.",
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=900&auto=format&fit=crop",
    alt: "Precision steel saw cutting I-beam section"
  },
  {
    id: "g8",
    category: "Welding",
    title: "Manual MIG Fit-Up & Tack Welding",
    desc: "Skilled welders performing detailed joint preparation and tack welding.",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=900&auto=format&fit=crop",
    alt: "Professional welder wearing protective helmet working on steel frame"
  },
  {
    id: "g9",
    category: "Fabrication",
    title: "Mezzanine & Truss Component Fabrication",
    desc: "Custom heavy truss framing built to exact architectural specifications.",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=900&auto=format&fit=crop",
    alt: "Structural steel truss alignment on shop floor"
  },
  {
    id: "g10",
    category: "Fabrication",
    title: "Final QC & Surface Prep Inspection",
    desc: "Shot blasting surface verification prior to protective primer coating.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=900&auto=format&fit=crop",
    alt: "Factory shop floor with fabricated steel components ready for dispatch"
  },
];

const precisionBenefits = [
  {
    num: "01",
    title: "Faster Site Erection",
    desc: "Accurately fabricated components help simplify on-site assembly and support a more efficient erection process.",
    icon: Timer,
  },
  {
    num: "02",
    title: "Better Fit-Up",
    desc: "Precision manufacturing helps structural components align correctly during assembly, reducing the need for unnecessary on-site adjustments.",
    icon: Ruler,
  },
  {
    num: "03",
    title: "Reduced Wastage",
    desc: "Accurate cutting and fabrication help minimize avoidable material waste and rework.",
    icon: Recycle,
  },
  {
    num: "04",
    title: "Improved Structural Performance",
    desc: "Components manufactured to approved drawings and specifications help achieve the intended structural fit and performance.",
    icon: ShieldCheck,
  },
  {
    num: "05",
    title: "Lower Project Delays",
    desc: "Consistent fabrication and proper component preparation help reduce avoidable rework and support smoother project execution.",
    icon: CalendarCheck,
  },
];

const process = [
  { n: "01", t: "Design & Detailing", d: "Our engineering team develops detailed structural drawings, connection designs, and fabrication ready shop drwaings using advanced design software." },
  { n: "02", t: "CNC Steel Cutting", d: "Steel plates and sections are cut with precision CNC machinery to ensure dimensional accuracy and efficient fabrications." },
  { n: "03", t: "Welding & Fabrication", d: "Columns, rafters, and built-up members are fabricated by experienced welders following approved quality procedures." },
  { n: "04", t: "Surface Preparation", d: "All fabricated components undergo shot blasting to remove impurities and prepare surfaces for protective coatings." },
  { n: "05", t: "Painting & Coating", d: "Components receive high-quality primer and protective coatings to enhance corrosion resistance and service life." },
  { n: "06", t: "Quality Inspection & Dispatch", d: "Every component is inspected for dimensions, weld quality, and coating standards before dispatch to projeect sites." },
];

function Manufacturing() {
  const galleryScrollRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: "left" | "right") => {
    if (galleryScrollRef.current) {
      const scrollAmount = direction === "left" ? -360 : 360;
      galleryScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <Layout>
      <PageHero
        image={heroImg}
        breadcrumb="Manufacturing"
        eyebrow="How We Build"
        title={<>Precision Manufacturing.<br />Engineered for Performance.</>}
        subtitle="Every Sumiraj is manufactured using advanced fabrication processes, strict quality control, and precision engineering to ensure durability, accuracy, and long-term performance."
        height="lg"
      />

      <section className="container-x mx-auto max-w-[1400px] py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">Manufacturing Process</p>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Six stages. Zero shortcuts.</h2>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {process.map((p) => (
            <div key={p.n} className="group relative overflow-hidden rounded-sm border bg-card p-8 transition hover:border-accent">
              <div className="font-display text-6xl font-bold text-accent/20 transition group-hover:text-accent/40">{p.n}</div>
              <h3 className="mt-4 font-display text-xl font-bold">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-12 sm:py-16 md:py-20">
        <div className="container-x mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Production Facility</p>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Advanced Manufacturing. Precision at Every Stage.</h2>
            <p className="mt-5 text-muted-foreground">Our modern manufacturing facilities combine advanced machinery, skilled engineering, and stringent quality control to produce high-performance Pre-Engineered Building (PEB) systems and structural steel components. Every stage of production is optimized for precision, efficiency, and consistent quality to meet the demands of industrial and commercial projects.</p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              {[["Modern", "Manufacturing Facilities"], ["Advanced", "CNC Fabrication Systems"], ["100%", "Quality Inspected Components"], ["Pan India", "Project Delivery Capability"]].map(([k, v]) => (
                <div key={k} className="border-l-2 border-accent pl-4">
                  <div className="font-display text-3xl font-bold">{k}</div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{v}</div>
                </div>
              ))}
            </div>
          </div>
          <img src={robotImg} alt="Automated production" className="aspect-[4/3] rounded-sm object-cover" loading="lazy" />
        </div>
      </section>

      {/* The Tools Behind the Tolerance Section */}
      <section className="container-x mx-auto max-w-[1400px] py-12 sm:py-16 md:py-20 border-t border-slate-200/60">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <p className="eyebrow justify-center">THE TOOLS BEHIND THE TOLERANCE</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold text-slate-900 sm:text-5xl">
            The Tools Behind the Tolerance
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Our manufacturing capabilities are supported by specialized equipment that enables precision fabrication, controlled finishing, quality inspection, and efficient material handling.
          </p>
        </div>

        {/* 3x2 Desktop, 2x3 Tablet, 1x6 Mobile Responsive Grid */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              num: "01",
              title: "CNC Plasma Cutting Machine",
              desc: "Precision cutting of steel components according to engineered dimensions and profiles.",
              img: cncPlasmaImg,
              alt: "CNC plasma cutting machine used for steel fabrication"
            },
            {
              num: "02",
              title: "H-Beam Welding Line",
              desc: "Efficient and consistent welding of H-beam structural components for accurate fabrication.",
              img: hbeamWeldingImg,
              alt: "H-beam welding line machine used for structural steel fabrication"
            },
            {
              num: "03",
              title: "Shot Blasting Machine",
              desc: "Controlled surface preparation to remove contaminants and create a suitable surface for coating.",
              img: robotImg,
              alt: "Shot blasting machine used for steel surface preparation"
            },
            {
              num: "04",
              title: "Airless Painting System",
              desc: "Uniform protective coating application for consistent finish and long-term steel protection.",
              img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
              alt: "Airless painting system used for protective coating"
            },
            {
              num: "05",
              title: "Quality Inspection Equipment",
              desc: "Inspection and measurement equipment used to verify fabrication quality and dimensional accuracy.",
              img: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800&auto=format&fit=crop",
              alt: "Quality inspection equipment used for fabrication inspection"
            },
            {
              num: "06",
              title: "Material Handling Systems",
              desc: "Efficient movement and handling of structural steel components throughout the manufacturing process.",
              img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
              alt: "Material handling systems used in steel manufacturing"
            }
          ].map((tool) => (
            <div 
              key={tool.num} 
              className="group flex flex-col h-full overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-md"
            >
              {/* Image with 3:2 aspect ratio */}
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-slate-950">
                <img
                  src={tool.img}
                  alt={tool.alt}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />
                
                {/* Number Badge */}
                <span className="absolute top-4 left-4 inline-flex items-center rounded-md bg-slate-950/80 backdrop-blur-md border border-white/10 px-2.5 py-1 text-xs font-bold font-display text-accent shadow-sm">
                  {tool.num}
                </span>
              </div>

              {/* Card Body */}
              <div className="flex flex-col flex-1 p-6">
                <h3 className="font-display text-xl font-bold text-slate-900 mb-2 transition-colors group-hover:text-accent">
                  {tool.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">
                  {tool.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quality at Every Step Section */}
      <QualityProcess />

      {/* Why Manufacturing Precision Matters Section */}
      <section className="bg-slate-50 border-y border-slate-200/70 py-12 sm:py-16 md:py-20">
        <div className="container-x mx-auto max-w-[1400px]">
          {/* Section Heading */}
          <div className="mx-auto max-w-3xl text-center mb-14 md:mb-16">
            <p className="eyebrow justify-center">MANUFACTURING PRECISION</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Why Manufacturing Precision Matters
            </h2>
            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              Precision in manufacturing helps ensure accurate component fit-up, efficient site erection, reduced material wastage, and dependable structural performance throughout project execution.
            </p>
          </div>

          {/* 5 Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-6">
            {precisionBenefits.map((item) => (
              <div
                key={item.num}
                className="group bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-11 w-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition duration-300">
                      <item.icon size={22} />
                    </div>
                    <span className="font-mono text-xs font-extrabold text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-md">
                      {item.num}
                    </span>
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 group-hover:text-accent transition duration-300 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Facility Gallery Section */}
      <section className="bg-slate-900 border-b border-slate-800 py-12 sm:py-16 md:py-20 text-white overflow-hidden">
        <div className="container-x mx-auto max-w-[1400px]">
          {/* Section Header with Navigation Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-14">
            <div className="max-w-2xl">
              <p className="eyebrow text-accent">FACILITY GALLERY</p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Manufacturing Facility Gallery
              </h2>
              <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
                Explore the manufacturing processes behind Sumiraj's pre-engineered buildings and structural steel solutions, from steel cutting and welding to precision fabrication.
              </p>
            </div>

            {/* Desktop Carousel Arrows */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <button
                onClick={() => scrollGallery("left")}
                aria-label="Scroll left"
                className="h-11 w-11 rounded-full bg-slate-800/80 border border-slate-700/80 text-white flex items-center justify-center hover:bg-accent hover:border-accent transition duration-300 active:scale-95 cursor-pointer"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={() => scrollGallery("right")}
                aria-label="Scroll right"
                className="h-11 w-11 rounded-full bg-slate-800/80 border border-slate-700/80 text-white flex items-center justify-center hover:bg-accent hover:border-accent transition duration-300 active:scale-95 cursor-pointer"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

          {/* Horizontally Scrollable Gallery Track */}
          <div
            ref={galleryScrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2 px-0.5 -mx-0.5"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {manufacturingGallery.map((item) => (
              <div
                key={item.id}
                className="group relative shrink-0 w-[260px] sm:w-[300px] md:w-[320px] aspect-[3/4] overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-md transition-all duration-300 hover:border-accent/60 snap-start select-none"
              >
                {/* Portrait Image (3:4 aspect ratio) */}
                <img
                  src={item.image}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Top Category Badge */}
                <span className="absolute top-3.5 left-3.5 z-10 text-[11px] font-mono font-bold uppercase tracking-wider text-accent bg-slate-950/85 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full shadow-sm">
                  {item.category}
                </span>

                {/* Bottom Dark Gradient & Readable Caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-90 flex flex-col justify-end p-5 transition-opacity duration-300">
                  <h3 className="font-display text-base sm:text-lg font-bold text-white mb-1.5 leading-snug group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-[95%]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Swipe Hint */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs font-mono font-medium text-slate-400 uppercase tracking-widest sm:hidden">
            <span>← Swipe horizontally to explore gallery →</span>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--steel-dark)] py-12 sm:py-16 md:py-20 text-primary-foreground">
        <div className="container-x mx-auto max-w-[1400px]">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:items-center">
            <div>
              <p className="eyebrow">Safety Standards</p>
              <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Zero-harm. Non-negotiable.</h2>
              <p className="mt-5 text-primary-foreground/70">Safety isn't a policy — it's the operating system of every shift. 1,847 days since our last lost-time incident and counting.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: HardHat, t: "PPE Compliance", d: "100% adherence on shop floor, monitored daily." },
                { icon: ShieldAlert, t: "Incident Rate", d: "0.04 per 200k hrs — top decile industry." },
                { icon: Flame, t: "Hot Work Permits", d: "Digital sign-off before every arc strike." },
                { icon: Wrench, t: "Toolbox Talks", d: "5-minute daily briefings, all crews." },
              ].map((s) => (
                <div key={s.t} className="rounded-sm border border-white/10 bg-white/[0.03] p-6">
                  <s.icon size={28} className="text-accent" />
                  <div className="mt-4 font-display text-lg font-bold">{s.t}</div>
                  <div className="mt-1 text-sm text-primary-foreground/70">{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
