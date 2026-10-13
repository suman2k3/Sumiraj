import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useMemo } from "react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { buildingSystems } from "@/lib/buildingSystemsData";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-manufacturing.jpg";
import pebHeroImg from "@/assets/hero-peb-system.jpg";
import bannerPebImg from "@/assets/banner-pre-engineered-buildings.png";
import bannerPrimaryFramingImg from "@/assets/banner-primary-framing.png";
import bannerSecondaryFramingImg from "@/assets/banner-secondary-framing.png";
import bannerRoofingCladdingImg from "@/assets/banner-roofing-cladding.png";
import bannerStandingSeamImg from "@/assets/banner-standing-seam-roofing.png";
import bannerMezzanineFloorsImg from "@/assets/banner-mezzanine-floors.png";
import bannerErectionInstallationImg from "@/assets/banner-erection-installation.png";
import primaryFramingHeroImg from "@/assets/hero-primary-framing.jpg";
import secondaryFramingHeroImg from "@/assets/hero-secondary-framing.jpg";
import roofingCladdingHeroImg from "@/assets/hero-roofing-cladding.jpg";
import standingSeamHeroImg from "@/assets/hero-standing-seam.jpg";
import mezzanineHeroImg from "@/assets/hero-mezzanine-floors.jpg";
import erectionInstallationHeroImg from "@/assets/hero-erection-installation.jpg";
import { CheckCircle2, ArrowRight, ArrowLeft, Shield, Award, Sparkles, Wrench, ChevronRight, Download, Scale, Settings, Building2, Timer, IndianRupee, Leaf, Factory, Warehouse, Building, Wheat, ShieldCheck, Maximize2, Thermometer, Droplets, Zap, HardHat, Headphones, Layers } from "lucide-react";

const pebHeroFeatures = [
  { label: "Faster Construction", icon: Timer },
  { label: "Cost Effective", icon: IndianRupee },
  { label: "Durable & Reliable", icon: ShieldCheck },
  { label: "Sustainable Solution", icon: Leaf },
];

const primaryFramingFeatures = [
  { label: "High Strength", icon: Shield },
  { label: "Optimized Design", icon: Scale },
  { label: "Faster Construction", icon: Settings },
  { label: "Suitable for Large Spans", icon: Building2 },
];

const secondaryFramingFeatures = [
  { label: "Strong Support", icon: Shield },
  { label: "Quick Installation", icon: Settings },
  { label: "Dimensional Accuracy", icon: CheckCircle2 },
  { label: "Cost Effective", icon: IndianRupee },
];

const roofingCladdingFeatures = [
  { label: "Weather Resistant", icon: ShieldCheck },
  { label: "Thermal Insulation", icon: Thermometer },
  { label: "Durable & Strong", icon: Shield },
  { label: "Wide Range of Profiles", icon: Settings },
];

const standingSeamFeatures = [
  { label: "Weather Resistant", icon: ShieldCheck },
  { label: "Leak-Proof Design", icon: Droplets },
  { label: "Low Maintenance", icon: Wrench },
  { label: "Modern & Aesthetic", icon: Sparkles },
  { label: "Energy Efficient", icon: Zap },
];

const erectionInstallationFeatures = [
  { label: "Experienced Installation Team", icon: HardHat },
  { label: "Safe & Compliant", icon: ShieldCheck },
  { label: "On-Time Delivery", icon: Timer },
  { label: "End-to-End Support", icon: Headphones },
];

const erectionPanelCaptions = [
  "Planning & Coordination",
  "Precision Erection",
  "Quality Installation",
  "Ready for Your Business",
];

const mezzanineFloorFeatures = [
  { label: "Maximum Space Utilization", icon: Maximize2 },
  { label: "High Load Capacity", icon: Layers },
  { label: "Fast Installation", icon: Timer },
  { label: "Custom-Engineered Design", icon: Settings },
];

const productBanners: Record<string, string> = {
  "pre-engineered-buildings": bannerPebImg,
  "primary-framing": bannerPrimaryFramingImg,
  "secondary-framing-systems": bannerSecondaryFramingImg,
  "roofing-and-wall-cladding-systems": bannerRoofingCladdingImg,
  "standing-seam-roofing-system": bannerStandingSeamImg,
  "mezzanine-floors": bannerMezzanineFloorsImg,
  "erection-and-installation": bannerErectionInstallationImg,
};

const systemBannerMap: Record<string, string> = {
  "pre-engineered-buildings": pebHeroImg,
  "primary-framing": primaryFramingHeroImg,
  "secondary-framing-systems": secondaryFramingHeroImg,
  "roofing-and-wall-cladding-systems": roofingCladdingHeroImg,
  "standing-seam-roofing-system": standingSeamHeroImg,
  "mezzanine-floors": mezzanineHeroImg,
  "erection-and-installation": erectionInstallationHeroImg,
};

interface PebProductCard {
  slug: string;
  title: string;
  description: string;
  image: string;
  pdfFile: string;
  pdfUrl: string;
  pdfAvailable: boolean;
}

const pebSubProducts: PebProductCard[] = [
  {
    slug: "erection-and-installation",
    title: "Erection & Installation",
    description: "Professional on-site erection and installation for safe, accurate, and efficient project completion.",
    image: bannerErectionInstallationImg,
    pdfFile: "erection-installation.pdf",
    pdfUrl: "/documents/erection-installation.pdf",
    pdfAvailable: false,
  },
  {
    slug: "mezzanine-floors",
    title: "Mezzanine Floors",
    description: "Efficient elevated floor systems that maximize usable space within industrial and commercial buildings.",
    image: bannerMezzanineFloorsImg,
    pdfFile: "mezzanine-floors.pdf",
    pdfUrl: "/documents/mezzanine-floors.pdf",
    pdfAvailable: false,
  },
  {
    slug: "standing-seam-roofing-system",
    title: "Standing Seam Roofing System",
    description: "Concealed-fix roofing system providing reliable weather resistance and a clean, durable finish.",
    image: bannerStandingSeamImg,
    pdfFile: "standing-seam-roofing.pdf",
    pdfUrl: "/documents/standing-seam-roofing.pdf",
    pdfAvailable: false,
  },
  {
    slug: "roofing-and-wall-cladding-systems",
    title: "Roofing & Wall Cladding Systems",
    description: "Durable roofing and wall systems designed for weather protection, performance, and long-term service.",
    image: bannerRoofingCladdingImg,
    pdfFile: "roofing-wall-cladding.pdf",
    pdfUrl: "/documents/roofing-wall-cladding.pdf",
    pdfAvailable: false,
  },
  {
    slug: "primary-framing",
    title: "Primary Framing",
    description: "Engineered main frames designed to provide structural strength, stability, and long-span performance.",
    image: bannerPrimaryFramingImg,
    pdfFile: "primary-framing.pdf",
    pdfUrl: "/documents/primary-framing.pdf",
    pdfAvailable: false,
  },
  {
    slug: "secondary-framing-systems",
    title: "Secondary Framing Systems",
    description: "Purlins, girts, and structural members that support the building envelope and overall structure.",
    image: bannerSecondaryFramingImg,
    pdfFile: "secondary-framing-systems.pdf",
    pdfUrl: "/documents/secondary-framing-systems.pdf",
    pdfAvailable: false,
  },
];

