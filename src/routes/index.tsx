import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Factory,
  Cog,
  Globe2,
  Award,
  Truck,
  Building2,
  Ruler,
  CheckCircle2,
  ChevronRight,
  HardHat,
  Columns,
  Layers,
  Sparkles,
  Zap,
  Clock,
  Coins
} from "lucide-react";
import teamImg from "@/assets/img-team.jpg";
import valveImg from "@/assets/img-valve.jpg";
import gearsImg from "@/assets/img-gears.jpg";
import pipesImg from "@/assets/img-pipes.jpg";
import heroHomeImg from "@/assets/hero-home.jpg";
import warehouseImg from "@/assets/img-warehouse.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sumiraj PEB — Pre-Engineered Steel Buildings & Heavy Engineering" },
      { name: "description", content: "ISO 9001 certified manufacturer of Pre-Engineered Buildings (PEB), industrial steel warehouses, structural frames, and heavy engineering components." },
      { property: "og:title", content: "Sumiraj PEB & Steel Structures" },
      { property: "og:description", content: "Three decades of precision PEB engineering, heavy fabrication, and turnkey industrial construction." },
    ],
  }),
  component: Home,
});

const heroImages = [
  {
    url: heroHomeImg,
    alt: "Precision Industrial Metal Fabrication and Grinding"
  },
  {
    url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop",
    alt: "Pre-Engineered Building Steel Frame Assembly"
  },
  {
    url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop",
    alt: "Structural Steel Truss & Beam Installation"
  },
  {
    url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    alt: "Modern Industrial Warehouse PEB Construction"
  }
];

const companies = [
  "Shell", "Siemens", "Bosch", "L&T", "Reliance", "TATA Steel", 
  "JSW Steel", "Adani Group", "Godrej", "Mahindra", "DLF", "Hindalco"
];

