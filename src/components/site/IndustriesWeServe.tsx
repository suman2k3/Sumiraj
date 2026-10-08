import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import manufacturingImg from "@/assets/hero-manufacturing.jpg";
import warehouseImg from "@/assets/img-warehouse.jpg";
import logisticsImg from "@/assets/hero-home-3.jpg";

interface IndustryItem {
  id: string;
  title: string;
  image: string;
  alt: string;
}

const row1Industries: IndustryItem[] = [
  {
    id: "manufacturing-plants",
    title: "Manufacturing Plants",
    image: manufacturingImg,
    alt: "Manufacturing plant steel structure",
  },
  {
    id: "warehouses",
    title: "Warehouses",
    image: warehouseImg,
    alt: "Industrial warehouse building",
  },
  {
    id: "logistics",
    title: "Logistics",
    image: logisticsImg,
    alt: "Logistics facility",
  },
];

const row2Industries: IndustryItem[] = [
  {
    id: "cement-industries",
    title: "Cement Industries",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=800&auto=format&fit=crop",
    alt: "Cement industry facility",
  },
  {
    id: "food-processing",
    title: "Food Processing",
    image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=800&auto=format&fit=crop",
    alt: "Food processing facility",
  },
  {
    id: "automobile",
    title: "Automobile",
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=800&auto=format&fit=crop",
    alt: "Automobile manufacturing facility",
  },
  {
    id: "cold-storage",
    title: "Cold Storage",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=800&auto=format&fit=crop",
    alt: "Cold storage facility",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.08,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  }),
};

function IndustryCard({ item, index }: { item: IndustryItem; index: number }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      className="group relative overflow-hidden rounded-xl bg-slate-950 shadow-sm border border-slate-200/80 aspect-[3/2] w-full flex flex-col justify-end p-6 cursor-pointer"
    >
      {/* Background Image */}
      <img
        src={item.image}
        alt={item.alt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        loading="lazy"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/10 transition-opacity duration-300 group-hover:from-slate-950/95" />

      {/* Top Right Accent Arrow */}
      <div className="absolute top-4 right-4 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-accent group-hover:border-accent">
        <ArrowUpRight size={16} />
      </div>

      {/* Bottom Content Area */}
      <div className="relative z-10 flex flex-col">
        {/* Subtle Ember Orange Accent Indicator */}
        <div className="w-8 h-1 bg-accent rounded-full mb-2.5 transition-all duration-300 group-hover:w-12" />
        
        {/* Industry Title */}
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight transition-transform duration-300 group-hover:-translate-y-0.5">
          {item.title}
        </h3>
      </div>
    </motion.div>
  );
}

export function IndustriesWeServe() {
  return (
    <section className="container-x mx-auto max-w-[1400px] py-24">
      {/* Section Header */}
      <div className="mx-auto max-w-3xl text-center mb-16">
        <p className="eyebrow justify-center">Sectors We Empower</p>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl text-slate-900">
          Industries We Serve
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          Engineered solutions built to meet the unique demands of diverse industries.
        </p>
      </div>

      {/* 7-Card Grid Layout */}
      <div className="space-y-6">
        {/* Row 1: 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {row1Industries.map((item, idx) => (
            <IndustryCard key={item.id} item={item} index={idx} />
          ))}
        </div>

        {/* Row 2: 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {row2Industries.map((item, idx) => (
            <IndustryCard key={item.id} item={item} index={idx + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
