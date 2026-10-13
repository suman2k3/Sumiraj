import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { buildingSystems } from "@/lib/buildingSystemsData";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-peb-system.jpg";
import { Columns, Layers, Building2, Cog, ArrowRight, Shield, Award, Sparkles, Wrench, Download } from "lucide-react";

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

interface ProductCardMeta {
  image: string;
  pdfFile: string;
  pdfUrl: string;
  pdfAvailable: boolean;
}

const productMetaMap: Record<string, ProductCardMeta> = {
  "pre-engineered-buildings": {
    image: "/images/products/banner-pre-engineered-buildings.jpg",
    pdfFile: "peb-buildings.pdf",
    pdfUrl: "/documents/peb-buildings.pdf",
    pdfAvailable: false,
  },
  "primary-framing": {
    image: "/images/products/banner-primary-framing.jpg",
    pdfFile: "primary-framing.pdf",
    pdfUrl: "/documents/primary-framing.pdf",
    pdfAvailable: false,
  },
  "secondary-framing-systems": {
    image: "/images/products/banner-secondary-framing.png",
    pdfFile: "secondary-framing-systems.pdf",
    pdfUrl: "/documents/secondary-framing-systems.pdf",
    pdfAvailable: false,
  },
  "roofing-and-wall-cladding-systems": {
    image: "/images/products/banner-roofing-cladding.png",
    pdfFile: "roofing-wall-cladding.pdf",
    pdfUrl: "/documents/roofing-wall-cladding.pdf",
    pdfAvailable: false,
  },
  "standing-seam-roofing-system": {
    image: "/images/products/banner-standing-seam-roofing.jpg",
    pdfFile: "standing-seam-roofing.pdf",
    pdfUrl: "/documents/standing-seam-roofing.pdf",
    pdfAvailable: false,
  },
  "mezzanine-floors": {
    image: "/images/products/banner-mezzanine-floors.jpg",
    pdfFile: "mezzanine-floors.pdf",
    pdfUrl: "/documents/mezzanine-floors.pdf",
    pdfAvailable: false,
  },
  "erection-and-installation": {
    image: "/images/products/banner-erection-installation.jpg",
    pdfFile: "erection-installation.pdf",
    pdfUrl: "/documents/erection-installation.pdf",
    pdfAvailable: false,
  },
};

const defaultCardMeta: ProductCardMeta = {
  image: "/images/products/pre-engineered-buildings.jpg",
  pdfFile: "product-specification.pdf",
  pdfUrl: "/documents/product-specification.pdf",
  pdfAvailable: false,
};

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

        {/* Technical Specifications / Catalogs */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-50 border-t border-slate-200/60">
          <div className="container-x mx-auto max-w-[1400px]">
            <div className="mb-12 border-b border-slate-200 pb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Technical Specifications</span>
              <h3 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl mt-2">
                Detailed Building System Catalogs
              </h3>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {buildingSystems.map((sys) => {
                const meta = productMetaMap[sys.slug] || defaultCardMeta;
                return (
                  <div
                    key={sys.slug}
                    className="group bg-white rounded-xl border border-slate-200/80 p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-slate-300 transition duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="font-display text-xl font-bold text-slate-900 group-hover:text-accent transition duration-300">
                        {sys.title}
                      </h4>
                      <p className="mt-2.5 text-sm text-slate-500 line-clamp-3 leading-relaxed">
                        {sys.description}
                      </p>

                      {/* Horizontal Product Image (~16:9 Landscape) */}
                      <Link
                        to="/products/$productId"
                        params={{ productId: sys.slug }}
                        className="mt-4 block w-full aspect-[16/9] rounded-lg overflow-hidden bg-slate-100 border border-slate-200/60 relative focus:outline-none focus:ring-2 focus:ring-accent/50"
                      >
                        <img
                          src={meta.image}
                          alt={`${sys.title} - Sumiraj Industries`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </Link>

                      {/* PDF Download Option (Directly below image) */}
                      <div className="mt-3.5 flex items-center">
                        {meta.pdfAvailable ? (
                          <a
                            href={meta.pdfUrl}
                            download={meta.pdfFile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-orange-600 border border-accent/40 hover:border-accent rounded-md px-3 py-1.5 bg-accent/5 hover:bg-accent/10 transition shadow-xs"
                          >
                            <Download size={13} className="shrink-0" />
                            <span>Download PDF</span>
                          </a>
                        ) : (
                          <div
                            title="PDF specification brochure in preparation. Contact us for direct technical data sheets."
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 border border-dashed border-slate-300 rounded-md px-2.5 py-1.5 bg-slate-50/80 cursor-default select-none"
                          >
                            <Download size={13} className="text-slate-400 shrink-0" />
                            <span>Download PDF</span>
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 ml-0.5">
                              Pending
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Footer: Read full specifications */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        to="/products/$productId"
                        params={{ productId: sys.slug }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-orange-600 transition"
                      >
                        Read full specifications{" "}
                        <ArrowRight
                          size={14}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Sumiraj / Sumiraj Advantage Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-white border-t border-b border-slate-100">
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
