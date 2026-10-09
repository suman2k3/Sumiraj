import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useMemo } from "react";
import { Layout } from "@/components/site/Layout";
import { BlogPost } from "@/lib/blogsData";
import { useBlogPosts, getBlogPostBySlug } from "@/lib/blogsStore";
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Phone, Mail, FileText, Share2 } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getBlogPostBySlug(params.slug);
    if (!post) {
      return {
        meta: [{ title: "Blog Post Not Found | Sumiraj" }],
      };
    }
    return {
      meta: [
        { title: `${post.title} | Sumiraj Blog` },
        { name: "description", content: `${post.content.replace(/[#*`\-]/g, "").substring(0, 155)}...` },
        { property: "og:title", content: post.title },
        { property: "og:description", content: `${post.content.replace(/[#*`\-]/g, "").substring(0, 155)}...` },
        { property: "og:image", content: post.image },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `https://www.sumiraj.com/blog/${post.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "canonical", href: `https://www.sumiraj.com/blog/${post.slug}` },
      ],
    };
  },
  component: SingleBlogPost,
});

// Custom simple parser to render Markdown syntax into beautiful React elements natively
export function getFontStyleClass(fontStyle?: string): string {
  if (!fontStyle) return "font-sans";
  if (fontStyle.includes("Serif")) return "font-serif";
  if (fontStyle.includes("Poppins") || fontStyle.includes("Clean")) return "font-display";
  if (fontStyle.includes("Space")) return "font-mono font-semibold";
  if (fontStyle.includes("Monospace") || fontStyle.includes("Code")) return "font-mono";
  return "font-sans";
}

