import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useMemo } from "react";
import { Layout } from "@/components/site/Layout";
import { blogPosts, BlogPost } from "@/lib/blogsData";
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Phone, Mail, FileText, Share2 } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
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
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: SingleBlogPost,
});

// Custom simple parser to render Markdown syntax into beautiful React elements natively
function MarkdownRenderer({ content }: { content: string }) {
  const blocks = useMemo(() => {
    // Normalize line endings and split by double newlines to find paragraphs/blocks
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
        parts.push(renderBoldText(plainText));
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
      parts.push(renderBoldText(remainingText));
    }

    return parts.length > 0 ? parts : text;
  };

  const renderBoldText = (text: string) => {
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

    // Headers
    if (trimmed.startsWith('# ')) {
      return (
        <h1 key={index} className="font-display text-3xl font-extrabold mt-10 mb-5 text-slate-950 border-b border-slate-100 pb-3 leading-tight">
          {renderTextWithLinks(trimmed.substring(2))}
        </h1>
      );
    }
    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={index} className="font-display text-2xl font-extrabold mt-8 mb-4 text-slate-900 border-b border-slate-100 pb-2 leading-tight">
          {renderTextWithLinks(trimmed.substring(3))}
        </h2>
      );
    }
    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={index} className="font-display text-xl font-bold mt-6 mb-3 text-slate-850 leading-snug">
          {renderTextWithLinks(trimmed.substring(4))}
        </h3>
      );
    }

    // Horizontal Rule
    if (trimmed === '---') {
      return <hr key={index} className="my-8 border-slate-200" />;
    }

    // Bullet Lists
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const lines = trimmed.split('\n');
      const items = lines.map(line => line.replace(/^[-*]\s+/, '').trim()).filter(line => line !== '');
      return (
        <ul key={index} className="my-6 pl-6 list-disc space-y-2.5 text-slate-600 leading-relaxed text-base md:text-lg">
          {items.map((item, idx) => (
            <li key={idx} className="marker:text-accent">
              {renderTextWithLinks(item)}
            </li>
          ))}
        </ul>
      );
    }

    // Table Parsing
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

    // Blockquote
    if (trimmed.startsWith('> ')) {
      const quoteText = trimmed.replace(/^>\s+/, '').trim();
      return (
        <blockquote key={index} className="my-8 border-l-4 border-accent bg-slate-50 px-6 py-4 italic text-slate-700 rounded-r-md">
          {renderTextWithLinks(quoteText)}
        </blockquote>
      );
    }

    // Default Paragraph
    return (
      <p key={index} className="my-4 text-slate-650 leading-relaxed text-base md:text-lg">
        {renderTextWithLinks(trimmed)}
      </p>
    );
  };

  return <div className="prose max-w-none">{blocks.map((block, idx) => renderBlock(block, idx))}</div>;
}

function SingleBlogPost() {
  const { slug } = useParams({ from: "/blog/$slug" });

  // Locate the requested post
  const postIndex = useMemo(() => blogPosts.findIndex((p) => p.slug === slug), [slug]);
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
      <article className="py-16 md:py-24 bg-white">
        <div className="container-x mx-auto max-w-[1400px]">
          
          {/* Article Header block */}
          <div className="max-w-4xl mb-10">
            <span className="rounded bg-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
              {post.category}
            </span>
            <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
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
            <div className="blog-article-content min-w-0">
              <MarkdownRenderer content={post.content} />

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
        <section className="bg-slate-50 py-20 border-t border-slate-200/50">
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
      <section className="bg-accent py-16 text-white">
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