function CompanyLogo({ name }: { name: string }) {
  const renderLogo = () => {
    switch (name) {
      case "Shell":
        return (
          <svg viewBox="0 0 24 24" className="h-9 w-9 text-[#FFD500] fill-[#FFD500] stroke-[#EC1C24]" strokeWidth="1.5">
            <path d="M12 2C11.5 2.1 6.5 6 5.5 10.5C4.8 13.5 3.5 16 2.5 17.5C2 18.2 2.1 19 2.8 19.5C3.8 20.2 6.5 21.5 12 21.5C17.5 21.5 20.2 20.2 21.2 19.5C21.9 19 22 18.2 21.5 17.5C20.5 16 19.2 13.5 18.5 10.5C17.5 6 12.5 2.1 12 2Z"/>
            <path d="M12 2V21.5M7.5 7C8.5 11 9.5 16 12 21.5M16.5 7C15.5 11 14.5 16 12 21.5M4 14.5C6.5 16.5 9 19.5 12 21.5M20 14.5C17.5 16.5 15 19.5 12 21.5" strokeLinecap="round"/>
          </svg>
        );
      case "Siemens":
        return (
          <span className="font-sans font-black text-xl tracking-tighter text-[#00828A]">
            SIEMENS
          </span>
        );
      case "Bosch":
        return (
          <svg viewBox="0 0 24 24" className="h-9 w-9">
            <circle cx="12" cy="12" r="10" stroke="#E31B23" strokeWidth="3.5" fill="none"/>
            <circle cx="12" cy="12" r="6" fill="#334155"/>
            <rect x="10.5" y="4" width="3" height="16" fill="#334155"/>
            <rect x="4" y="10.5" width="16" height="3" fill="#334155"/>
            <circle cx="12" cy="12" r="4.5" fill="#fff"/>
          </svg>
        );
      case "L&T":
        return (
          <span className="font-serif font-black text-2xl tracking-tight text-[#0F2C59]">
            L&T
          </span>
        );
      case "Reliance":
        return (
          <svg viewBox="0 0 24 24" className="h-9 w-9">
            <circle cx="12" cy="12" r="10" fill="#0A3066"/>
            <path d="M12 5C12 5 15 8 15 11C15 14 12 16 12 16C12 16 9 14 9 11C9 8 12 5 12 5Z" fill="#E31B23"/>
            <circle cx="12" cy="12" r="2.5" fill="#FFF"/>
          </svg>
        );
      case "TATA Steel":
        return (
          <div className="flex items-center gap-1.5 text-[#005CA9]">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5">
              <ellipse cx="12" cy="12" rx="9" ry="7"/>
              <path d="M7 16C9 12 11 9 12 7C13 9 15 12 17 16" strokeLinecap="round"/>
              <path d="M12 7V17" strokeLinecap="round"/>
            </svg>
            <span className="font-display font-bold text-sm tracking-tight text-slate-800">TATA STEEL</span>
          </div>
        );
      case "JSW Steel":
        return (
          <div className="flex items-baseline gap-0.5">
            <span className="font-sans font-black text-lg tracking-tight text-[#00529B]">
              JSW
            </span>
            <span className="text-[#E31B23] text-xs font-bold uppercase tracking-wider">Steel</span>
          </div>
        );
      case "Adani Group":
        return (
          <span className="font-sans font-extrabold text-lg text-slate-800 tracking-tight">
            adani<span className="text-[#00529B]">.</span>
          </span>
        );
      case "Godrej":
        return (
          <span className="font-serif italic font-extrabold text-2xl text-[#E31837] tracking-tight">
            Godrej
          </span>
        );
      case "Mahindra":
        return (
          <div className="flex items-center gap-1.5 text-[#DD1D21]">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M3 19L10 5L12 10L14 5L21 19" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 19H17" strokeLinecap="round"/>
            </svg>
            <span className="font-sans font-bold text-xs tracking-tight text-slate-800">MAHINDRA</span>
          </div>
        );
      case "DLF":
        return (
          <div className="flex items-center gap-1.5 text-[#006A4E]">
            <svg viewBox="0 0 24 24" className="h-7 w-7">
              <polygon points="4,18 10,6 16,18" fill="currentColor" opacity="0.6"/>
              <polygon points="8,18 14,6 20,18" fill="currentColor"/>
            </svg>
            <span className="font-display font-bold text-xs tracking-tight text-slate-800">DLF</span>
          </div>
        );
      case "Hindalco":
        return (
          <div className="flex items-center gap-1 text-[#004A8F]">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="9"/>
              <path d="M8 8H16V16H8V8Z" fill="currentColor" opacity="0.3"/>
              <path d="M12 6V18M6 12H18" strokeLinecap="round"/>
            </svg>
            <span className="font-sans font-bold text-xs tracking-tight text-slate-800">HINDALCO</span>
          </div>
        );
      default:
        return <span className="font-bold">{name}</span>;
    }
  };

  return (
    <div className="flex items-center justify-center min-w-[170px] h-16 px-5 rounded-lg bg-slate-50 border border-slate-100 shadow-sm transition hover:border-accent/40 group">
      <div className="filter grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
        {renderLogo()}
      </div>
    </div>
  );
}

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout>
      {/* Redesigned Hero Section (Full-length Viewport-locked Background Slideshow with Text Overlaid) */}
      <section className="relative h-[calc(100vh-64px)] h-[calc(100dvh-64px)] w-full overflow-hidden bg-slate-950 flex items-center border-b border-slate-900">
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, idx) => (
            <div
              key={img.url}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="h-full w-full object-cover brightness-[1.1]"
              />
            </div>
          ))}
          {/* Overlays for dark aesthetics and readability (adjusted for brighter images) */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/40 to-slate-950/10 z-15" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent z-15" />
        </div>

        <div className="container-x mx-auto max-w-[1400px] w-full relative z-20 py-4">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 border border-accent/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              <Sparkles size={12} className="text-accent animate-pulse" /> INDIA'S TRUSTED PEB MANUFACTURER
            </span>
            <h1 className="mt-4 font-display text-2xl font-extrabold leading-[1.1] text-white sm:text-4xl md:text-5xl lg:text-6xl">
             Building the Future with<span className="bg-gradient-to-r from-accent to-orange-500 bg-clip-text text-transparent">   Pre-Engineered Steel Buildings</span>.
            </h1>
            <p className="mt-4 max-w-2xl text-xs text-slate-200 leading-relaxed sm:text-sm md:text-base lg:text-lg">
              Sumiraj is a leading Pre-Engineered Building (PEB) manufacturer in India, delivering innovative steel building solutions for industrial, commercial, warehousing, and infrastructure projects. From structural steel fabrication to advanced roofing and wall cladding systems, we provide end-to-end engineering, manufacturing, and installation tailored to your project requirements.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/manufacturing" className="inline-flex items-center gap-2 rounded bg-accent px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-accent/20 hover:brightness-110 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300">
                Explore Building Systems <ArrowRight size={14} />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded border border-white/20 bg-white/10 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/30 transition-all duration-300">
                Request a Free Quote
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {[["15+", "Years Legacy"], ["3 Mill+", "Sq. Ft. Installed"], ["300+", "Completed Projects"]].map(([k, v]) => (
                <div key={k}>
                  <div className="font-display text-xl font-extrabold text-accent sm:text-2xl md:text-3xl">{k}</div>
                  <div className="mt-0.5 text-[9px] sm:text-xs font-semibold uppercase tracking-wider text-slate-300">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide Indicators / Dots */}
        <div className="absolute bottom-8 left-6 md:left-20 z-30 flex gap-2">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? "w-8 bg-accent" : "w-2.5 bg-white/30 hover:bg-white/55"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Caption overlay on bottom right */}
        <div className="absolute bottom-8 right-6 md:right-20 z-30 hidden md:block max-w-md text-right">
          <p className="text-xs uppercase tracking-widest text-accent font-bold">Featured Works</p>
          <h3 className="mt-1 font-display text-sm font-semibold text-white/90">{heroImages[currentSlide].alt}</h3>
        </div>
      </section>

      {/* Infinite Client Logo Slider Row */}
      <section className="border-b border-slate-200 bg-white py-12 overflow-hidden">
        <div className="container-x mx-auto max-w-[1400px]">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-8">
            Delivering to industry leaders worldwide
          </p>
        </div>
        
        {/* Marquee Container */}
        <div className="relative flex w-full overflow-x-hidden">
          <div className="animate-marquee flex items-center gap-12 py-2">
            {companies.map((company, index) => (
              <CompanyLogo
                key={`${company}-${index}`}
                name={company}
              />
            ))}
          </div>
          
          {/* Duplicate for infinite scrolling */}
          <div className="animate-marquee flex items-center gap-12 py-2" aria-hidden="true">
            {companies.map((company, index) => (
              <CompanyLogo
                key={`${company}-dup-${index}`}
                name={company}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="container-x mx-auto max-w-[1400px] py-24">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <img src={teamImg} alt="Team on factory floor" className="aspect-[4/3] w-full rounded-lg object-cover shadow-lg" loading="lazy" />
            <div className="absolute -bottom-6 -right-6 hidden rounded-lg bg-accent p-6 text-accent-foreground shadow-xl md:block border-2 border-white">
              <div className="font-display text-4xl font-bold">ISO 9001</div>
              <div className="text-xs uppercase tracking-widest font-semibold mt-1">Certified Quality</div>
            </div>
          </div>
          <div>
            <p className="eyebrow">Who We Are</p>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl leading-tight text-slate-900">Engineering Excellence in Pre-Engineered Building Solutions</h2>
            <p className="mt-5 text-slate-600 leading-relaxed">
Sumiraj is a trusted Pre-Engineered Building (PEB) manufacturer in India, delivering innovative steel building solutions for industrial, commercial, logistics, warehousing, and infrastructure projects. We provide complete engineering services—from structural design and precision manufacturing to on-site installation—ensuring every project meets the highest standards of quality, safety, and performance.            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
Driven by advanced engineering practices, modern manufacturing facilities, and a skilled workforce, we create durable steel structures that reduce construction time, optimize costs, and deliver long-term value. Our commitment to precision, innovation, and customer satisfaction has made us a preferred partner for businesses across India.            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 border-b border-accent pb-1 text-sm font-semibold text-accent hover:text-accent-foreground transition duration-300">
              Read our story <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Section 1: Detailed PEB Anatomy & Components */}
      <section className="bg-slate-50 border-y border-slate-200/60 py-24">
        <div className="container-x mx-auto max-w-[1400px]">
          <div className="max-w-3xl mx-auto text-center">
            <span className="eyebrow">Technical Architecture</span>
            <h2 className="mt-3 font-display text-4xl font-extrabold text-slate-900 sm:text-5xl">
              Complete Pre-Engineered Building (PEB) System
            </h2>
            <p className="mt-4 text-lg text-slate-600">
Every Sumiraj Pre-Engineered Building is designed as an integrated structural system where each component works together to deliver exceptional strength, durability, and construction efficiency. From precision-engineered framing to advanced roofing and finishing accessories, our building systems are optimized for industrial, commercial, and infrastructure applications.            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Columns,
                title: "Primary Framing",
                desc: "Manufactured from high-strength structural steel, our primary framing system includes columns, rafters, and rigid frames engineered to provide superior load-bearing capacity and clear-span designs for large industrial spaces."
              },
              {
                icon: Layers,
                title: "Secondary Framing",
                desc: "Cold-formed Z and C purlins, girts, and eave struts provide essential structural support, evenly distributing wind and roof loads while enhancing the stability and performance of the building.Cold-formed Z & C sections (purlins, girts, and eave struts) that transfer lateral and vertical loads to the primary frame."
              },
              {
                icon: Building2,
                title: "Roof & Wall Cladding",
                desc: "High-tePremium roofing and wall cladding systems featuring Galvalume®, insulated sandwich panels, and standing seam roofing solutions deliver excellent thermal insulation, corrosion resistance, and long-lasting weather protection."
              },
              {
                icon: Cog,
                title: "Accessories & Trims",
                desc: "Our buildings are equipped with precision-engineered accessories including skylights, ridge ventilators, turbo ventilators, gutters, downspouts, doors, windows, louvers, insulation systems, and custom trims to ensure maximum functionality and aesthetics."
              }
            ].map((component, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-300 flex flex-col h-full">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-6">
                  <component.icon size={24} />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900 mb-3">{component.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">{component.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Section 2: PEB Construction Process Workflow */}
      <section className="container-x mx-auto max-w-[1400px] py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <span className="eyebrow">WORKFLOW & EXECUTION</span>
            <h2 className="mt-3 font-display text-4xl font-extrabold text-slate-900 sm:text-5xl">
              From Concept to Completion — Our Turnkey PEB Process
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Every project follows a streamlined engineering and execution process that ensures precision, faster delivery, and uncompromising quality. From initial consultation and structural design to manufacturing, installation, and final handover, Sumiraj delivers complete turnkey Pre-Engineered Building (PEB) solutions for industrial, commercial, warehousing, and infrastructure projects.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-xl border border-slate-100 shadow-lg aspect-[4/3]">
              <img 
                src={warehouseImg} 
                alt="Sumiraj PEB Warehouse construction process" 
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {[
            {
              step: "01",
              icon: Ruler,
              title: "Consultation & Project Planning",
              desc: "Our engineering team understands your project requirements, site conditions, operational needs, and budget to develop the most efficient steel building solution.",
              bullets: ["Requirement Analysis", "Site Evaluation", "Budget Optimization"]
            },
            {
              step: "02",
              icon: Factory,
              title: "Engineering & Structural Design",
              desc: "Using advanced structural engineering software and 3D modeling, we create optimized building designs that comply with national and international engineering standards.",
              bullets: ["3D BIM Modeling", "Structural Analysis", "Wind & Seismic Design"]
            },
            {
              step: "03",
              icon: HardHat,
              title: "Precision Steel Manufacturing",
              desc: "Structural components are manufactured in our modern facility using automated fabrication processes, ensuring consistent quality and dimensional accuracy.",
              bullets: ["CNC Cutting", "Automated Welding", "Quality Inspection"]
            }
          ].map((process, idx) => (
            <div key={idx} className="relative bg-white rounded-xl border border-slate-100 p-8 shadow-sm flex flex-col h-full hover:shadow-md transition duration-300">
              <span className="absolute top-6 right-6 font-display text-5xl font-black text-slate-100 tracking-tight z-0">
                {process.step}
              </span>
              <div className="relative z-10 flex-1">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-6">
                  <process.icon size={24} />
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-4">{process.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{process.desc}</p>
                <ul className="space-y-2.5">
                  {process.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 size={14} className="text-accent" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Section 3: PEB Advantages vs. Conventional Buildings */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="container-x mx-auto max-w-[1400px]">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <span className="eyebrow text-accent">Strategic Advantages</span>
              <h2 className="mt-3 font-display text-4xl font-extrabold text-white leading-tight sm:text-5xl">
                Why Choose Pre-Engineered Buildings (PEB)?
              </h2>
              <p className="mt-6 text-slate-400 leading-relaxed">
                Pre-Engineered Buildings (PEBs) are transforming modern construction by offering faster project delivery, lower lifecycle costs, and superior structural performance. At Sumiraj, we combine advanced engineering, precision manufacturing, and high-quality steel components to deliver building solutions that are durable, scalable, and built for long-term success across industrial, commercial, and infrastructure projects.
              </p>
              <div className="mt-8 flex flex-col gap-4">
                {[
                  "Faster project completion with precision-engineered components",
                  "Lower construction and maintenance costs throughout the building lifecycle",
                  "Large clear-span designs for maximum usable floor space",
                  "Sustainable, recyclable steel systems with minimal material waste"
                ].map((text, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-accent mt-1 shrink-0" />
                    <span className="text-sm text-slate-300 font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 grid gap-6 sm:grid-cols-2">
              {[
                {
                  icon: Clock,
                  title: "Up to 50% Faster Construction",
                  desc: "Factory-manufactured steel components arrive ready for installation, significantly reducing on-site work and enabling quicker project completion compared to conventional construction methods.",
                  tag: "Speed"
                },
                {
                  icon: Coins,
                  title: "Optimized Project Investment",
                  desc: "Precision engineering minimizes steel consumption, foundation requirements, and material waste, helping reduce overall construction costs while maintaining structural strength.",
                  tag: "Economy"
                },
                {
                  icon: Ruler,
                  title: "Large Clear-Span Structures",
                  desc: "PEB systems provide spacious, column-free interiors that can be easily customized or expanded, making them ideal for warehouses, manufacturing plants, logistics hubs, and commercial facilities.",
                  tag: "Space"
                },
                {
                  icon: ShieldCheck,
                  title: "Precision Manufacturing",
                  desc: "Every structural component is manufactured under strict quality standards using advanced fabrication processes, ensuring consistent accuracy, superior durability, and long-term structural reliability.",
                  tag: "Reliability"
                }
              ].map((adv, idx) => (
                <div key={idx} className="bg-slate-800/50 border border-slate-700/50 p-8 rounded-xl hover:border-slate-600 transition duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                      <adv.icon size={20} />
                    </div>
                    <span className="text-xs uppercase font-bold tracking-widest text-slate-500">{adv.tag}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">{adv.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Range Section */}
      <section className="bg-slate-50 py-24 border-b border-slate-200/60">
        <div className="container-x mx-auto max-w-[1400px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Our Focus Areas</p>
              <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl text-slate-900">Built for industrial excellence.</h2>
            </div>
            <Link to="/manufacturing" className="text-sm font-semibold text-accent hover:text-accent-foreground transition duration-300">Learn about our manufacturing →</Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { img: valveImg, title: "Pre-Engineered Buildings", meta: "Factories · Warehouses · Showrooms" },
              { img: gearsImg, title: "Structural Steel Works", meta: "Heavy Columns · Truss Frame Systems" },
              { img: pipesImg, title: "Custom Fabrications", meta: "Industrial Piping · Platforms · Flanges" },
            ].map((p) => (
              <div key={p.title} className="group block overflow-hidden rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition duration-300">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-6">
                  <div className="text-xs uppercase tracking-widest text-accent font-semibold">{p.meta}</div>
                  <h3 className="mt-2 font-display text-xl font-bold text-slate-900">{p.title}</h3>
                </div>
              </div>
            ))}
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
            { icon: ShieldCheck, title: "Engineering Excellence", desc: "Every project is designed using advanced engineering software and detailed structural analysis to ensure maximum safety, efficiency, and code compliance." },
            { icon: Factory, title: "Integrated Manufacturing", desc: "Our in-house manufacturing facility manages fabrication, welding, surface treatment, and quality control under one roof, ensuring consistent quality and faster production." },
            { icon: Cog, title: "Customized Building Solutions", desc: "Every project is engineered to meet your specific operational requirements, whether it's an industrial plant, warehouse, logistics center, commercial facility, or infrastructure project." },
            { icon: Globe2, title: "Uncompromising Quality", desc: "From premium raw materials to rigorous inspections, every structural component is manufactured to meet strict national and international quality standards." },
            { icon: Award, title: "On-Time Project Delivery", desc: "Efficient planning, streamlined manufacturing, and experienced execution teams help us complete projects within committed timelines without compromising quality." },
            { icon: Truck, title: "Trusted Support & Partnership", desc: "We believe in building long-term relationships by providing technical guidance, responsive communication, and dependable after-sales support throughout your project's lifecycle." },
          ].map((f) => (
            <div key={f.title} className="group bg-white p-8 transition hover:bg-accent hover:text-white">
              <f.icon size={32} className="text-accent transition group-hover:text-white" />
              <h3 className="mt-6 font-display text-lg font-bold text-slate-900 group-hover:text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600 transition group-hover:text-white/90">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Industries Served */}
      

      {/* Call to Action */}
      <section className="relative overflow-hidden bg-accent py-20 text-white">
        <div className="container-x mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-8 md:flex-row relative z-10">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Have a structural drawing or specifications?</h2>
            <p className="mt-2 max-w-xl text-white/85">Submit your drawings or architectural concept — we will return a structural review, load assessment, and preliminary quote within 48 hours.</p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded bg-slate-900 px-8 py-4 text-sm font-semibold text-white hover:bg-black transition-all duration-300 shadow-lg">
            Start an inquiry <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
