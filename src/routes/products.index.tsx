import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-peb-system.jpg";
import { Columns, Layers, Building2, Cog, ArrowRight, Shield, Award, Sparkles, Wrench } from "lucide-react";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products & PEB Anatomy | Sumiraj" },
      { name: "description", content: "Explore the structural components of Sumiraj Pre-Engineered Buildings, including primary frames, secondary systems, cladding, and accessories." },
      { property: "og:title", content: "Products & PEB Anatomy | Sumiraj" },
      { property: "og:description", content: "Explore the structural components of Sumiraj Pre-Engineered Buildings, including primary frames, secondary systems, cladding, and accessories." },
      { property: "og:url", content: "https://www.sumiraj.com/products" },
    ],
    links: [
      { rel: "canonical", href: "https://www.sumiraj.com/products" },
    ],
  }),
  component: ProductsIndex,
});

function ProductsIndex() {
  const components = [
    {
      icon: Columns,
      title: "Primary Framing",
      desc: "High-strength structural steel columns, rafters, and rigid frames engineered to handle vertical and lateral loads over large clear spans.",
      to: "/products/primary-framing"
    },
    {
      icon: Layers,
      title: "Secondary Framing",
      desc: "Cold-formed Z and C sections (purlins, girts, and eave struts) that transfer structural loads to the primary frame and support the cladding.",
      to: "/products/secondary-framing-systems"
    },
    {
      icon: Building2,
      title: "Roof & Wall Cladding",
      desc: "Vibrant and durable Galvalume® sheets, insulated sandwich panels, and standing seam solutions providing weather resistance and thermal insulation.",
      to: "/products/roofing-and-wall-cladding-systems"
    },
    {
      icon: Cog,
      title: "Standing Seam Roofing System",
      desc: "Concealed-fix roofing system designed for reliable weather protection, durability, and a clean architectural finish.",
      to: "/products/standing-seam-roofing-system"
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
          breadcrumb="Products"
          eyebrow="Integrated Architecture"
          title={<>Complete Pre-Engineered<br />Building Products.</>}
          subtitle="Explore the structural components that make up a state-of-the-art PEB structure. From primary columns to standing seam roofs, every element is designed to work in unified strength."
        />

        {/* Structural Anatomy Overview */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
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
                    View Product Details <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategic Engineering Advantages */}
        <section className="bg-slate-900 py-12 sm:py-16 md:py-20 text-white">
          <div className="container-x mx-auto max-w-[1400px]">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="eyebrow text-accent">Strategic Assurance</span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-white">
                Why Choose Sumiraj PEB Products?
              </h2>
              <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
                Our building products undergo rigorous quality inspection, automated component fit-up testing, and standard engineering procedures.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {advantages.map((adv, idx) => (
                <div key={idx} className="bg-slate-800/50 border border-slate-700/60 p-8 rounded-xl flex flex-col justify-start hover:border-accent/40 transition">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-6 shrink-0">
                    <adv.icon size={24} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">{adv.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-accent py-12 sm:py-16 text-white">
          <div className="container-x mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-8 md:flex-row relative z-10">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold md:text-4xl">Require custom structural specifications?</h2>
              <p className="mt-2 max-w-xl text-white/85 text-xs sm:text-sm">Connect with our structural design engineers to receive customized load analysis and preliminary estimates within 48 hours.</p>
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded bg-slate-900 px-7 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-black transition-all duration-300 shadow-lg shrink-0">
              Consult Engineering Team <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </motion.div>
    </Layout>
  );
}
