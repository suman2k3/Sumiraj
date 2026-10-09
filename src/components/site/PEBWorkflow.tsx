import { motion, type Variants } from "framer-motion";
import primaryFramingImg from "@/assets/hero-primary-framing.jpg";
import aboutImg from "@/assets/hero-about.jpg";
import secondaryFramingImg from "@/assets/hero-secondary-framing.jpg";
import manufacturingImg from "@/assets/hero-manufacturing.jpg";
import welderImg from "@/assets/img-welder.jpg";
import erectionImg from "@/assets/hero-erection-installation.jpg";

interface WorkflowStep {
  step: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
}

const steps: WorkflowStep[] = [
  {
    step: "01",
    title: "Consultation",
    desc: "Project requirements, site conditions, structural needs, and operational requirements are evaluated to establish the right engineering approach for the project.",
    image: primaryFramingImg,
    alt: "Consultation",
  },
  {
    step: "02",
    title: "Design & Engineering",
    desc: "Structural designs, calculations, and engineering plans are developed according to project requirements, site conditions, and applicable standards.",
    image: aboutImg,
    alt: "PEB structural design and engineering",
  },
  {
    step: "03",
    title: "Detailing",
    desc: "Detailed fabrication drawings, connection details, and component specifications are prepared to ensure accuracy during manufacturing and erection.",
    image: secondaryFramingImg,
    alt: "PEB fabrication detailing",
  },
  {
    step: "04",
    title: "Manufacturing",
    desc: "Structural components are precision-fabricated through controlled manufacturing processes according to approved designs and specifications.",
    image: manufacturingImg,
    alt: "PEB steel manufacturing facility",
  },
  {
    step: "05",
    title: "Quality Inspection",
    desc: "Materials, dimensions, welding, fabrication, and finished components are inspected at critical stages to maintain consistent quality before dispatch.",
    image: welderImg,
    alt: "PEB quality inspection",
  },
  {
    step: "06",
    title: "Erection & Handover",
    desc: "Fabricated components are safely erected at the project site, followed by final checks, completion activities, and project handover.",
    image: erectionImg,
    alt: "PEB erection and project handover",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function PEBWorkflow() {
  return (
    <section className="container-x mx-auto max-w-[1400px] py-12 sm:py-16 md:py-20">
      {/* Section Header */}
      <div className="mx-auto max-w-3xl text-center mb-16 md:mb-20">
        <span className="eyebrow justify-center">WORKFLOW &amp; EXECUTION</span>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
          From Concept to Completion — Our Turnkey PEB Process
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          Every project follows a streamlined engineering and execution process that ensures precision, faster delivery, and uncompromising quality. From initial consultation and structural design to manufacturing, installation, and final handover, Sumiraj delivers complete turnkey Pre-Engineered Building (PEB) solutions for industrial, commercial, warehousing, and infrastructure projects.
        </p>
      </div>

      {/* Desktop / Large Screens Layout (6 Columns Horizontal Timeline) */}
      <div className="hidden lg:block">
        {/* Horizontal Timeline Connector Line */}
        <div className="relative mb-10">
          <div className="absolute top-1/2 left-[8%] right-[8%] h-[2px] bg-slate-200 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-6 gap-4 xl:gap-6 relative z-10">
            {steps.map((s) => (
              <div key={s.step} className="flex justify-center">
                <span className="h-10 w-10 rounded-full bg-accent text-white font-display text-sm font-bold flex items-center justify-center shadow-md ring-4 ring-white">
                  {s.step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 6 Step Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-6 gap-4 xl:gap-6"
        >
          {steps.map((s) => (
            <motion.div
              key={s.step}
              variants={itemVariants}
              className="group flex flex-col h-full bg-white rounded-xl border border-slate-150 p-4 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Image 3:2 ratio */}
              <div className="aspect-[3/2] w-full overflow-hidden rounded-lg bg-slate-100 mb-4 border border-slate-100">
                <img
                  src={s.image}
                  alt={s.alt}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h3 className="font-display text-base xl:text-lg font-bold text-slate-900 mb-2 group-hover:text-accent transition-colors">
                {s.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed flex-1">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Tablet Layout (3x2 Grid with Process Flow) */}
      <div className="hidden md:block lg:hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-3 gap-6"
        >
          {steps.map((s) => (
            <motion.div
              key={s.step}
              variants={itemVariants}
              className="group flex flex-col h-full bg-white rounded-xl border border-slate-150 p-5 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="h-8 w-8 rounded-full bg-accent text-white font-display text-xs font-bold flex items-center justify-center shrink-0">
                  {s.step}
                </span>
                <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-accent transition-colors">
                  {s.title}
                </h3>
              </div>
              <div className="aspect-[3/2] w-full overflow-hidden rounded-lg bg-slate-100 mb-3 border border-slate-100">
                <img
                  src={s.image}
                  alt={s.alt}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed flex-1">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mobile Layout (Vertical Timeline) */}
      <div className="block md:hidden">
        <div className="relative border-l-2 border-slate-200 pl-6 ml-3 space-y-8">
          {steps.map((s) => (
            <div key={s.step} className="relative">
              {/* Timeline Node */}
              <span className="absolute -left-[37px] top-0 h-7 w-7 rounded-full bg-accent text-white font-display text-xs font-bold flex items-center justify-center ring-4 ring-white shadow-sm">
                {s.step}
              </span>

              <div className="bg-white rounded-xl border border-slate-150 p-5 shadow-sm">
                <div className="aspect-[3/2] w-full overflow-hidden rounded-lg bg-slate-100 mb-4 border border-slate-100">
                  <img
                    src={s.image}
                    alt={s.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