export const Route = createFileRoute("/products/$productId")({
  head: ({ params }) => {
    const system = buildingSystems.find((s) => s.slug === params.productId);
    if (!system) {
      return {
        meta: [{ title: "Product Not Found | Sumiraj" }],
      };
    }
    return {
      meta: [
        { title: `${system.title} | Sumiraj Products` },
        { name: "description", content: system.description },
        { property: "og:title", content: system.title },
        { property: "og:description", content: system.description },
        { property: "og:url", content: `https://www.sumiraj.com/products/${system.slug}` },
      ],
      links: [
        { rel: "canonical", href: `https://www.sumiraj.com/products/${system.slug}` },
      ],
    };
  },
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { productId } = useParams({ from: "/products/$productId" });
  const system = useMemo(() => {
    return buildingSystems.find((s) => s.slug === productId);
  }, [productId]);

  if (!system) {
    return (
      <Layout>
        <div className="container-x mx-auto max-w-[1200px] py-20 text-center">
          <h1 className="font-display text-2xl font-bold text-slate-900">Product Not Found</h1>
          <p className="mt-2 text-sm text-slate-600">The product you are looking for could not be found.</p>
          <Link to="/products" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-xs font-bold text-white hover:brightness-110 transition">
            <ArrowLeft size={14} /> Back to Products
          </Link>
        </div>
      </Layout>
    );
  }

  const isPebPage = system.slug === "pre-engineered-buildings";
  const bannerImage = systemBannerMap[system.slug] || heroImg;

  const nextSystem = useMemo(() => {
    const idx = buildingSystems.findIndex((s) => s.slug === system.slug);
    if (idx === -1 || idx === buildingSystems.length - 1) return buildingSystems[0];
    return buildingSystems[idx + 1];
  }, [system]);

  const prevSystem = useMemo(() => {
    const idx = buildingSystems.findIndex((s) => s.slug === system.slug);
    if (idx === -1 || idx === 0) return buildingSystems[buildingSystems.length - 1];
    return buildingSystems[idx - 1];
  }, [system]);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.4 }}
      >
        {system.slug === "pre-engineered-buildings" ? (
          <section className="relative w-full h-[360px] sm:h-[400px] md:h-[460px] lg:h-[500px] overflow-hidden bg-slate-100 select-none">
            {/* Background Image: text-free high quality master banner */}
            <img
              src={productBanners["pre-engineered-buildings"]}
              alt={`${system.title} - Sumiraj Industries`}
              className="absolute inset-0 w-full h-full object-cover object-right sm:object-center"
              loading="eager"
            />

            {/* Subtle soft gradient scrim on left for crystal clear text legibility on all devices */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/65 to-transparent sm:from-white/85 sm:via-white/30 sm:to-transparent pointer-events-none" />

            {/* HTML / CSS Text Overlay Content */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none">
              {/* Upper & Center Left Content */}
              <div className="container-x mx-auto max-w-[1400px] w-full pt-4 sm:pt-6 md:pt-7 lg:pt-8">
                <div className="max-w-[340px] sm:max-w-[440px] md:max-w-[540px] lg:max-w-[620px]">
                  
                  {/* Eyebrow */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 md:mb-2.5">
                    <span className="text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-[#07316e]">
                      SMART SOLUTIONS FOR A STRONGER TOMORROW
                    </span>
                    <div className="hidden sm:block h-[1.5px] w-8 md:w-12 bg-[#d49d42]" />
                  </div>

                  {/* Heading */}
                  <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-black tracking-tight leading-[1.08] text-[#07316e]">
                    Pre-Engineered{" "}
                    <span className="text-[#d49d42] block sm:inline">Buildings</span>
                  </h1>

                  {/* Subheading */}
                  <p className="mt-1.5 sm:mt-2 md:mt-2.5 text-xs sm:text-sm md:text-base font-semibold text-[#07316e]/90 leading-snug">
                    Faster Construction. Greater Strength. A Smarter Way to Build.
                  </p>

                  {/* Four Feature Badges */}
                  <div className="mt-3 sm:mt-4 md:mt-5 grid grid-cols-4 gap-1.5 sm:gap-3 md:gap-4 max-w-[320px] sm:max-w-[420px] md:max-w-[500px]">
                    {pebHeroFeatures.map((feat) => {
                      const Icon = feat.icon;
                      return (
                        <div key={feat.label} className="flex flex-col items-center text-center">
                          <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border-[1.5px] sm:border-2 border-[#d49d42] bg-white/95 shadow-xs flex items-center justify-center text-[#07316e] mb-1 sm:mb-1.5">
                            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 text-[#07316e]" strokeWidth={2.2} />
                          </div>
                          <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] font-bold uppercase tracking-wider text-[#07316e] leading-tight">
                            {feat.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Lower-left feature panel (Mobile view - compact inline strip) */}
                  <div className="sm:hidden flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-3 bg-[#072856]/95 text-white rounded-lg px-2.5 py-1.5 border border-[#d49d42]/70 shadow-xs max-w-[330px]">
                    <div className="flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-[#d49d42] shrink-0" />
                      <span className="text-[8px] font-bold uppercase tracking-wider">Customized Designs</span>
                    </div>
                    <span className="text-[#d49d42] text-[8px]">•</span>
                    <div className="flex items-center gap-1">
                      <Maximize2 className="w-3 h-3 text-[#d49d42] shrink-0" />
                      <span className="text-[8px] font-bold uppercase tracking-wider">Wide Span</span>
                    </div>
                    <span className="text-[#d49d42] text-[8px]">•</span>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#d49d42] shrink-0" />
                      <span className="text-[8px] font-bold uppercase tracking-wider">Multiple Industries</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lower Section: Lower-Left Navy Feature Panel (Desktop/Tablet) + Bottom Tagline */}
              <div className="w-full">
                {/* Lower-left navy panel positioned on the left (Desktop/Tablet) */}
                <div className="container-x mx-auto max-w-[1400px] w-full hidden sm:block mb-2 md:mb-3">
                  <div className="inline-flex flex-col bg-[#072856] text-white rounded-tr-2xl md:rounded-tr-3xl border-t-2 border-r-2 border-[#d49d42] px-3.5 py-2.5 md:px-4 md:py-3 shadow-lg max-w-[280px] md:max-w-[320px]">
                    <div className="space-y-1.5 md:space-y-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#d49d42] shrink-0" />
                        <span className="text-[9px] md:text-[10px] lg:text-[11px] font-bold tracking-wider uppercase text-white">Customized Designs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Maximize2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#d49d42] shrink-0" />
                        <span className="text-[9px] md:text-[10px] lg:text-[11px] font-bold tracking-wider uppercase text-white">Wide Span Solutions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#d49d42] shrink-0" />
                        <span className="text-[9px] md:text-[10px] lg:text-[11px] font-bold tracking-wider uppercase text-white">Ideal for Multiple Industries</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Tagline & Industry Icons */}
                <div className="w-full pb-2 sm:pb-2.5 md:pb-3 px-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/40 bg-white/40 sm:bg-transparent backdrop-blur-[1px] sm:backdrop-blur-none">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="hidden xs:block h-[1px] w-6 sm:w-12 bg-[#d49d42]/70" />
                    <span className="text-[8px] sm:text-[10px] md:text-xs font-bold tracking-[0.14em] sm:tracking-[0.22em] text-[#07316e] uppercase whitespace-nowrap">
                      ENGINEERED SPACES FOR ENDLESS POSSIBILITIES
                    </span>
                    <div className="hidden xs:block h-[1px] w-6 sm:w-12 bg-[#d49d42]/70" />
                  </div>

                  {/* Industry Icons & Labels */}
                  <div className="hidden md:flex items-center gap-3 lg:gap-5 text-[#07316e]">
                    <div className="flex items-center gap-1">
                      <Factory className="w-3.5 h-3.5 text-[#07316e]" />
                      <span className="text-[8px] lg:text-[9px] font-bold tracking-wider uppercase">Industrial</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Warehouse className="w-3.5 h-3.5 text-[#07316e]" />
                      <span className="text-[8px] lg:text-[9px] font-bold tracking-wider uppercase">Warehouse</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-[#07316e]" />
                      <span className="text-[8px] lg:text-[9px] font-bold tracking-wider uppercase">Commercial</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Wheat className="w-3.5 h-3.5 text-[#07316e]" />
                      <span className="text-[8px] lg:text-[9px] font-bold tracking-wider uppercase">Agricultural</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : system.slug === "primary-framing" ? (
          <section className="relative w-full h-[320px] sm:h-[360px] md:h-[420px] lg:h-[460px] overflow-hidden bg-slate-100 select-none">
            {/* Background Image: text-free high quality master banner */}
            <img
              src={productBanners["primary-framing"]}
              alt={`${system.title} - Sumiraj Industries`}
              className="absolute inset-0 w-full h-full object-cover object-right sm:object-center"
              loading="eager"
            />

            {/* Subtle soft gradient scrim on left for crystal clear text legibility on all devices */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent sm:from-white/85 sm:via-white/30 sm:to-transparent pointer-events-none" />

            {/* HTML / CSS Text Overlay Content */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none">
              {/* Upper & Center Left Content */}
              <div className="container-x mx-auto max-w-[1400px] w-full pt-4 sm:pt-6 md:pt-8 lg:pt-10">
                <div className="max-w-[340px] sm:max-w-[440px] md:max-w-[540px] lg:max-w-[620px]">
                  
                  {/* Eyebrow */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 md:mb-3">
                    <span className="text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-[#07316e]">
                      STRONG FOUNDATIONS FOR A BRIGHTER TOMORROW
                    </span>
                    <div className="hidden sm:block h-[1.5px] w-8 md:w-12 bg-[#d49d42]" />
                  </div>

                  {/* Heading */}
                  <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-black tracking-tight leading-[1.08] text-[#07316e]">
                    Primary Framing{" "}
                    <span className="text-[#d49d42] block sm:inline">Systems</span>
                  </h1>

                  {/* Subheading */}
                  <p className="mt-1.5 sm:mt-2 md:mt-3 text-xs sm:text-sm md:text-base font-semibold text-[#07316e]/90 leading-snug">
                    Engineered for Strength. Designed for Greater Possibilities.
                  </p>

                  {/* Feature Badges */}
                  <div className="mt-3.5 sm:mt-5 md:mt-6 grid grid-cols-4 gap-1.5 sm:gap-3 md:gap-4 max-w-[320px] sm:max-w-[420px] md:max-w-[500px]">
                    {primaryFramingFeatures.map((feat) => {
                      const Icon = feat.icon;
                      return (
                        <div key={feat.label} className="flex flex-col items-center text-center">
                          <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full border-[1.5px] sm:border-2 border-[#d49d42] bg-white/95 shadow-xs flex items-center justify-center text-[#07316e] mb-1 sm:mb-1.5">
                            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#07316e]" strokeWidth={2.2} />
                          </div>
                          <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] font-bold uppercase tracking-wider text-[#07316e] leading-tight">
                            {feat.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Tagline */}
              <div className="w-full pb-2 sm:pb-3 md:pb-4 px-4 flex items-center justify-center gap-2 sm:gap-4">
                <div className="hidden xs:block h-[1px] flex-1 max-w-[60px] sm:max-w-[140px] md:max-w-[240px] bg-[#d49d42]/70" />
                <span className="text-[8px] sm:text-[10px] md:text-xs font-bold tracking-[0.16em] sm:tracking-[0.24em] text-[#07316e] uppercase text-center whitespace-nowrap px-2 py-0.5">
                  PRE-ENGINEERED SOLUTIONS FOR EVERY INDUSTRY
                </span>
                <div className="hidden xs:block h-[1px] flex-1 max-w-[60px] sm:max-w-[140px] md:max-w-[240px] bg-[#d49d42]/70" />
              </div>
            </div>
          </section>
        ) : system.slug === "secondary-framing-systems" ? (
          <section className="relative w-full h-[320px] sm:h-[360px] md:h-[420px] lg:h-[460px] overflow-hidden bg-slate-100 select-none">
            {/* Background Image: text-free high quality master banner */}
            <img
              src={productBanners["secondary-framing-systems"]}
              alt={`${system.title} - Sumiraj Industries`}
              className="absolute inset-0 w-full h-full object-cover object-right sm:object-center"
              loading="eager"
            />

            {/* Subtle soft gradient scrim on left for crystal clear text legibility on all devices */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent sm:from-white/85 sm:via-white/30 sm:to-transparent pointer-events-none" />

            {/* HTML / CSS Text Overlay Content */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none">
              {/* Upper & Center Left Content */}
              <div className="container-x mx-auto max-w-[1400px] w-full pt-4 sm:pt-6 md:pt-8 lg:pt-10">
                <div className="max-w-[340px] sm:max-w-[440px] md:max-w-[540px] lg:max-w-[620px]">
                  
                  {/* Eyebrow */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 md:mb-3">
                    <span className="text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-[#07316e]">
                      STRENGTH IN EVERY DETAIL
                    </span>
                    <div className="hidden sm:block h-[1.5px] w-8 md:w-12 bg-[#d49d42]" />
                  </div>

                  {/* Heading */}
                  <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-black tracking-tight leading-[1.08] text-[#07316e]">
                    Secondary Framing{" "}
                    <span className="text-[#d49d42] block sm:inline">Systems</span>
                  </h1>

                  {/* Subheading */}
                  <p className="mt-1.5 sm:mt-2 md:mt-3 text-xs sm:text-sm md:text-base font-semibold text-[#07316e]/90 leading-snug">
                    Perfect Support. Greater Strength. Built for Long-Term Performance.
                  </p>

                  {/* Feature Badges */}
                  <div className="mt-3.5 sm:mt-5 md:mt-6 grid grid-cols-4 gap-1.5 sm:gap-3 md:gap-4 max-w-[320px] sm:max-w-[420px] md:max-w-[500px]">
                    {secondaryFramingFeatures.map((feat) => {
                      const Icon = feat.icon;
                      return (
                        <div key={feat.label} className="flex flex-col items-center text-center">
                          <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full border-[1.5px] sm:border-2 border-[#d49d42] bg-white/95 shadow-xs flex items-center justify-center text-[#07316e] mb-1 sm:mb-1.5">
                            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#07316e]" strokeWidth={2.2} />
                          </div>
                          <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] font-bold uppercase tracking-wider text-[#07316e] leading-tight">
                            {feat.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Tagline */}
              <div className="w-full pb-2 sm:pb-3 md:pb-4 px-4 flex items-center justify-center gap-2 sm:gap-4">
                <div className="hidden xs:block h-[1px] flex-1 max-w-[60px] sm:max-w-[140px] md:max-w-[240px] bg-[#d49d42]/70" />
                <span className="text-[8px] sm:text-[10px] md:text-xs font-bold tracking-[0.16em] sm:tracking-[0.24em] text-[#07316e] uppercase text-center whitespace-nowrap px-2 py-0.5">
                  RELIABLE FRAMING FOR STRONGER BUILDINGS
                </span>
                <div className="hidden xs:block h-[1px] flex-1 max-w-[60px] sm:max-w-[140px] md:max-w-[240px] bg-[#d49d42]/70" />
              </div>
            </div>
          </section>
        ) : system.slug === "roofing-and-wall-cladding-systems" ? (
          <section className="relative w-full h-[320px] sm:h-[360px] md:h-[420px] lg:h-[460px] overflow-hidden bg-slate-100 select-none">
            {/* Background Image: text-free high quality master banner */}
            <img
              src={productBanners["roofing-and-wall-cladding-systems"]}
              alt={`${system.title} - Sumiraj Industries`}
              className="absolute inset-0 w-full h-full object-cover object-right sm:object-center"
              loading="eager"
            />

            {/* Subtle soft gradient scrim on left for crystal clear text legibility on all devices */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent sm:from-white/85 sm:via-white/30 sm:to-transparent pointer-events-none" />

            {/* HTML / CSS Text Overlay Content */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none">
              {/* Upper & Center Left Content */}
              <div className="container-x mx-auto max-w-[1400px] w-full pt-4 sm:pt-6 md:pt-8 lg:pt-10">
                <div className="max-w-[340px] sm:max-w-[440px] md:max-w-[540px] lg:max-w-[620px]">
                  
                  {/* Eyebrow */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 md:mb-3">
                    <span className="text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-[#07316e]">
                      BUILT FOR LASTING PROTECTION
                    </span>
                    <div className="hidden sm:block h-[1.5px] w-8 md:w-12 bg-[#d49d42]" />
                  </div>

                  {/* Heading */}
                  <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-black tracking-tight leading-[1.08] text-[#07316e]">
                    Roofing & Wall Cladding{" "}
                    <span className="text-[#d49d42] block sm:inline">Systems</span>
                  </h1>

                  {/* Subheading */}
                  <p className="mt-1.5 sm:mt-2 md:mt-3 text-xs sm:text-sm md:text-base font-semibold text-[#07316e]/90 leading-snug">
                    Strong Protection. Lasting Performance. For a Better Tomorrow.
                  </p>

                  {/* Feature Badges */}
                  <div className="mt-3.5 sm:mt-5 md:mt-6 grid grid-cols-4 gap-1.5 sm:gap-3 md:gap-4 max-w-[320px] sm:max-w-[420px] md:max-w-[500px]">
                    {roofingCladdingFeatures.map((feat) => {
                      const Icon = feat.icon;
                      return (
                        <div key={feat.label} className="flex flex-col items-center text-center">
                          <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full border-[1.5px] sm:border-2 border-[#d49d42] bg-white/95 shadow-xs flex items-center justify-center text-[#07316e] mb-1 sm:mb-1.5">
                            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#07316e]" strokeWidth={2.2} />
                          </div>
                          <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] font-bold uppercase tracking-wider text-[#07316e] leading-tight">
                            {feat.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Tagline & Industry Labels */}
              <div className="w-full pb-2 sm:pb-2.5 md:pb-3 px-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/40 bg-white/40 sm:bg-transparent backdrop-blur-[1px] sm:backdrop-blur-none">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="hidden xs:block h-[1px] w-6 sm:w-12 bg-[#d49d42]/70" />
                  <span className="text-[8px] sm:text-[10px] md:text-xs font-bold tracking-[0.14em] sm:tracking-[0.22em] text-[#07316e] uppercase whitespace-nowrap">
                    VERSATILE SOLUTIONS FOR EVERY INDUSTRY
                  </span>
                  <div className="hidden xs:block h-[1px] w-6 sm:w-12 bg-[#d49d42]/70" />
                </div>

                {/* Industry Icons & Labels */}
                <div className="hidden md:flex items-center gap-3 lg:gap-5 text-[#07316e]">
                  <div className="flex items-center gap-1">
                    <Factory className="w-3.5 h-3.5 text-[#07316e]" />
                    <span className="text-[8px] lg:text-[9px] font-bold tracking-wider uppercase">Industrial</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Warehouse className="w-3.5 h-3.5 text-[#07316e]" />
                    <span className="text-[8px] lg:text-[9px] font-bold tracking-wider uppercase">Warehouse</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-[#07316e]" />
                    <span className="text-[8px] lg:text-[9px] font-bold tracking-wider uppercase">Commercial</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wheat className="w-3.5 h-3.5 text-[#07316e]" />
                    <span className="text-[8px] lg:text-[9px] font-bold tracking-wider uppercase">Agricultural</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : system.slug === "standing-seam-roofing-system" ? (
          <section className="relative w-full h-[320px] sm:h-[360px] md:h-[420px] lg:h-[460px] overflow-hidden bg-slate-100 select-none">
            {/* Background Image: text-free high quality master banner */}
            <img
              src={productBanners["standing-seam-roofing-system"]}
              alt={`${system.title} - Sumiraj Industries`}
              className="absolute inset-0 w-full h-full object-cover object-right sm:object-center"
              loading="eager"
            />

            {/* Subtle soft gradient scrim on left for crystal clear text legibility on all devices */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent sm:from-white/85 sm:via-white/30 sm:to-transparent pointer-events-none" />

            {/* HTML / CSS Text Overlay Content */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none">
              {/* Upper & Center Left Content */}
              <div className="container-x mx-auto max-w-[1400px] w-full pt-4 sm:pt-6 md:pt-8 lg:pt-10">
                <div className="max-w-[340px] sm:max-w-[460px] md:max-w-[560px] lg:max-w-[640px]">
                  
                  {/* Eyebrow */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 md:mb-3">
                    <span className="text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-[#07316e]">
                      ENGINEERED ROOFING FOR A STRONGER TOMORROW
                    </span>
                    <div className="hidden sm:block h-[1.5px] w-8 md:w-12 bg-[#d49d42]" />
                  </div>

                  {/* Heading */}
                  <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-black tracking-tight leading-[1.08] text-[#07316e]">
                    Standing Seam Roofing{" "}
                    <span className="text-[#d49d42] block sm:inline">System</span>
                  </h1>

                  {/* Subheading */}
                  <p className="mt-1.5 sm:mt-2 md:mt-3 text-xs sm:text-sm md:text-base font-semibold text-[#07316e]/90 leading-snug">
                    Superior Protection. Sleek Design. Built for Long-Term Performance.
                  </p>

                  {/* 5 Feature Badges */}
                  <div className="mt-3.5 sm:mt-5 md:mt-6 grid grid-cols-5 gap-1 sm:gap-2.5 md:gap-3.5 max-w-[330px] sm:max-w-[450px] md:max-w-[560px] lg:max-w-[600px]">
                    {standingSeamFeatures.map((feat) => {
                      const Icon = feat.icon;
                      return (
                        <div key={feat.label} className="flex flex-col items-center text-center">
                          <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full border-[1.5px] sm:border-2 border-[#d49d42] bg-white/95 shadow-xs flex items-center justify-center text-[#07316e] mb-1 sm:mb-1.5">
                            <Icon className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#07316e]" strokeWidth={2.2} />
                          </div>
                          <span className="text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] font-bold uppercase tracking-wider text-[#07316e] leading-tight text-center">
                            {feat.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Tagline & Industry Labels */}
              <div className="w-full pb-2 sm:pb-2.5 md:pb-3 px-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/40 bg-white/40 sm:bg-transparent backdrop-blur-[1px] sm:backdrop-blur-none">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="hidden xs:block h-[1px] w-6 sm:w-12 bg-[#d49d42]/70" />
                  <span className="text-[8px] sm:text-[10px] md:text-xs font-bold tracking-[0.14em] sm:tracking-[0.22em] text-[#07316e] uppercase whitespace-nowrap">
                    ROOFING SOLUTIONS FOR A SUSTAINABLE TOMORROW
                  </span>
                  <div className="hidden xs:block h-[1px] w-6 sm:w-12 bg-[#d49d42]/70" />
                </div>

                {/* Industry Icons & Labels */}
                <div className="hidden md:flex items-center gap-3 lg:gap-5 text-[#07316e]">
                  <div className="flex items-center gap-1">
                    <Factory className="w-3.5 h-3.5 text-[#07316e]" />
                    <span className="text-[8px] lg:text-[9px] font-bold tracking-wider uppercase">Industrial</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Warehouse className="w-3.5 h-3.5 text-[#07316e]" />
                    <span className="text-[8px] lg:text-[9px] font-bold tracking-wider uppercase">Warehouse</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-[#07316e]" />
                    <span className="text-[8px] lg:text-[9px] font-bold tracking-wider uppercase">Commercial</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wheat className="w-3.5 h-3.5 text-[#07316e]" />
                    <span className="text-[8px] lg:text-[9px] font-bold tracking-wider uppercase">Agricultural</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : system.slug === "erection-and-installation" ? (
          <section className="relative w-full h-[320px] sm:h-[360px] md:h-[420px] lg:h-[460px] overflow-hidden bg-slate-100 select-none">
            {/* Background Image: text-free high quality master banner */}
            <img
              src={productBanners["erection-and-installation"]}
              alt={`${system.title} - Sumiraj Industries`}
              className="absolute inset-0 w-full h-full object-cover object-right sm:object-center"
              loading="eager"
            />

            {/* Subtle soft gradient scrim on left for crystal clear text legibility on all devices */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent sm:from-white/85 sm:via-white/30 sm:to-transparent pointer-events-none" />

            {/* HTML / CSS Text Overlay Content */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none">
              {/* Upper & Center Left Content */}
              <div className="container-x mx-auto max-w-[1400px] w-full pt-4 sm:pt-6 md:pt-8 lg:pt-10">
                <div className="max-w-[340px] sm:max-w-[440px] md:max-w-[540px] lg:max-w-[620px]">
                  
                  {/* Eyebrow */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 md:mb-3">
                    <span className="text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-[#07316e]">
                      FROM DESIGN TO REALITY, BUILT TOGETHER
                    </span>
                    <div className="hidden sm:block h-[1.5px] w-8 md:w-12 bg-[#d49d42]" />
                  </div>

                  {/* Heading */}
                  <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-black tracking-tight leading-[1.08] text-[#07316e]">
                    Erection &{" "}
                    <span className="text-[#d49d42] block sm:inline">Installation</span>
                  </h1>

                  {/* Subheading */}
                  <p className="mt-1.5 sm:mt-2 md:mt-3 text-xs sm:text-sm md:text-base font-semibold text-[#07316e]/90 leading-snug">
                    Expert Execution. On-Time Completion. Built for Your Success.
                  </p>

                  {/* 4 Feature Badges */}
                  <div className="mt-3.5 sm:mt-5 md:mt-6 grid grid-cols-4 gap-1.5 sm:gap-3 md:gap-4 max-w-[320px] sm:max-w-[420px] md:max-w-[500px]">
                    {erectionInstallationFeatures.map((feat) => {
                      const Icon = feat.icon;
                      return (
                        <div key={feat.label} className="flex flex-col items-center text-center">
                          <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full border-[1.5px] sm:border-2 border-[#d49d42] bg-white/95 shadow-xs flex items-center justify-center text-[#07316e] mb-1 sm:mb-1.5">
                            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#07316e]" strokeWidth={2.2} />
                          </div>
                          <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] font-bold uppercase tracking-wider text-[#07316e] leading-tight">
                            {feat.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mobile View: 4 Panel Captions as compact navy pills */}
                  <div className="sm:hidden grid grid-cols-2 gap-1.5 mt-3 max-w-[320px]">
                    {erectionPanelCaptions.map((caption) => (
                      <div key={caption} className="flex items-center gap-1 bg-[#072856]/90 border border-[#d49d42]/70 rounded px-2 py-0.5 text-[7.5px] font-bold uppercase tracking-wider text-white shadow-xs">
                        <span className="w-1 h-1 rounded-full bg-[#d49d42] shrink-0" />
                        <span className="truncate">{caption}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lower Section: Desktop Inset Panel Captions + Bottom Tagline */}
              <div className="w-full relative">
                {/* 4 Inset Panel Captions on Tablet / Desktop, aligned directly over the 4 insets */}
                <div
                  className="hidden sm:grid grid-cols-4 gap-2 md:gap-4 absolute pointer-events-none z-20 bottom-9 sm:bottom-10 md:bottom-11 lg:bottom-12"
                  style={{ left: "18.5%", width: "75.5%" }}
                >
                  {erectionPanelCaptions.map((caption) => (
                    <div key={caption} className="flex justify-center">
                      <span className="bg-[#072856]/95 text-white border border-[#d49d42]/85 rounded-md px-1.5 sm:px-2 md:px-2.5 py-0.5 md:py-1 text-[8px] md:text-[9px] lg:text-[10px] font-bold uppercase tracking-wider shadow-md text-center truncate backdrop-blur-xs">
                        {caption}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Tagline & Industry Labels */}
                <div className="w-full pb-2 sm:pb-2.5 md:pb-3 px-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/40 bg-white/40 sm:bg-transparent backdrop-blur-[1px] sm:backdrop-blur-none">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="hidden xs:block h-[1px] w-6 sm:w-12 bg-[#d49d42]/70" />
                    <span className="text-[8px] sm:text-[10px] md:text-xs font-bold tracking-[0.14em] sm:tracking-[0.22em] text-[#07316e] uppercase whitespace-nowrap">
                      BUILDING SPACES. TOGETHER.
                    </span>
                    <div className="hidden xs:block h-[1px] w-6 sm:w-12 bg-[#d49d42]/70" />
                  </div>

                  {/* Industry Icons & Labels */}
                  <div className="hidden md:flex items-center gap-3 lg:gap-5 text-[#07316e]">
                    <div className="flex items-center gap-1">
                      <Factory className="w-3.5 h-3.5 text-[#07316e]" />
                      <span className="text-[8px] lg:text-[9px] font-bold tracking-wider uppercase">Industrial</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Warehouse className="w-3.5 h-3.5 text-[#07316e]" />
                      <span className="text-[8px] lg:text-[9px] font-bold tracking-wider uppercase">Warehouse</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-[#07316e]" />
                      <span className="text-[8px] lg:text-[9px] font-bold tracking-wider uppercase">Commercial</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Wheat className="w-3.5 h-3.5 text-[#07316e]" />
                      <span className="text-[8px] lg:text-[9px] font-bold tracking-wider uppercase">Agricultural</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : system.slug === "mezzanine-floors" ? (
          <section className="relative w-full h-[320px] sm:h-[360px] md:h-[420px] lg:h-[460px] overflow-hidden bg-slate-100 select-none">
            {/* Background Image: text-free high quality master banner */}
            <img
              src={productBanners["mezzanine-floors"]}
              alt={`${system.title} - Sumiraj Industries`}
              className="absolute inset-0 w-full h-full object-cover object-right sm:object-center"
              loading="eager"
            />

            {/* Subtle soft gradient scrim on left for crystal clear text legibility on all devices */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent sm:from-white/85 sm:via-white/30 sm:to-transparent pointer-events-none" />

            {/* HTML / CSS Text Overlay Content */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none">
              {/* Upper & Center Left Content */}
              <div className="container-x mx-auto max-w-[1400px] w-full pt-4 sm:pt-6 md:pt-8 lg:pt-10">
                <div className="max-w-[340px] sm:max-w-[440px] md:max-w-[540px] lg:max-w-[620px]">
                  
                  {/* Eyebrow */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 md:mb-3">
                    <span className="text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-[#07316e]">
                      SMART SPACE. STRONG STRUCTURE.
                    </span>
                    <div className="hidden sm:block h-[1.5px] w-8 md:w-12 bg-[#d49d42]" />
                  </div>

                  {/* Heading */}
                  <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-black tracking-tight leading-[1.08] text-[#07316e]">
                    Smart Steel{" "}
                    <span className="text-[#d49d42] block sm:inline">Mezzanine Floors</span>
                  </h1>

                  {/* Subheading */}
                  <p className="mt-1.5 sm:mt-2 md:mt-3 text-xs sm:text-sm md:text-base font-semibold text-[#07316e]/90 leading-snug">
                    Maximize Space. Improve Workflow. Build Upward.
                  </p>

                  {/* 4 Feature Badges */}
                  <div className="mt-3.5 sm:mt-5 md:mt-6 grid grid-cols-4 gap-1.5 sm:gap-3 md:gap-4 max-w-[320px] sm:max-w-[420px] md:max-w-[500px]">
                    {mezzanineFloorFeatures.map((feat) => {
                      const Icon = feat.icon;
                      return (
                        <div key={feat.label} className="flex flex-col items-center text-center">
                          <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full border-[1.5px] sm:border-2 border-[#d49d42] bg-white/95 shadow-xs flex items-center justify-center text-[#07316e] mb-1 sm:mb-1.5">
                            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#07316e]" strokeWidth={2.2} />
                          </div>
                          <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] font-bold uppercase tracking-wider text-[#07316e] leading-tight">
                            {feat.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* CTA Button */}
                  <div className="mt-3.5 sm:mt-4 md:mt-5 flex items-center gap-3 pointer-events-auto">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-lg bg-[#07316e] hover:bg-[#0a418f] text-white text-[11px] sm:text-xs md:text-sm font-bold shadow-md hover:shadow-lg transition-all border border-[#d49d42]/70 group"
                    >
                      <span>Request a Quote</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d49d42] group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Tagline & Industry Labels */}
              <div className="w-full pb-2 sm:pb-2.5 md:pb-3 px-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/40 bg-white/40 sm:bg-transparent backdrop-blur-[1px] sm:backdrop-blur-none">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="hidden xs:block h-[1px] w-6 sm:w-12 bg-[#d49d42]/70" />
                  <span className="text-[8px] sm:text-[10px] md:text-xs font-bold tracking-[0.14em] sm:tracking-[0.22em] text-[#07316e] uppercase whitespace-nowrap">
                    MORE SPACE. WITHOUT EXPANDING YOUR FOOTPRINT.
                  </span>
                  <div className="hidden xs:block h-[1px] w-6 sm:w-12 bg-[#d49d42]/70" />
                </div>

                {/* Industry Icons & Labels */}
                <div className="hidden md:flex items-center gap-3 lg:gap-5 text-[#07316e]">
                  <div className="flex items-center gap-1">
                    <Factory className="w-3.5 h-3.5 text-[#07316e]" />
                    <span className="text-[8px] lg:text-[9px] font-bold tracking-wider uppercase">Industrial</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Warehouse className="w-3.5 h-3.5 text-[#07316e]" />
                    <span className="text-[8px] lg:text-[9px] font-bold tracking-wider uppercase">Warehouse</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-[#07316e]" />
                    <span className="text-[8px] lg:text-[9px] font-bold tracking-wider uppercase">Commercial</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wheat className="w-3.5 h-3.5 text-[#07316e]" />
                    <span className="text-[8px] lg:text-[9px] font-bold tracking-wider uppercase">Agricultural</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : productBanners[system.slug] ? (
          <section className="relative w-full h-[240px] sm:h-[320px] md:h-[420px] lg:h-[460px] overflow-hidden">
            <img
              src={productBanners[system.slug]}
              alt={`${system.title} - Sumiraj Industries`}
              className="w-full h-full object-cover object-left-top sm:object-top"
              loading="eager"
            />
            <h1 className="sr-only">{system.title} - Sumiraj Industries</h1>
          </section>
        ) : (
          <PageHero
            image={bannerImage}
            breadcrumb="Products"
            eyebrow="Building Product Line"
            title={system.title}
            subtitle={system.description}
            height="md"
          />
        )}

        <section className="bg-white py-12 sm:py-16 md:py-20">
          <div className="container-x mx-auto max-w-[1400px]">
            
            {/* Top Navigation Bar */}
            <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-150 pb-5">
              <Link 
                to="/products" 
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-accent transition"
              >
                <ArrowLeft size={14} /> Back to Products Catalog
              </Link>
              
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <Link to="/products" className="hover:text-slate-600">Products</Link>
                <ChevronRight size={12} />
                <span className="font-bold text-accent">{system.title}</span>
              </div>
            </div>

            {/* Six Structural Component Cards (Exclusively on PEB Page) */}
            {isPebPage && (
              <div className="mb-16">
                <div className="mb-8 border-b border-slate-200 pb-5">
                  <span className="text-xs font-bold uppercase tracking-widest text-accent">Structural Components</span>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                    Pre-Engineered Building Systems & Specifications
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 max-w-3xl">
                    Explore the six core structural systems that comprise a Sumiraj Pre-Engineered Building. Download technical brochures and access complete component specifications below.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {pebSubProducts.map((prod) => (
                    <div
                      key={prod.slug}
                      className="group bg-white rounded-xl border border-slate-200/80 p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-slate-300 transition duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-accent transition duration-300">
                          {prod.title}
                        </h3>
                        <p className="mt-2.5 text-sm text-slate-500 line-clamp-3 leading-relaxed">
                          {prod.description}
                        </p>

                        {/* Horizontal Product Image (~16:9 Landscape) */}
                        <Link
                          to="/products/$productId"
                          params={{ productId: prod.slug }}
                          className="mt-4 block w-full aspect-[16/9] rounded-lg overflow-hidden bg-slate-100 border border-slate-200/60 relative focus:outline-none focus:ring-2 focus:ring-accent/50"
                        >
                          <img
                            src={prod.image}
                            alt={`${prod.title} - Sumiraj Industries`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </Link>

                        {/* PDF Download Option (Directly below image) */}
                        <div className="mt-3.5 flex items-center">
                          {prod.pdfAvailable ? (
                            <a
                              href={prod.pdfUrl}
                              download={prod.pdfFile}
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
                          params={{ productId: prod.slug }}
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
                  ))}
                </div>
              </div>
            )}

            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              
              {/* Main Content Area (8 Cols) */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Product Detail Markdown Content */}
                <div className="prose prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-slate-650 prose-p:leading-relaxed prose-a:text-accent prose-strong:text-slate-900 prose-ul:list-disc prose-ul:pl-5">
                  <SystemMarkdownRenderer content={system.content} />
                </div>

                {/* Optional Image Gallery */}
                {system.gallery && system.gallery.length > 0 && (
                  <div className="pt-8 border-t border-slate-100">
                    <h3 className="font-display text-xl font-bold text-slate-900 mb-6">Component Gallery</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {system.gallery.map((imgUrl, idx) => (
                        <div key={idx} className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-200/80 shadow-sm">
                          <img src={imgUrl} alt={`${system.title} detail ${idx + 1}`} className="h-full w-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom Prev / Next Navigation */}
                <div className="pt-10 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Link 
                    to="/products/$productId" 
                    params={{ productId: prevSystem.slug }}
                    className="w-full sm:w-auto inline-flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-accent hover:bg-slate-50 transition group"
                  >
                    <ArrowLeft size={16} className="text-slate-400 group-hover:text-accent transition-transform group-hover:-translate-x-1" />
                    <div className="text-left">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Previous Product</span>
                      <span className="text-xs font-bold text-slate-900 group-hover:text-accent transition">{prevSystem.title}</span>
                    </div>
                  </Link>

                  <Link 
                    to="/products/$productId" 
                    params={{ productId: nextSystem.slug }}
                    className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-end gap-3 p-4 rounded-xl border border-slate-200 hover:border-accent hover:bg-slate-50 transition group text-right"
                  >
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Next Product</span>
                      <span className="text-xs font-bold text-slate-900 group-hover:text-accent transition">{nextSystem.title}</span>
                    </div>
                    <ArrowRight size={16} className="text-slate-400 group-hover:text-accent transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

              </div>

              {/* Sidebar Sticky Panel (4 Cols) */}
              <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                
                {/* Catalog Navigation */}
                <div className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-6 shadow-xs">
                  <h4 className="font-display text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-3 mb-4">
                    All Products
                  </h4>
                  <nav className="space-y-1">
                    {buildingSystems.map((s) => {
                      const isActive = s.slug === system.slug;
                      return (
                        <Link
                          key={s.slug}
                          to="/products/$productId"
                          params={{ productId: s.slug }}
                          className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-bold transition ${
                            isActive 
                              ? "bg-slate-900 text-white shadow-sm" 
                              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                          }`}
                        >
                          <span>{s.title}</span>
                          <ChevronRight size={14} className={isActive ? "text-accent" : "text-slate-400"} />
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* Sidebar Inquiry Card */}
                <div className="rounded-xl bg-slate-900 p-6 text-white border border-slate-800 shadow-md">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Technical Consultation</span>
                  <h4 className="font-display text-xl font-bold mt-2 text-white">Need structural drawings or pricing?</h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    Connect with our engineering team for preliminary estimations, load assessments, and shop drawing reviews.
                  </p>
                  <Link 
                    to="/contact" 
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3 text-xs font-bold text-white hover:brightness-110 transition shadow-lg shadow-accent/15"
                  >
                    Request Product Quote <ArrowRight size={14} />
                  </Link>
                </div>

              </aside>

            </div>

          </div>
        </section>
      </motion.div>
    </Layout>
  );
}

function SystemMarkdownRenderer({ content }: { content: string }) {
  const blocks = useMemo(() => {
    return content.replace(/\r\n/g, '\n').split('\n\n').filter(b => b.trim() !== '');
  }, [content]);

  const renderTextWithLinks = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      const plainText = text.substring(lastIndex, match.index);
      if (plainText) {
        parts.push(renderTextWithBolds(plainText));
      }
      const linkText = match[1];
      const linkUrl = match[2];
      
      const isInternal = linkUrl.startsWith('/') || linkUrl.includes('sumiraj.com');
      const path = linkUrl.replace(/https?:\/\/(www\.)?sumiraj\.com/, '');
      
      if (isInternal && (path.startsWith('/') || path === '')) {
        parts.push(
          <Link key={match.index} to={path || '/'} className="text-accent font-semibold hover:underline">
            {linkText}
          </Link>
        );
      } else {
        parts.push(
          <a key={match.index} href={linkUrl} target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
            {linkText}
          </a>
        );
      }
      lastIndex = linkRegex.lastIndex;
    }

    const remainingText = text.substring(lastIndex);
    if (remainingText) {
      parts.push(renderTextWithBolds(remainingText));
    }

    return parts.length > 0 ? parts : text;
  };

  const renderTextWithBolds = (text: string) => {
    const boldRegex = /\*\*([^*]+)\*\*/g;
    let parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(
        <strong key={match.index} className="font-bold text-slate-900">
          {match[1]}
        </strong>
      );
      lastIndex = boldRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="space-y-4">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (trimmed.startsWith('# ')) {
          return <h1 key={idx}>{renderTextWithLinks(trimmed.substring(2))}</h1>;
        }
        if (trimmed.startsWith('## ')) {
          return <h2 key={idx}>{renderTextWithLinks(trimmed.substring(3))}</h2>;
        }
        if (trimmed.startsWith('### ')) {
          return <h3 key={idx}>{renderTextWithLinks(trimmed.substring(4))}</h3>;
        }
        if (trimmed.startsWith('- ')) {
          const listItems = trimmed.split('\n').filter(line => line.trim().startsWith('- '));
          return (
            <ul key={idx}>
              {listItems.map((li, lIdx) => (
                <li key={lIdx}>{renderTextWithLinks(li.replace(/^- /, ''))}</li>
              ))}
            </ul>
          );
        }
        return <p key={idx}>{renderTextWithLinks(trimmed)}</p>;
      })}
    </div>
  );
}
