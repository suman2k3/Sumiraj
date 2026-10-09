import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useMemo } from "react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { buildingSystems } from "@/lib/buildingSystemsData";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-manufacturing.jpg";
import pebHeroImg from "@/assets/hero-peb-system.jpg";
import primaryFramingHeroImg from "@/assets/hero-primary-framing.jpg";
import secondaryFramingHeroImg from "@/assets/hero-secondary-framing.jpg";
import roofingCladdingHeroImg from "@/assets/hero-roofing-cladding.jpg";
import standingSeamHeroImg from "@/assets/hero-standing-seam.jpg";
import mezzanineHeroImg from "@/assets/hero-mezzanine-floors.jpg";
import erectionInstallationHeroImg from "@/assets/hero-erection-installation.jpg";
import { CheckCircle2, ArrowRight, ArrowLeft, Shield, Award, Sparkles, Wrench, ChevronRight } from "lucide-react";

const systemBannerMap: Record<string, string> = {
  "pre-engineered-buildings": pebHeroImg,
  "primary-framing": primaryFramingHeroImg,
  "secondary-framing-systems": secondaryFramingHeroImg,
  "roofing-and-wall-cladding-systems": roofingCladdingHeroImg,
  "standing-seam-roofing-system": standingSeamHeroImg,
  "mezzanine-floors": mezzanineHeroImg,
  "erection-and-installation": erectionInstallationHeroImg,
};

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
        <PageHero
          image={bannerImage}
          breadcrumb="Products"
          eyebrow="Building Product Line"
          title={system.title}
          subtitle={system.description}
          height="md"
        />

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
