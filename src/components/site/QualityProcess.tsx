import { motion } from "framer-motion";
import { Ruler, Flame, FileSearch, ShieldCheck, ClipboardCheck } from "lucide-react";

interface Checkpoint {
  num: string;
  title: string;
  desc: string;
  icon: typeof Ruler;
}

const checkpoints: Checkpoint[] = [
  {
    num: "01",
    title: "Dimensional Checks",
    desc: "Precision verification of fabricated components against approved dimensions and drawings.",
    icon: Ruler,
  },
  {
    num: "02",
    title: "Weld Inspection",
    desc: "Inspection of welded joints and connections to maintain fabrication quality and structural integrity.",
    icon: Flame,
  },
  {
    num: "03",
    title: "Material Traceability",
    desc: "Maintaining material identification and records throughout the manufacturing process.",
    icon: FileSearch,
  },
  {
    num: "04",
    title: "Coating Inspection",
    desc: "Inspection of surface preparation and coating application for consistent protective coverage.",
    icon: ShieldCheck,
  },
  {
    num: "05",
    title: "Dispatch Verification",
    desc: "Final verification of fabricated components and documentation before dispatch to the project site.",
    icon: ClipboardCheck,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function QualityProcess() {
  return (
    <section className="bg-slate-900 border-y border-slate-800 py-20 text-white overflow-hidden">
      <div className="container-x mx-auto max-w-[1400px]">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 md:mb-20">
          <p className="eyebrow text-accent justify-center">QUALITY CONTROL PROCESS</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Quality at Every Step
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            Quality checks integrated throughout our manufacturing process to ensure consistency, accuracy, and reliable fabrication.
          </p>
        </div>

        {/* Desktop / Tablet Horizontal Timeline Layout */}
        <div className="hidden lg:block relative">
          {/* Horizontal Timeline Connector Line */}
          <div className="absolute top-[58px] left-[10%] right-[10%] h-[2px] bg-slate-800 z-0" />

          {/* 5 Column Checkpoints */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid grid-cols-5 gap-6 relative z-10"
          >
            {checkpoints.map((cp) => (
              <motion.div
                key={cp.num}
                variants={itemVariants}
                className="group flex flex-col items-center text-center cursor-pointer"
              >
                {/* Number Badge */}
                <span className="font-display text-sm font-bold text-accent mb-3 tracking-widest transition-transform duration-300 group-hover:-translate-y-0.5">
                  {cp.num}
                </span>

                {/* Timeline Circle Node */}
                <div className="h-9 w-9 rounded-full bg-slate-950 border-2 border-accent ring-4 ring-slate-900 flex items-center justify-center text-accent mb-6 transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:scale-110">
                  <cp.icon size={18} />
                </div>

                {/* Content Block */}
                <div className="flex flex-col items-center">
                  <h3 className="font-display text-lg font-bold text-white mb-2 transition-colors group-hover:text-accent group-hover:-translate-y-0.5">
                    {cp.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-[230px]">
                    {cp.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Horizontal Scrollable Timeline */}
        <div className="block lg:hidden">
          <div className="flex overflow-x-auto snap-x scrollbar-none gap-6 pb-6 pt-2 px-2 -mx-2">
            {checkpoints.map((cp) => (
              <div
                key={cp.num}
                className="snap-center min-w-[260px] max-w-[280px] shrink-0 bg-slate-800/50 border border-slate-700/60 rounded-xl p-6 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-xs font-bold text-accent tracking-widest">
                    {cp.num}
                  </span>
                  <div className="h-8 w-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <cp.icon size={16} />
                  </div>
                </div>

                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {cp.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed flex-1">
                  {cp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
