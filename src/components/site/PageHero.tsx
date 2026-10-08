import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

interface Props {
  image: string;
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  breadcrumb: string;
  height?: "sm" | "md" | "lg";
}

export function PageHero({ image, eyebrow, title, subtitle, breadcrumb, height = "md" }: Props) {
  const h =
    height === "sm"
      ? "h-[200px] sm:h-[280px] md:h-[360px]"
      : height === "lg"
      ? "h-[280px] sm:h-[400px] md:h-[540px]"
      : "h-[220px] sm:h-[320px] md:h-[420px] lg:h-[460px]";

  return (
    <section className={`relative w-full overflow-hidden ${h} transition-all duration-300`}>
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--steel-dark)]/90 via-[var(--steel-dark)]/70 to-[var(--steel-dark)]/40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_120%,color-mix(in_oklab,var(--ember)_35%,transparent),transparent_60%)]" />
      <div className="container-x relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end pb-8 sm:pb-12 md:pb-14 text-primary-foreground">
        <div className="mb-2 sm:mb-4 flex items-center gap-2 text-[10px] sm:text-xs text-primary-foreground/70">
          <Link to="/" className="hover:text-accent">Home</Link>
          <ChevronRight size={12} />
          <span className="text-accent">{breadcrumb}</span>
        </div>
        <p className="eyebrow text-[10px] sm:text-xs">{eyebrow}</p>
        <h1 className="mt-1.5 sm:mt-3 max-w-4xl font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 sm:mt-4 max-w-2xl text-xs sm:text-base leading-relaxed text-primary-foreground/80 line-clamp-2 md:line-clamp-none">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
