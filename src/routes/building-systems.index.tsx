import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { buildingSystems } from "@/lib/buildingSystemsData";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-manufacturing.jpg";
import { Columns, Layers, Building2, Cog, ArrowRight, Shield, Award, Sparkles, Wrench } from "lucide-react";

export const Route = createFileRoute("/building-systems/")({
  head: () => ({
    meta: [
      { title: "Building Systems & PEB Anatomy | Sumiraj" },
      { name: "description", content: "Explore the structural components of Sumiraj Pre-Engineered Buildings, including primary frames, secondary systems, cladding, and accessories." },
    ],
  }),
  component: BuildingSystemsIndex,
});

function BuildingSystemsIndex() {
  const components = [
    {
      icon: Columns,
      title: "Primary Framing",
      desc: "High-strength structural steel columns, rafters, and rigid frames engineered to handle vertical and lateral loads over large clear spans.",
      to: "/building-systems/primary-framing"
    },
    {
      icon: Layers,
      title: "Secondary Framing",
      desc: "Cold-formed Z and C sections (purlins, girts, and eave struts) that transfer structural loads to the primary frame and support the cladding.",
      to: "/building-systems/secondary-framing-systems"
    },
    {
      icon: Building2,
      title: "Roof & Wall Cladding",
      desc: "Vibrant and durable Galvalume® sheets, insulated sandwich panels, and standing seam solutions providing weather resistance and thermal insulation.",
      to: "/building-systems/roofing-and-wall-cladding-systems"
    },
    {
      icon: Cog,
      title: "Accessories & Trims",
      desc: "Natural ridge ventilators, turbo fans, sky panels, louvers, gutters, and flashing designed to complete the building's utility and aesthetics.",
      to: "/building-systems/standing-seam-roofing-system"
    }
  ];

  const advantages = [
    { title: "Advanced Engineering", desc: "Using cutting-edge BIM modeling and structural design software to ensure material optimization and architectural excellence.", icon: Sparkles },
    { title: "Certified Manufacturing", desc: "Our ISO-certified facility utilizes high-speed automated CNC lines and precision fabrication processes.", icon: Award },
    { title: "Turnkey Project Delivery", desc: "From conceptual structural analysis to final site erection and testing, we manage the entire project lifecycle.", icon: Wrench },
    { title: "Durability & Standard Compliance", desc: "Every structure is constructed to comply with strict national and international codes, guaranteeing lifetime security.", icon: Shield }
  ];

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.4 }}
      >
        <PageHero
          image={heroImg}
          breadcrumb="Building Systems"
          eyebrow="Integrated Architecture"
          title={<>Complete Pre-Engineered<br />Building Systems.</>}
          subtitle="Explore the structural components that make up a state-of-the-art PEB structure. From primary columns to standing seam roofs, every element is designed to work in unified strength."
        />

        {/* Structural Anatomy Overview */}
        <section className="py-20 bg-white">
          <div className="container-x mx-auto max-w-[1400px]">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="eyebrow">Integrated Anatomy</span>
              <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl text-slate-900">
                The Anatomy of a Sumiraj PEB
              </h2>
              <p className="mt-3 text-slate-650 text-sm sm:text-base leading-relaxed">
                A pre-engineered building is an optimized system of components working together. Explore the main sub-framing layers and accessories below.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {components.map((comp, idx) => (
                <div key={idx} className="bg-slate-50 rounded-xl border border-slate-100 p-8 shadow-sm flex flex-col hover:shadow-md hover:border-slate-200 transition-all duration-300">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-6 shrink-0">
                    <comp.icon size={24} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900 mb-3">{comp.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-6">{comp.desc}</p>
                  <Link 
                    to={comp.to} 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-orange-600 transition"
                  >
                    View System details <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sub-pages Grid */}
        <section className="py-20 bg-slate-50 border-t border-slate-200/40">
          <div className="container-x mx-auto max-w-[1400px]">
            <div className="mb-12 border-b border-slate-200 pb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Technical Specifications</span>
              <h3 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl mt-2">
                Detailed Building System Catalogs
              </h3>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {buildingSystems.map((sys) => (
                <div key={sys.slug} className="group bg-white rounded-xl border border-slate-150 p-8 shadow-sm hover:shadow-md hover:border-slate-200 transition duration-300 flex flex-col">
                  <h4 className="font-display text-xl font-bold text-slate-900 group-hover:text-accent transition duration-300">
                    {sys.title}
                  </h4>
                  <p className="mt-3 text-sm text-slate-500 line-clamp-3 leading-relaxed flex-1">
                    {sys.description}
                  </p>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link 
                      to={`/building-systems/${sys.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-orange-600 transition"
                    >
                      Read full specifications <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Sumiraj Section */}
        <section className="py-20 bg-white border-t border-b border-slate-100">
          <div className="container-x mx-auto max-w-[1400px]">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="eyebrow">SUMIRAJ ADVANTAGE</span>
              <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl text-slate-900">
                Built for Durability and Efficiency
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                As a leading turnkey Pre-Engineered Building manufacturer in India, our workflow guarantees precision engineering from calculation to complete installation.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {advantages.map((adv, idx) => (
                <div key={idx} className="bg-slate-50 rounded-xl border border-slate-100 p-6 shadow-sm flex flex-col hover:shadow-md transition duration-300">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4 shrink-0">
                    <adv.icon size={20} />
                  </div>
                  <h4 className="font-display text-lg font-bold text-slate-900 mb-2">{adv.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed flex-1">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Turnkey Proposal CTA */}
        <section className="bg-accent py-16 text-white">
          <div className="container-x mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <h2 className="font-display text-2xl font-bold md:text-3xl">Ready to construct your Pre-Engineered Building?</h2>
              <p className="mt-2 max-w-xl text-white/85 text-xs sm:text-sm">Submit your build parameters or raw drawings to our team for a professional design and load analysis.</p>
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded bg-slate-900 px-7 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-black transition-all duration-300 shadow-lg shrink-0">
              Get Preliminary Quote <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </motion.div>
    </Layout>
  );
}
