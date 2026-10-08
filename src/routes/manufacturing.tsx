import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { QualityProcess } from "@/components/site/QualityProcess";
import heroImg from "@/assets/hero-manufacturing.jpg";
import cncImg from "@/assets/img-cnc.jpg";
import robotImg from "@/assets/img-robot.jpg";
import welderImg from "@/assets/img-welder.jpg";
import { HardHat, ShieldAlert, Flame, Wrench } from "lucide-react";

export const Route = createFileRoute("/manufacturing")({
  head: () => ({
    meta: [
      { title: "Manufacturing Capabilities — Forging, Machining, Welding | Sumiraj" },
      { name: "description", content: "Vertically integrated manufacturing: forging, CNC machining, robotic welding and finishing across two integrated plants." },
      { property: "og:title", content: "Sumiraj Manufacturing" },
      { property: "og:description", content: "How we build — process, machines, production lines and safety standards." },
    ],
  }),
  component: Manufacturing,
});

const process = [
  { n: "01", t: "Design & Detailing", d: "Our engineering team develops detailed structural drawings, connection designs, and fabrication ready shop drwaings using advanced design software." },
  { n: "02", t: "CNC Steel Cutting", d: "Steel plates and sections are cut with precision CNC machinery to ensure dimensional accuracy and efficient fabrications." },
  { n: "03", t: "Welding & Fabrication", d: "Columns, rafters, and built-up members are fabricated by experienced welders following approved quality procedures." },
  { n: "04", t: "Surface Preparation", d: "All fabricated components undergo shot blasting to remove impurities and prepare surfaces for protective coatings." },
  { n: "05", t: "Painting & Coating", d: "Components receive high-quality primer and protective coatings to enhance corrosion resistance and service life." },
  { n: "06", t: "Quality Inspection & Dispatch", d: "Every component is inspected for dimensions, weld quality, and coating standards before dispatch to projeect sites." },
];

function Manufacturing() {
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

      <section className="container-x mx-auto max-w-[1400px] py-24">
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

      <section className="bg-secondary py-24">
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
      <section className="container-x mx-auto max-w-[1400px] py-24 border-t border-slate-200/60">
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
              img: cncImg,
              alt: "CNC plasma cutting machine used for steel fabrication"
            },
            {
              num: "02",
              title: "H-Beam Welding Line",
              desc: "Efficient and consistent welding of H-beam structural components for accurate fabrication.",
              img: welderImg,
              alt: "H-beam welding line used for structural steel fabrication"
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

      <section className="relative overflow-hidden bg-[var(--steel-dark)] py-24 text-primary-foreground">
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