// Custom simple parser to render Markdown syntax into beautiful React elements natively
export function MarkdownRenderer({ content, fontClass = "" }: { content: string; fontClass?: string }) {
  const elements = useMemo(() => {
    if (!content) return [];

    const rawText = content.replace(/\r\n/g, '\n');
    const blocks = rawText.split('\n\n').filter(b => b.trim() !== '');

    const renderLink = (linkText: string, linkUrl: string, key: string | number) => {
      const isInternal = linkUrl.startsWith('/') || linkUrl.includes('sumiraj.com');
      const path = linkUrl.replace(/https?:\/\/(www\.)?sumiraj\.com/, '');
      
      if (isInternal && (path.startsWith('/') || path === '')) {
        return (
          <Link key={key} to={path || '/'} className="text-accent font-semibold hover:underline">
            {renderInlineFormatting(linkText)}
          </Link>
        );
      }
      return (
        <a key={key} href={linkUrl} target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">
          {renderInlineFormatting(linkUrl ? linkText : '')}
        </a>
      );
    };

    const renderInlineFormatting = (text: string): React.ReactNode[] => {
      if (!text) return [];

      const tokenRegex = /(?:\[([^\]]+)\]\(([^)]+)\)|<a\s+href=["']([^"']+)["'][^>]*>(.*?)<\/a>|\*\*([^*]+)\*\*|==([^=]+)==|<mark[^>]*>(.*?)<\/mark>|<strong[^>]*>(.*?)<\/strong>|<b[^>]*>(.*?)<\/b>|<em[^>]*>(.*?)<\/em>|<i[^>]*>(.*?)<\/i>|<u[^>]*>(.*?)<\/u>|<code[^>]*>(.*?)<\/code>|<span[^>]*>(.*?)<\/span>|<br\s*\/?>)/gi;

      let parts: React.ReactNode[] = [];
      let lastIndex = 0;
      let match;

      while ((match = tokenRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push(text.substring(lastIndex, match.index));
        }

        const fullMatch = match[0];
        const key = `inline-${match.index}-${lastIndex}`;

        if (match[1] !== undefined && match[2] !== undefined) {
          parts.push(renderLink(match[1], match[2], key));
        } else if (match[3] !== undefined && match[4] !== undefined) {
          parts.push(renderLink(match[4], match[3], key));
        } else if (match[5] !== undefined) {
          parts.push(<strong key={key} className="font-bold text-slate-900">{renderInlineFormatting(match[5])}</strong>);
        } else if (match[6] !== undefined) {
          parts.push(
            <mark key={key} className="bg-amber-200/90 text-slate-900 px-1.5 py-0.5 rounded font-semibold shadow-sm">
              {renderInlineFormatting(match[6])}
            </mark>
          );
        } else if (match[7] !== undefined) {
          parts.push(
            <mark key={key} className="bg-amber-200/90 text-slate-900 px-1.5 py-0.5 rounded font-semibold shadow-sm">
              {renderInlineFormatting(match[7])}
            </mark>
          );
        } else if (match[8] !== undefined) {
          parts.push(<strong key={key} className="font-bold text-slate-900">{renderInlineFormatting(match[8])}</strong>);
        } else if (match[9] !== undefined) {
          parts.push(<strong key={key} className="font-bold text-slate-900">{renderInlineFormatting(match[9])}</strong>);
        } else if (match[10] !== undefined) {
          parts.push(<em key={key} className="italic">{renderInlineFormatting(match[10])}</em>);
        } else if (match[11] !== undefined) {
          parts.push(<em key={key} className="italic">{renderInlineFormatting(match[11])}</em>);
        } else if (match[12] !== undefined) {
          parts.push(<u key={key} className="underline">{renderInlineFormatting(match[12])}</u>);
        } else if (match[13] !== undefined) {
          parts.push(
            <code key={key} className="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono">
              {match[13]}
            </code>
          );
        } else if (match[14] !== undefined) {
          parts.push(<span key={key}>{renderInlineFormatting(match[14])}</span>);
        } else if (fullMatch.toLowerCase().startsWith('<br')) {
          parts.push(<br key={key} />);
        }

        lastIndex = tokenRegex.lastIndex;
      }

      if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
      }

      return parts.length > 0 ? parts : [text];
    };

    const renderSingleLine = (line: string, indexKey: string) => {
      const trimmed = line.trim();
      if (!trimmed) return null;

      const h1Match = /^<h1[^>]*>(.*?)<\/h1>/i.exec(trimmed);
      if (h1Match) {
        return (
          <h1 key={indexKey} className="font-display text-3xl md:text-4xl font-extrabold mt-10 mb-5 text-slate-950 border-b border-slate-200 pb-3 leading-tight">
            {renderInlineFormatting(h1Match[1])}
          </h1>
        );
      }

      const h2Match = /^<h2[^>]*>(.*?)<\/h2>/i.exec(trimmed);
      if (h2Match) {
        return (
          <h2 key={indexKey} className="font-display text-2xl md:text-3xl font-extrabold mt-8 mb-4 text-slate-900 border-b border-slate-100 pb-2 leading-tight">
            {renderInlineFormatting(h2Match[1])}
          </h2>
        );
      }

      const h3Match = /^<h3[^>]*>(.*?)<\/h3>/i.exec(trimmed);
      if (h3Match) {
        return (
          <h3 key={indexKey} className="font-display text-xl md:text-2xl font-bold mt-7 mb-3 text-slate-850 leading-snug">
            {renderInlineFormatting(h3Match[1])}
          </h3>
        );
      }

      const h4Match = /^<h4[^>]*>(.*?)<\/h4>/i.exec(trimmed);
      if (h4Match) {
        return (
          <h4 key={indexKey} className="font-display text-lg md:text-xl font-bold mt-6 mb-3 text-slate-800 leading-snug">
            {renderInlineFormatting(h4Match[1])}
          </h4>
        );
      }

      const h5Match = /^<h5[^>]*>(.*?)<\/h5>/i.exec(trimmed);
      if (h5Match) {
        return (
          <h5 key={indexKey} className="font-display text-base md:text-lg font-bold mt-5 mb-2.5 text-slate-800">
            {renderInlineFormatting(h5Match[1])}
          </h5>
        );
      }

      const h6Match = /^<h6[^>]*>(.*?)<\/h6>/i.exec(trimmed);
      if (h6Match) {
        return (
          <h6 key={indexKey} className="font-display text-sm md:text-base font-bold mt-5 mb-2 text-slate-750">
            {renderInlineFormatting(h6Match[1])}
          </h6>
        );
      }

      const pMatch = /^<p[^>]*>(.*?)<\/p>/i.exec(trimmed);
      if (pMatch) {
        return (
          <p key={indexKey} className="my-3 text-slate-650 leading-relaxed text-base md:text-lg">
            {renderInlineFormatting(pMatch[1])}
          </p>
        );
      }

      const blockquoteMatch = /^<blockquote[^>]*>(.*?)<\/blockquote>/i.exec(trimmed);
      if (blockquoteMatch) {
        return (
          <blockquote key={indexKey} className="my-6 border-l-4 border-accent bg-slate-50 px-6 py-4 italic text-slate-700 rounded-r-md">
            {renderInlineFormatting(blockquoteMatch[1])}
          </blockquote>
        );
      }

      if (trimmed.startsWith('######## ')) {
        return (
          <h6 key={indexKey} className="font-display text-[11px] font-extrabold uppercase tracking-widest mt-4 mb-2 text-slate-500">
            {renderInlineFormatting(trimmed.substring(9))}
          </h6>
        );
      }
      if (trimmed.startsWith('####### ')) {
        return (
          <h6 key={indexKey} className="font-display text-xs md:text-sm font-bold uppercase tracking-wider mt-4 mb-2 text-slate-700">
            {renderInlineFormatting(trimmed.substring(8))}
          </h6>
        );
      }
      if (trimmed.startsWith('###### ')) {
        return (
          <h6 key={indexKey} className="font-display text-sm md:text-base font-bold mt-5 mb-2 text-slate-750">
            {renderInlineFormatting(trimmed.substring(7))}
          </h6>
        );
      }
      if (trimmed.startsWith('##### ')) {
        return (
          <h5 key={indexKey} className="font-display text-base md:text-lg font-bold mt-5 mb-2.5 text-slate-800">
            {renderInlineFormatting(trimmed.substring(6))}
          </h5>
        );
      }
      if (trimmed.startsWith('#### ')) {
        return (
          <h4 key={indexKey} className="font-display text-lg md:text-xl font-bold mt-6 mb-3 text-slate-800 leading-snug">
            {renderInlineFormatting(trimmed.substring(5))}
          </h4>
        );
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={indexKey} className="font-display text-xl md:text-2xl font-bold mt-7 mb-3 text-slate-850 leading-snug">
            {renderInlineFormatting(trimmed.substring(4))}
          </h3>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={indexKey} className="font-display text-2xl md:text-3xl font-extrabold mt-8 mb-4 text-slate-900 border-b border-slate-100 pb-2 leading-tight">
            {renderInlineFormatting(trimmed.substring(3))}
          </h2>
        );
      }
      if (trimmed.startsWith('# ')) {
        return (
          <h1 key={indexKey} className="font-display text-3xl md:text-4xl font-extrabold mt-10 mb-5 text-slate-950 border-b border-slate-200 pb-3 leading-tight">
            {renderInlineFormatting(trimmed.substring(2))}
          </h1>
        );
      }

      if (trimmed === '---' || trimmed === '<hr>' || trimmed === '<hr/>') {
        return <hr key={indexKey} className="my-8 border-slate-200" />;
      }

      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={indexKey} className="my-6 border-l-4 border-accent bg-slate-50 px-6 py-4 italic text-slate-700 rounded-r-md">
            {renderInlineFormatting(trimmed.replace(/^>\s+/, ''))}
          </blockquote>
        );
      }

      return (
        <p key={indexKey} className="my-3 text-slate-650 leading-relaxed text-base md:text-lg">
          {renderInlineFormatting(line)}
        </p>
      );
    };

    const renderedNodes: React.ReactNode[] = [];

    blocks.forEach((block, bIdx) => {
      const trimmedBlock = block.trim();

      if (trimmedBlock.includes('|') && trimmedBlock.split('\n')[1]?.includes('---')) {
        const rows = trimmedBlock.split('\n').filter(r => r.trim() !== '');
        if (rows.length >= 2) {
          const headerRow = rows[0];
          const isSeparator = rows[1].includes('|') && rows[1].includes('---');
          const dataRows = isSeparator ? rows.slice(2) : rows.slice(1);
          
          const parseRow = (row: string) => 
            row.split('|')
               .map(c => c.trim())
               .filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
               
          const headers = parseRow(headerRow);
          
          renderedNodes.push(
            <div key={`table-${bIdx}`} className="my-8 overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
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
          return;
        }
      }

      const lines = block.split('\n').filter(l => l.trim() !== '');
      const isFullList = lines.every(l => l.trim().startsWith('- ') || l.trim().startsWith('* ') || /^<li[^>]*>/i.test(l.trim()));
      if (isFullList && lines.length > 0) {
        renderedNodes.push(
          <ul key={`ul-${bIdx}`} className="my-6 pl-6 list-disc space-y-2.5 text-slate-600 leading-relaxed text-base md:text-lg">
            {lines.map((line, idx) => {
              const cleaned = line.trim().replace(/^[-*]\s+/, '').replace(/^<li[^>]*>(.*?)<\/li>/i, '$1');
              return (
                <li key={idx} className="marker:text-accent">
                  {renderInlineFormatting(cleaned)}
                </li>
              );
            })}
          </ul>
        );
        return;
      }

      lines.forEach((line, lIdx) => {
        const node = renderSingleLine(line, `block-${bIdx}-line-${lIdx}`);
        if (node) renderedNodes.push(node);
      });
    });

    return renderedNodes;
  }, [content]);

  return <div className={`prose max-w-none ${fontClass} whitespace-pre-wrap`}>{elements}</div>;
}

