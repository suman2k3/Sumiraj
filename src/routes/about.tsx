import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import heroImg from "@/assets/hero-about.jpg";
import teamImg from "@/assets/img-team.jpg";
import { Target, Eye, Award, Users, Factory, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Sumiraj — Our Story, Vision & Leadership" },
      { name: "description", content: "Three decades of precision engineering, driven by 600+ specialists across two integrated facilities." },
      { property: "og:title", content: "About Sumiraj PEB & Steel Structures" },
      { property: "og:description", content: "Our story, vision, leadership and the team behind the forge." },
    ],
  }),
  component: About,
});

const timeline = [
  { year: "1987", title: "The Forge", text: "Founded as a 12-person forging workshop in Pune." },
  { year: "1996", title: "ISO 9001", text: "Became one of the first regional forgers to earn ISO certification." },
  { year: "2004", title: "Plant II", text: "Opened dedicated CNC & machining facility across 8 acres." },
  { year: "2011", title: "API 6D", text: "Certified for pipeline valves; exports to 20 countries." },
  { year: "2019", title: "Automation", text: "Installed robotic welding cells and in-line SPC systems." },
  { year: "2024", title: "Today", text: "600+ specialists shipping to 40+ countries with 98.4% OTIF." },
];

const leaders = [
  { name: "Rajiv Menon", role: "Managing Director", note: "35+ years in heavy engineering" },
  { name: "Ananya Rao", role: "Chief Operating Officer", note: "Former Bosch India, IIT Bombay" },
  { name: "Marcus Weber", role: "Head of R&D", note: "Metallurgy PhD, ex-Siemens" },
  { name: "Priya Shah", role: "Quality Director", note: "TÜV-certified lead auditor" },
];

function About() {
  return (
    <Layout>
      <PageHero
        image={heroImg}
        breadcrumb="About"
        eyebrow=""
        title={<>Engineered for Excellence,<br />Trusted to Build the Future.</>}
        subtitle="Delivering innovative Pre-Engineered Building (PEB) solutions with decades of engineering excellence, precision manufacturing, and turnkey project execution."
      />

      <section className="container-x mx-auto max-w-[1400px] py-24">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <p className="eyebrow">Company Introduction</p>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl leading-tight">
              Engineering Steel Structures That Stand the Test of Time.
            </h2>
          </div>
          <div className="space-y-4 text-muted-foreground md:text-lg">
            <p>Sumiraj is a leading Pre-Engineered Building (PEB) manufacturer in India, delivering end-to-end steel building solutions for industrial, commercial, warehousing, and infrastructure projects.</p>
            <p>Our commitment to innovation, quality, and customer satisfaction has earned the trust of businesses across diverse industries:<strong className="text-foreground">when the specification is critical, the order comes to Sumiraj.</strong></p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--steel-dark)] py-24 text-primary-foreground">
        <div className="container-x mx-auto grid max-w-[1400px] gap-8 md:grid-cols-2">
          {[
            { icon: Eye, label: "Our Vision", title: "To lead the future of industrial and commercial infrastructure through innovative steel engineering, sustainable construction practices, and customer-centric building solutions.", accent: true },
            { icon: Target, label: "Our Mission", title: "To provide reliable, cost-effective, and high-quality PEB and structural steel solutions by combining advanced technology, skilled professionals, and a culture of continuous improvement." },
          ].map((b) => (
            <div key={b.label} className={`rounded-sm p-10 ${b.accent ? "bg-accent text-accent-foreground" : "border border-white/10"}`}>
              <b.icon size={40} />
              <div className="mt-8 text-xs uppercase tracking-[0.3em] opacity-80">{b.label}</div>
              <p className="mt-3 font-display text-2xl font-bold leading-tight md:text-3xl">{b.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x mx-auto max-w-[1400px] py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">Our History</p>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Three decades. One direction.</h2>
        </div>
        <div className="relative mt-16">
          <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2" />
          <div className="space-y-10">
            {timeline.map((t, i) => (
              <div key={t.year} className={`relative grid gap-4 md:grid-cols-2 md:gap-16 ${i % 2 ? "md:[&>div:first-child]:col-start-2 md:[&>div:first-child]:text-left" : "md:[&>div:first-child]:text-right"}`}>
                <div className="pl-12 md:pl-0">
                  <div className="font-display text-4xl font-bold text-accent">{t.year}</div>
                  <div className="mt-1 font-display text-xl font-bold">{t.title}</div>
                  <p className="mt-2 text-muted-foreground">{t.text}</p>
                </div>
                <div className="absolute left-2 top-2 h-4 w-4 rounded-full bg-accent ring-4 ring-background md:left-1/2 md:-translate-x-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-x mx-auto max-w-[1400px]">
          <div className="max-w-2xl">
            <p className="eyebrow">Leadership</p>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">The people setting the standard.</h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leaders.map((l) => (
              <div key={l.name} className="rounded-sm bg-card p-6">
                <div className="mb-6 grid h-28 w-28 place-items-center rounded-full bg-[var(--steel-dark)] font-display text-3xl font-bold text-accent">
                  {l.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="font-display text-lg font-bold">{l.name}</div>
                <div className="mt-1 text-sm text-accent">{l.role}</div>
                <div className="mt-2 text-sm text-muted-foreground">{l.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x mx-auto max-w-[1400px] py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <img src={teamImg} alt="Sumiraj team" className="aspect-[4/3] rounded-sm object-cover" loading="lazy" />
          <div>
            <p className="eyebrow">Our Team</p>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">600 specialists. One shop floor.</h2>
            <p className="mt-5 text-muted-foreground">From master forgers with 30 years at the anvil to MIT-trained metallurgists, our team is what makes the tolerance possible. We invest heavily in apprenticeships, safety training and cross-plant knowledge transfer.</p>
            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {[["600+", "Team members"], ["18", "Nationalities"], ["42", "PhDs & Masters"]].map(([k, v]) => (
                <div key={k}>
                  <div className="font-display text-3xl font-bold">{k}</div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--steel-dark)] py-24 text-primary-foreground">
        <div className="container-x mx-auto max-w-[1400px]">
          <div className="max-w-2xl">
            <p className="eyebrow">Why Sumiraj</p>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">What our clients cite most.</h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { icon: Award, k: "01", t: "Certification depth", d: "Nine international quality certifications, all currently audited." },
              { icon: Users, k: "02", t: "People-first culture", d: "Average tenure of 12 years on the shop floor." },
              { icon: Factory, k: "03", t: "Integrated capacity", d: "Forge, machine, weld, test, ship — all in-house." },
              { icon: TrendingUp, k: "04", t: "Continuous improvement", d: "1,200+ Kaizen initiatives implemented since 2020." },
              { icon: Target, k: "05", t: "Specification obsession", d: "Every unit ships with a full traceability certificate." },
              { icon: Eye, k: "06", t: "Transparent operations", d: "Client audits welcome — 40+ visits last year." },
            ].map((f) => (
              <div key={f.t} className="border-t border-white/15 pt-6">
                <div className="flex items-center justify-between">
                  <f.icon size={28} className="text-accent" />
                  <span className="font-display text-2xl font-bold text-accent">{f.k}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{f.t}</h3>
                <p className="mt-2 text-sm text-primary-foreground/70">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
