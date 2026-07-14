import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { blogPosts } from "@/lib/blogsData";
import heroImg from "@/assets/hero-gallery.jpg"; // Using a beautiful existing industrial hero asset
import { Search, Calendar, Clock, ArrowRight, Mail, Sparkles, Filter } from "lucide-react";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blogs & Technical Guides | Sumiraj PEB & Steel Structures" },
      { name: "description", content: "Expert technical articles, pricing guides, and solutions for Pre-Engineered Buildings (PEB), steel structures, and manufacturing plants." },
      { property: "og:title", content: "Sumiraj PEB Engineering Blog" },
      { property: "og:description", content: "Learn about steel requirements, PEB costs, and cold storage designs from our engineering team." },
    ],
  }),
  component: BlogListing,
});

const categories = ["All", "PEB Systems", "Engineering", "Manufacturing", "Cold Storage", "Cost Guide"] as const;
type Category = typeof categories[number];

function BlogListing() {
  const [selectedCat, setSelectedCat] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [email, setEmail] = useState("");
  const [subscribed, setSubsubscribed] = useState(false);

  // Generate excerpts for the listing cards
  const postsWithExcerpts = useMemo(() => {
    return blogPosts.map(post => {
      // Find the first paragraph or clean section to create an excerpt
      const cleanContent = post.content
        .replace(/[#*`\-]/g, "") // remove markdown syntax
        .trim();
      const excerpt = cleanContent.length > 160 
        ? cleanContent.substring(0, 160) + "..." 
        : cleanContent;
      return { ...post, excerpt };
    });
  }, []);

  // Filter posts based on search query and category
  const filteredPosts = useMemo(() => {
    return postsWithExcerpts.filter(post => {
      const matchesCategory = selectedCat === "All" || post.category === selectedCat;
      const matchesSearch = searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [postsWithExcerpts, selectedCat, searchQuery]);

  // Featured article (first matched article when not searching/filtering, otherwise first filtered)
  const featuredPost = useMemo(() => {
    if (filteredPosts.length === 0) return null;
    return filteredPosts[0];
  }, [filteredPosts]);

  // Remaining articles for the grid
  const gridPosts = useMemo(() => {
    if (filteredPosts.length <= 1) return [];
    return filteredPosts.slice(1);
  }, [filteredPosts]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubsubscribed(true);
      setEmail("");
    }
  };

  return (
    <Layout>
      <PageHero
        image={heroImg}
        breadcrumb="Blog"
        eyebrow="Resources & Insights"
        title={<>Steel Knowledge,<br />Forged by Experts.</>}
        subtitle="Explore technical calculation guides, engineering analysis, pricing details, and PEB design methodologies written by our core engineering team."
        height="md"
      />

      <section className="bg-slate-50 py-16">
        <div className="container-x mx-auto max-w-[1400px]">
          
          {/* Controls: Search bar & Category filter */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-10 mb-12">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1.5">
                <Filter size={14} /> Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCat(cat);
                    setVisibleCount(6); // Reset visible count on filter change
                  }}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    selectedCat === cat
                      ? "bg-accent text-white"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-accent/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Search technical guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-sm border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
              <Search className="absolute left-3.5 top-3 text-slate-400" size={16} />
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-lg border border-slate-100 shadow-sm">
              <p className="text-lg text-slate-500 font-medium">No technical articles found matching your search.</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCat("All"); }}
                className="mt-4 inline-flex items-center gap-2 rounded bg-accent px-5 py-2.5 text-xs font-semibold text-white hover:brightness-110 transition duration-300"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              {/* Featured Post (Only show if search is not restrictive or if there are matches) */}
              {featuredPost && (
                <div className="mb-14">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent mb-4">
                    <Sparkles size={14} className="animate-pulse" /> Featured Article
                  </span>
                  <div className="group grid gap-6 lg:grid-cols-12 overflow-hidden rounded-xl bg-white border border-slate-100 shadow-md hover:shadow-xl transition-all duration-500">
                    <div className="lg:col-span-7 aspect-[16/9] lg:aspect-auto overflow-hidden relative min-h-[300px]">
                      <img 
                        src={featuredPost.image} 
                        alt={featuredPost.title} 
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
                      />
                    </div>
                    <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                        <span className="text-accent">{featuredPost.category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Calendar size={12} /> {featuredPost.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {featuredPost.readingTime}</span>
                      </div>
                      <h2 className="mt-4 font-display text-2xl font-extrabold leading-tight text-slate-900 md:text-3xl lg:text-4xl group-hover:text-accent transition duration-300">
                        <Link to={`/blog/${featuredPost.slug}`}>
                          {featuredPost.title}
                        </Link>
                      </h2>
                      <p className="mt-4 text-slate-600 leading-relaxed text-sm md:text-base">
                        {featuredPost.excerpt}
                      </p>
                      <div className="mt-8">
                        <Link 
                          to={`/blog/${featuredPost.slug}`}
                          className="inline-flex items-center gap-2 rounded bg-accent px-6 py-3.5 text-xs font-semibold text-white hover:brightness-110 transition duration-300"
                        >
                          Read Full Article <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid of Other Articles */}
              {gridPosts.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-200 pb-3">
                    Technical Knowledge Base
                  </h3>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {gridPosts.slice(0, visibleCount).map((post) => (
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
                            <span>•</span>
                            <span className="flex items-center gap-1"><Clock size={10} /> {post.readingTime}</span>
                          </div>
                          <h4 className="mt-3 font-display text-lg font-bold leading-snug text-slate-900 group-hover:text-accent transition duration-300 flex-1 line-clamp-2">
                            <Link to={`/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h4>
                          <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="mt-5 pt-4 border-t border-slate-100">
                            <Link 
                              to={`/blog/${post.slug}`}
                              className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:text-orange-600 transition duration-300"
                            >
                              Read More <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* Load More Button */}
                  {gridPosts.length > visibleCount && (
                    <div className="mt-12 text-center">
                      <button
                        onClick={() => setVisibleCount(prev => prev + 3)}
                        className="inline-flex items-center gap-2 rounded border border-slate-200 bg-white px-6 py-3.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300"
                      >
                        Load More Articles
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

        </div>
      </section>

      {/* Newsletter Signup CTA */}
      <section className="bg-slate-900 py-20 text-white border-t border-slate-850">
        <div className="container-x mx-auto max-w-[1400px]">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow text-accent">Technical Newsletter</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold md:text-4xl text-white">
              Stay ahead in PEB &amp; Steel Engineering.
            </h2>
            <p className="mt-4 text-sm md:text-base text-slate-400 leading-relaxed">
              Subscribe to our monthly technical dispatch. Get calculation methodologies, cost breakdowns, case studies, and engineering updates directly in your inbox.
            </p>
            {subscribed ? (
              <div className="mt-8 rounded bg-slate-800/50 border border-accent/20 p-6 text-center">
                <p className="text-sm font-bold text-accent">✓ Subscription Successful!</p>
                <p className="text-xs text-slate-300 mt-1">Thank you for subscribing to Sumiraj Technical Insights.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-8 flex flex-col gap-3 sm:flex-row sm:max-w-md sm:mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your professional email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-sm border border-slate-700 bg-slate-800/40 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded bg-accent px-6 py-3 text-sm font-semibold text-white hover:brightness-110 transition duration-300 shrink-0 shadow-lg shadow-accent/10"
                >
                  Subscribe <Mail size={16} />
                </button>
              </form>
            )}
            <p className="text-[10px] text-slate-500 mt-3">We respect your privacy. Unsubscribe at any time. No spam.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
