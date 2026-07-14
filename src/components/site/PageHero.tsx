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
  const h = height === "sm" ? "h-[42vh] min-h-[340px]" : height === "lg" ? "h-[70vh] min-h-[520px]" : "h-[56vh] min-h-[440px]";
  return (
    <section className={`relative w-full overflow-hidden ${h}`}>
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--steel-dark)]/90 via-[var(--steel-dark)]/70 to-[var(--steel-dark)]/40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_120%,color-mix(in_oklab,var(--ember)_35%,transparent),transparent_60%)]" />
      <div className="container-x relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end pb-14 text-primary-foreground">
        <div className="mb-4 flex items-center gap-2 text-xs text-primary-foreground/70">
          <Link to="/" className="hover:text-accent">Home</Link>
          <ChevronRight size={12} />
          <span className="text-accent">{breadcrumb}</span>
        </div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
