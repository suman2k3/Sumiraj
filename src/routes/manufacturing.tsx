import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
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
  { n: "01", t: "Design & Simulation", d: "CAD modelling, FEA stress analysis and DFM review before a single billet is cut." },
  { n: "02", t: "Forging", d: "Hammer and press forging up to 1,600 tons, controlled cooling for grain refinement." },
  { n: "03", t: "Heat Treatment", d: "Normalise, quench-and-temper, PWHT in computer-controlled bogey hearth furnaces." },
  { n: "04", t: "CNC Machining", d: "5-axis milling, turning and boring centres achieving tolerances of ±0.005 mm." },
  { n: "05", t: "Welding & Assembly", d: "Certified WPS/PQR — TIG, MIG, SAW — automated cells for repeatability." },
  { n: "06", t: "Testing & Dispatch", d: "NDT, hydro-test, dimensional inspection, packing and export documentation." },
];

function Manufacturing() {
  return (
    <Layout>
      <PageHero
        image={heroImg}
        breadcrumb="Manufacturing"
        eyebrow="How We Build"
        title={<>Precision Manufacturing.<br />Engineered for Performance.</>}
        subtitle="A six-stage integrated process — from billet to shipment — under one roof."
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

      <section className="container-x mx-auto max-w-[1400px] py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Machines & Capacity</p>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">The tools behind the tolerance.</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { img: cncImg, t: "DMG Mori 5-Axis CNC", d: "12 units · ±0.005mm precision" },
            { img: welderImg, t: "Fronius TPS 500i Welders", d: "Certified TIG/MIG stations" },
            { img: robotImg, t: "KUKA Robotic Cells", d: "Automated welding & handling" },
            { img: cncImg, t: "Doosan Turning Centres", d: "Ø 800 mm × 3,000 mm capacity" },
            { img: welderImg, t: "SAW Weld Line", d: "Longitudinal & circumferential" },
            { img: robotImg, t: "Coordinate Measuring Machine", d: "Zeiss Contura, 1200×1500 mm" },
          ].map((m, i) => (
            <div key={i} className="group overflow-hidden rounded-sm bg-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={m.img} alt={m.t} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="font-display font-bold">{m.t}</div>
                <div className="mt-1 text-sm text-muted-foreground">{m.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

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
