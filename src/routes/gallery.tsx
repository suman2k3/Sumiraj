import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import heroImg from "@/assets/hero-gallery.jpg";
import img1 from "@/assets/hero-home.jpg";
import img2 from "@/assets/hero-manufacturing.jpg";
import img3 from "@/assets/hero-infrastructure.jpg";
import img4 from "@/assets/hero-quality.jpg";
import img5 from "@/assets/img-cnc.jpg";
import img6 from "@/assets/img-welder.jpg";
import img7 from "@/assets/img-robot.jpg";
import img8 from "@/assets/img-warehouse.jpg";
import img9 from "@/assets/img-team.jpg";
import img10 from "@/assets/img-pipes.jpg";
import img11 from "@/assets/img-valve.jpg";
import img12 from "@/assets/img-gears.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Factory, Machines, Team & Projects | Sumiraj" },
      { name: "description", content: "A visual walkthrough of Sumiraj: factory floors, machinery, our team and completed projects." },
      { property: "og:title", content: "Sumiraj Gallery" },
      { property: "og:description", content: "Factory, machines, team and projects — in pictures." },
    ],
  }),
  component: Gallery,
});

type Cat = "All" | "Factory" | "Machines" | "Team" | "Production" | "Projects";
const items: { src: string; cat: Exclude<Cat, "All">; caption: string }[] = [
  { src: img1, cat: "Factory", caption: "Steel casting bay — Plant I" },
  { src: img2, cat: "Machines", caption: "Robotic welding line" },
  { src: img3, cat: "Factory", caption: "Aerial view — main campus" },
  { src: img4, cat: "Production", caption: "Precision measurement in QC lab" },
  { src: img5, cat: "Machines", caption: "5-axis CNC in action" },
  { src: img6, cat: "Production", caption: "Certified TIG welder at work" },
  { src: img7, cat: "Machines", caption: "KUKA robotic assembly cell" },
  { src: img8, cat: "Factory", caption: "Central warehouse — 42k positions" },
  { src: img9, cat: "Team", caption: "Plant II crew, morning shift" },
  { src: img10, cat: "Projects", caption: "Custom pipeline order — export ready" },
  { src: img11, cat: "Projects", caption: "Class 900 valve assembly" },
  { src: img12, cat: "Projects", caption: "Precision gear set — automotive Tier-1" },
];

function Gallery() {
  const [cat, setCat] = useState<Cat>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filtered = cat === "All" ? items : items.filter((i) => i.cat === cat);
  const cats: Cat[] = ["All", "Factory", "Machines", "Team", "Production", "Projects"];

  return (
    <Layout>
      <PageHero
        image={heroImg}
        breadcrumb="Gallery"
        eyebrow="Visual Tour"
        title={<>See the forge<br />from the inside.</>}
        subtitle="A curated look at our facilities, machinery, team and completed projects."
      />

      <section className="container-x mx-auto max-w-[1400px] py-16">
        <div className="flex flex-wrap gap-2 border-b border-border pb-6">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${cat === c ? "bg-accent text-accent-foreground" : "border border-border hover:border-accent hover:text-accent"}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((it, i) => (
            <button key={it.src + i} onClick={() => setLightbox(i)} className="group relative aspect-[4/3] overflow-hidden rounded-sm">
              <img src={it.src} alt={it.caption} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--steel-dark)]/90 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 text-left text-primary-foreground opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                <div className="text-xs uppercase tracking-widest text-accent">{it.cat}</div>
                <div className="mt-1 font-display text-sm font-bold">{it.caption}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {lightbox !== null && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 z-[60] grid cursor-zoom-out place-items-center bg-black/90 p-6">
          <img src={filtered[lightbox].src} alt={filtered[lightbox].caption} className="max-h-[85vh] max-w-full rounded-sm object-contain" />
          <div className="absolute bottom-6 text-center text-primary-foreground">
            <div className="text-xs uppercase tracking-widest text-accent">{filtered[lightbox].cat}</div>
            <div className="mt-1 font-display text-lg font-bold">{filtered[lightbox].caption}</div>
          </div>
        </div>
      )}
    </Layout>
  );
}
