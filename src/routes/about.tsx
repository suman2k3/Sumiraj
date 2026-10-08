import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import heroImg from "@/assets/hero-about.jpg";
import teamImg from "@/assets/img-team.jpg";
import { Target, Eye, Award, Users, Factory, TrendingUp, HardHat, Layers, Ruler, Clock, ShieldCheck } from "lucide-react";

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
  { year: "2017", title: "The Foundation", text: "Sumiraj was established with a focus on pre-engineered buildings and industrial steel structures." },
  { year: "2019", title: "Expanding Capabilities", text: "Expanded fabrication capabilities to support larger and more demanding industrial projects." },
  { year: "2021", title: "Growing Across Industries", text: "Successfully completed projects across multiple industrial sectors, strengthening our experience and execution capabilities." },
  { year: "2023", title: "Building Turnkey Capabilities", text: "Strengthened turnkey capabilities covering design, manufacturing, and erection, enabling more comprehensive project execution." },
  { year: "2025", title: "Expanding Our Manufacturing Footprint", text: "Expanded manufacturing operations with facilities in Greater Noida and Hapur, strengthening production capacity and operational reach." },
  { year: "2026", title: "200+ Projects and Counting", text: "Reached 200+ completed projects, serving industrial clients across India." },
];

const leaders = [
  { name: "Mr Mihir Singh", role: "CEO", note: "35+ years in heavy engineering" },
  { name: "Mr Pradeep Kumar", role: "GM", note: "Former Bosch India, IIT Bombay" },
  { name: "Mr Devendra Kumar", role: "Sales & Marketing Manager", note: "Metallurgy PhD, ex-Siemens" },
  { name: "Mr Alok Ranjan", role: "Project Manager", note: "TÜV-certified lead auditor" },
  
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
          </div>
        </div>
      </section>

      {/* Build With Confidence Section */}
      <section className="bg-slate-900 border-b border-slate-800 py-16 md:py-20 text-white">
        <div className="container-x mx-auto max-w-[1400px]">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center mb-12 md:mb-14">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white">
              BUILD WITH CONFIDENCE
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400 font-medium">
              Built around quality, expertise and dependable support at every stage.
            </p>
          </div>

          {/* 4 Column Unified Trust Band */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80 border-y sm:border-y-0 border-slate-800/80">
            {[
              {
                icon: ShieldCheck,
                title: "25-Year Warranty",
                desc: "Long-term confidence in every structure."
              },
              {
                icon: Users,
                title: "Experienced Team",
                desc: "Skilled professionals focused on precision and execution."
              },
              {
                icon: Factory,
                title: "Quality Manufacturing",
                desc: "Controlled manufacturing built around consistent quality."
              },
              {
                icon: Award,
                title: "End-to-End Support",
                desc: "Support from design and fabrication through erection and completion."
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="group flex flex-col items-center text-center p-6 md:p-8 transition-colors duration-300 hover:bg-slate-800/30"
              >
                <div className="h-12 w-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-5 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                  <item.icon size={24} />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2 transition-colors group-hover:text-accent">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-[240px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Redesigned Purpose, Vision & Mission Vertical Storytelling Section */}
      <section className="relative overflow-hidden bg-slate-950 py-20 md:py-28 text-white border-b border-slate-900">
        {/* Subtle Architectural Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} 
        />

        <div className="container-x mx-auto max-w-[1200px] relative z-10">
          {/* Header */}
          <div className="mb-16 md:mb-20">
            <span className="eyebrow text-accent">OUR PURPOSE</span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Guided by Vision. Driven by Mission.
            </h2>
          </div>

          {/* Vertical Storytelling Timeline */}
          <div className="relative pl-6 md:pl-12">
            {/* Thin Vertical Connecting Line */}
            <div className="absolute left-2.5 md:left-5 top-6 bottom-6 w-px bg-slate-800" />

            <div className="space-y-16 md:space-y-24">
              {/* Item 01: OUR VISION */}
              <div className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-6 md:-left-12 top-2 h-5 w-5 rounded-full bg-slate-950 border-2 border-accent ring-4 ring-slate-950 transition-all duration-300 group-hover:bg-accent group-hover:scale-125" />

                <div className="grid gap-6 md:grid-cols-[100px_1fr] md:items-start">
                  {/* Architectural Number */}
                  <div className="font-display text-6xl md:text-7xl font-black text-slate-800/80 tracking-tighter leading-none select-none transition-colors duration-300 group-hover:text-accent/30">
                    01
                  </div>

                  {/* Content Block */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-9 w-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                        <Eye size={20} />
                      </div>
                      <span className="font-display text-xs uppercase tracking-[0.25em] font-bold text-accent">
                        OUR VISION
                      </span>
                    </div>

                    <p className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight max-w-4xl">
                     To become a trusted partner for industrial infrastructure development across india through engineering excellence and customer-focused solutions </p>
                  </div>
                </div>
              </div>

              {/* Item 02: OUR MISSION */}
              <div className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-6 md:-left-12 top-2 h-5 w-5 rounded-full bg-slate-950 border-2 border-accent ring-4 ring-slate-950 transition-all duration-300 group-hover:bg-accent group-hover:scale-125" />

                <div className="grid gap-6 md:grid-cols-[100px_1fr] md:items-start">
                  {/* Architectural Number */}
                  <div className="font-display text-6xl md:text-7xl font-black text-slate-800/80 tracking-tighter leading-none select-none transition-colors duration-300 group-hover:text-accent/30">
                    02
                  </div>

                  {/* Content Block */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-9 w-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                        <Target size={20} />
                      </div>
                      <span className="font-display text-xs uppercase tracking-[0.25em] font-bold text-accent">
                        OUR MISSION
                      </span>
                    </div>

                    <p className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight max-w-4xl">
                      To deliver efficient, reliable, and cost-effective steel building solutions that suppoort industrail growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x mx-auto max-w-[1400px] py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">Our History</p>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Engineering Excellence. Built to Last.</h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            From our foundation in 2017 to delivering 200+ projects across India, Sumiraj has grown with a clear focus on engineering excellence, quality, and reliable execution.
          </p>
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
          <img src={teamImg} alt="Sumiraj team" className="aspect-[3/2] rounded-sm object-cover" loading="lazy" />
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

      {/* Why Choose Us Section */}
      <section className="container-x mx-auto max-w-[1400px] py-24">
        <div className="grid gap-3 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow">Why Sumiraj</p>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl text-slate-900">Why Leading Businesses Choose Sumiraj</h2>
          </div>
          <p className="text-slate-600 md:text-right max-w-md ml-auto">From precision engineering and advanced manufacturing to timely project delivery, Sumiraj provides end-to-end Pre-Engineered Building (PEB) solutions backed by quality, innovation, and decades of industry expertise.</p>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: HardHat,
              title: "Engineering Expertise",
              desc: "Experienced engineers deliver technically sound PEB solutions with a focus on structural performance, efficiency, and project requirements."
            },
            {
              icon: Layers,
              title: "Quality Material",
              desc: "We use quality steel and approved construction materials selected for strength, durability, and consistent structural performance."
            },
            {
              icon: Ruler,
              title: "Customized Design",
              desc: "Every building is designed according to its specific dimensions, usage, loading requirements, site conditions, and operational needs."
            },
            {
              icon: Clock,
              title: "Timely Delivery",
              desc: "Planned engineering, fabrication, and project coordination help ensure materials and structures are delivered according to the agreed project schedule."
            },
            {
              icon: Users,
              title: "Technical Support",
              desc: "Our technical team provides support throughout design, fabrication, erection, and project completion to address technical requirements effectively."
            },
            {
              icon: ShieldCheck,
              title: "Compliance with Indian Standards",
              desc: "Our designs and engineering processes follow applicable Indian Standards and relevant structural and construction requirements."
            }
          ].map((f) => (
            <div key={f.title} className="group bg-white p-8 transition hover:bg-accent hover:text-white flex flex-col justify-start">
              <f.icon size={32} className="text-accent transition group-hover:text-white shrink-0" />
              <h3 className="mt-6 font-display text-lg font-bold text-slate-900 group-hover:text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600 transition group-hover:text-white/90 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