function SingleBlogPost() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const blogPosts = useBlogPosts();

  // Locate the requested post
  const postIndex = useMemo(() => blogPosts.findIndex((p) => p.slug === slug), [blogPosts, slug]);
  const post = useMemo(() => (postIndex !== -1 ? blogPosts[postIndex] : null), [postIndex]);

  // Determine prev and next articles
  const prevPost = useMemo(() => (postIndex > 0 ? blogPosts[postIndex - 1] : null), [postIndex]);
  const nextPost = useMemo(() => (postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null), [postIndex]);

  // Determine related articles (same category first, otherwise other posts, up to 3)
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    let list = blogPosts.filter((p) => p.slug !== post.slug);
    let matched = list.filter((p) => p.category === post.category);
    let others = list.filter((p) => p.category !== post.category);
    return [...matched, ...others].slice(0, 3);
  }, [post]);

  if (!post) {
    return (
      <Layout>
        <div className="container-x mx-auto py-24 text-center">
          <h1 className="text-3xl font-bold">Article not found</h1>
          <p className="mt-4 text-slate-600">The article you are looking for does not exist.</p>
          <Link to="/blog" className="mt-6 inline-flex items-center gap-2 rounded bg-accent px-5 py-2.5 text-xs font-semibold text-white">
            <ArrowLeft size={14} /> Back to Blog Listing
          </Link>
        </div>
      </Layout>
    );
  }

  // Schema.org structured JSON-LD data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": [post.image],
    "datePublished": post.date.includes("Jun 2026") ? "2026-06-02T05:58:13+00:00" : "2026-02-04T05:58:13+00:00",
    "author": {
      "@type": "Organization",
      "name": post.author,
      "url": "https://sumiraj.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sumiraj Industries Private Limited",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sumiraj.com/public/logo/logo.png"
      }
    },
    "description": post.content.replace(/[#*`\-]/g, "").substring(0, 155)
  };

  const fontClass = getFontStyleClass(post.fontStyle);

  return (
    <Layout>
      {/* Inject JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb row & Quick Navigation */}
      <div className="bg-slate-50 border-b border-slate-100 py-4">
        <div className="container-x mx-auto max-w-[1400px] flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-accent">Blog</Link>
            <span>/</span>
            <span className="text-slate-800 font-medium truncate max-w-[180px] sm:max-w-xs">{post.title}</span>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-1 hover:text-accent font-bold">
            <ArrowLeft size={12} /> Back to Listing
          </Link>
        </div>
      </div>

      {/* Main content grid */}
      <article className={`py-16 md:py-24 bg-white ${fontClass}`}>
        <div className="container-x mx-auto max-w-[1400px]">
          
          {/* Article Header block */}
          <div className="max-w-4xl mb-10">
            <span className="rounded bg-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
              {post.category}
            </span>
            <h1 className={`mt-5 font-extrabold leading-[1.1] text-slate-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl ${fontClass}`}>
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="flex items-center gap-1 text-slate-600"><User size={14} className="text-accent" /> {post.author}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {post.readingTime}</span>
            </div>
          </div>

          {/* Large Hero Image */}
          <div className="aspect-[21/9] w-full overflow-hidden rounded-xl bg-slate-100 border shadow-sm mb-14">
            <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
          </div>

          <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
            
            {/* Left Column: Markdown content */}
            <div className={`blog-article-content min-w-0 ${fontClass}`}>
              <MarkdownRenderer content={post.content} fontClass={fontClass} />

              {/* Prev / Next Article Navigation row */}
              <div className="mt-16 pt-8 border-t border-slate-100 grid gap-4 sm:grid-cols-2">
                {prevPost ? (
                  <Link 
                    to={`/blog/${prevPost.slug}`}
                    className="group flex flex-col items-start rounded-xl border border-slate-150 p-5 hover:border-accent hover:shadow-md transition duration-300"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1">
                      <ArrowLeft size={10} /> Previous Article
                    </span>
                    <span className="mt-2 text-sm font-bold text-slate-800 group-hover:text-accent transition duration-300 line-clamp-1">
                      {prevPost.title}
                    </span>
                  </Link>
                ) : <div />}

                {nextPost ? (
                  <Link 
                    to={`/blog/${nextPost.slug}`}
                    className="group flex flex-col items-end text-right rounded-xl border border-slate-150 p-5 hover:border-accent hover:shadow-md transition duration-300"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1">
                      Next Article <ArrowRight size={10} />
                    </span>
                    <span className="mt-2 text-sm font-bold text-slate-800 group-hover:text-accent transition duration-300 line-clamp-1">
                      {nextPost.title}
                    </span>
                  </Link>
                ) : <div />}
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-24">
              
              {/* Author Card */}
              <div className="rounded-xl border border-slate-150 p-6 bg-slate-50">
                <h4 className="font-display text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
                  <User size={16} className="text-accent" /> Article Publisher
                </h4>
                <div className="mt-4">
                  <p className="font-display text-base font-bold text-slate-900">{post.author}</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    This article is engineered by the technical core of Sumiraj Industries, providing precise construction, structural design, and logistical execution data for industrial developers in India.
                  </p>
                </div>
              </div>

              {/* Share block */}
              <div className="rounded-xl border border-slate-150 p-6 bg-white">
                <h4 className="font-display text-sm font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
                  <Share2 size={16} className="text-accent" /> Share this Guide
                </h4>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button 
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="flex-1 rounded-sm bg-blue-600 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 transition"
                  >
                    Facebook
                  </button>
                  <button 
                    onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' - ' + window.location.href)}`, '_blank')}
                    className="flex-1 rounded-sm bg-green-600 py-2.5 text-xs font-semibold text-white hover:bg-green-700 transition"
                  >
                    WhatsApp
                  </button>
                  <button 
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="flex-1 rounded-sm bg-blue-700 py-2.5 text-xs font-semibold text-white hover:bg-blue-800 transition"
                  >
                    LinkedIn
                  </button>
                </div>
              </div>

              {/* Sidebar CTA */}
              <div className="rounded-xl bg-slate-950 p-6 text-white border border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Technical Consultation</span>
                <h4 className="font-display text-xl font-bold mt-2 text-white">Need a structural estimate?</h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  Submit your engineering plans or building layout to our team for a professional steel load and quantity assessment within 48 hours.
                </p>
                <div className="mt-6 space-y-3">
                  <Link 
                    to="/contact" 
                    className="inline-flex w-full items-center justify-center gap-2 rounded bg-accent py-3 text-xs font-bold text-white hover:brightness-110 transition shadow-lg shadow-accent/15"
                  >
                    Submit Drawing File <FileText size={14} />
                  </Link>
                  <a 
                    href="mailto:info@sumiraj.com" 
                    className="inline-flex w-full items-center justify-center gap-2 rounded border border-white/10 bg-white/5 py-3 text-xs font-semibold hover:bg-white/10 transition"
                  >
                    <Mail size={14} /> info@sumiraj.com
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Related Articles Section */}
      {relatedPosts.length > 0 && (
        <section className="bg-slate-50 py-12 sm:py-16 md:py-20 border-t border-slate-200/50">
          <div className="container-x mx-auto max-w-[1400px]">
            <span className="eyebrow">Related Guides</span>
            <h3 className="mt-3 font-display text-3xl font-extrabold text-slate-900 mb-10">Continue reading.</h3>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post) => (
                <article 
                  key={post.slug}
                  className="group flex flex-col overflow-hidden rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300"
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                      <span className="text-accent">{post.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Calendar size={10} /> {post.date}</span>
                    </div>
                    <h4 className="mt-3 font-display text-base font-bold leading-snug text-slate-900 group-hover:text-accent transition duration-300 flex-1 line-clamp-2">
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h4>
                    <div className="mt-5 pt-3 border-t border-slate-100">
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:text-orange-600 transition duration-300"
                      >
                        Read Article <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Turnkey Quote CTA */}
      <section className="bg-accent py-12 sm:py-16 text-white">
        <div className="container-x mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <h2 className="font-display text-2xl font-bold md:text-3xl">Ready to construct your Pre-Engineered Building?</h2>
            <p className="mt-2 max-w-xl text-white/85 text-xs sm:text-sm">Submit your requirements to India's trusted PEB experts. We handle design, fabrication, and installation with certified ISO quality.</p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded bg-slate-900 px-7 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-black transition-all duration-300 shadow-lg shrink-0">
            Request Preliminary Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
