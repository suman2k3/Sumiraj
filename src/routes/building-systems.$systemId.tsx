import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useMemo } from "react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { buildingSystems } from "@/lib/buildingSystemsData";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-manufacturing.jpg"; // reuse premium manufacturing banner
import { CheckCircle2, ArrowRight, Shield, Award, Sparkles, Wrench } from "lucide-react";

export const Route = createFileRoute("/building-systems/$systemId")({
  head: ({ params }) => {
    const system = buildingSystems.find((s) => s.slug === params.systemId);
    if (!system) {
      return {
        meta: [{ title: "System Not Found | Sumiraj" }],
      };
    }
    return {
      meta: [
        { title: `${system.title} | Sumiraj Building Systems` },
        { name: "description", content: system.description },
        { property: "og:title", content: system.title },
        { property: "og:description", content: system.description },
      ],
    };
  },
  component: BuildingSystemPage,
});

// Custom Markdown parser that styles headings, bullet lists, tables, and paragraphs
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
      const plainText = text.substring(lastIndex, match.index);
      if (plainText) {
        parts.push(plainText);
      }
      parts.push(<strong key={match.index} className="font-bold text-slate-900">{match[1]}</strong>);
      lastIndex = boldRegex.lastIndex;
    }

    const remainingText = text.substring(lastIndex);
    if (remainingText) {
      parts.push(remainingText);
    }

    return parts.length > 0 ? parts : text;
  };

  const renderBlock = (block: string, index: number) => {
    const trimmed = block.trim();

    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={index} className="font-display text-2xl font-extrabold mt-10 mb-5 text-slate-900 border-b border-slate-100 pb-3 leading-tight">
          {renderTextWithLinks(trimmed.substring(3))}
        </h2>
      );
    }
    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={index} className="font-display text-lg font-bold mt-6 mb-3 text-slate-850">
          {renderTextWithLinks(trimmed.substring(4))}
        </h3>
      );
    }

    if (trimmed === '---') {
      return <hr key={index} className="my-8 border-slate-200" />;
    }

    // Bullet list
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const lines = trimmed.split('\n');
      const items = lines.map(line => line.replace(/^[-*]\s+/, '').trim()).filter(line => line !== '');
      return (
        <ul key={index} className="my-6 pl-6 list-disc space-y-2.5 text-slate-650 leading-relaxed text-sm sm:text-base">
          {items.map((item, idx) => (
            <li key={idx} className="marker:text-accent">
              {renderTextWithLinks(item)}
            </li>
          ))}
        </ul>
      );
    }

    // Tables
    if (trimmed.includes('|') && trimmed.split('\n')[1]?.includes('---')) {
      const rows = trimmed.split('\n').filter(r => r.trim() !== '');
      if (rows.length >= 2) {
        const headerRow = rows[0];
        const isSeparator = rows[1].includes('|') && rows[1].includes('---');
        const dataRows = isSeparator ? rows.slice(2) : rows.slice(1);
        
        const parseRow = (row: string) => 
          row.split('|')
             .map(c => c.trim())
             .filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
             
        const headers = parseRow(headerRow);
        
        return (
          <div key={index} className="my-8 overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
            <table className="w-full text-left text-sm text-slate-650 border-collapse">
              <thead className="bg-slate-100/90 font-display text-xs uppercase tracking-wider text-slate-700 border-b border-slate-200">
                <tr>
                  {headers.map((h, i) => (
                    <th key={i} className="px-6 py-4 font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dataRows.map((row, i) => {
                  const cells = parseRow(row);
                  return (
                    <tr key={i} className={i % 2 === 0 ? "bg-white hover:bg-slate-50/50" : "bg-slate-50/30 hover:bg-slate-50/50"}>
                      {cells.map((c, j) => (
                        <td key={j} className="px-6 py-4 font-medium">{c}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      }
    }

    return (
      <p key={index} className="my-4 text-slate-650 leading-relaxed text-sm sm:text-base">
        {renderTextWithLinks(trimmed)}
      </p>
    );
  };

  return <div className="prose max-w-none">{blocks.map((block, idx) => renderBlock(block, idx))}</div>;
}

function BuildingSystemPage() {
  const { systemId } = useParams({ from: "/building-systems/$systemId" });

  const system = useMemo(() => {
    return buildingSystems.find((s) => s.slug === systemId);
  }, [systemId]);

  if (!system) {
    return (
      <Layout>
        <div className="container-x mx-auto py-24 text-center">
          <h1 className="text-3xl font-bold text-slate-900">System Not Found</h1>
          <p className="mt-4 text-slate-650">The building system page you are looking for does not exist.</p>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded bg-accent px-5 py-2.5 text-xs font-bold text-white">
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>
      </Layout>
    );
  }

  // Why choose Sumiraj points
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
          eyebrow="Precision Engineering"
          title={<span className="line-clamp-2">{system.title}</span>}
          subtitle={system.description}
        />

        {/* Content Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-x mx-auto max-w-[1400px]">
            <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
              
              {/* Left Column: Markdown content */}
              <div className="min-w-0">
                <SystemMarkdownRenderer content={system.content} />
              </div>

              {/* Right Column: Spec / Gallery Sidebar */}
              <aside className="space-y-6 lg:sticky lg:top-24">
                
                {/* Image Gallery */}
                {system.gallery.length > 0 && (
                  <div className="rounded-xl border border-slate-150 p-6 bg-slate-50 shadow-sm">
                    <h4 className="font-display text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-200 pb-3 flex items-center gap-2 mb-4">
                      Technical Visuals
                    </h4>
                    <div className="grid gap-4 grid-cols-2">
                      {system.gallery.map((imgUrl, idx) => (
                        <div key={idx} className="relative overflow-hidden rounded-lg border border-slate-200 aspect-[4/3] bg-white shadow-sm">
                          <img 
                            src={imgUrl} 
                            alt={`${system.title} rendering ${idx + 1}`} 
                            className="h-full w-full object-cover hover:scale-105 transition duration-500" 
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sidebar Consultation CTA */}
                <div className="rounded-xl bg-slate-950 p-6 text-white border border-slate-800 shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent flex items-center gap-1">Technical Consultation</span>
                  <h4 className="font-display text-lg font-bold mt-2 text-white">Need structural specifications?</h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    Connect with our technical consultants to receive exact detail drawings, catalog files, and material grade documentation for your project.
                  </p>
                  <div className="mt-6 space-y-3">
                    <Link 
                      to="/contact" 
                      className="inline-flex w-full items-center justify-center gap-2 rounded bg-accent py-3 text-xs font-bold text-white hover:brightness-110 transition shadow-lg shadow-accent/15"
                    >
                      Request Technical Catalog <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Why Choose Sumiraj Section */}
        <section className="py-20 bg-slate-50 border-t border-b border-slate-100">
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
                <div key={idx} className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm flex flex-col hover:shadow-md transition duration-300">
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
